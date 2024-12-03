import serial
import json
import pika
import numpy as np
import datetime
from scipy.fft import fft

# Configuración del puerto serie
serial_port = 'COM8'
baud_rate = 115200

# Configuración de RabbitMQ
amqp_options = {
    'hostname': '34.200.119.111',
    'port': 5672,
    'username': 'guest',
    'password': 'guest'
}

# Variables globales
totalLiters = 0
reports = []

# Función para enviar mensajes a RabbitMQ
def send_to_queue(message, queue_name):
    connection = pika.BlockingConnection(pika.ConnectionParameters(
        host=amqp_options['hostname'],
        port=amqp_options['port'],
        credentials=pika.PlainCredentials(
            amqp_options['username'],
            amqp_options['password']
        )
    ))
    channel = connection.channel()
    channel.queue_declare(queue=queue_name, durable=True)
    channel.basic_publish(exchange='',
                          routing_key=queue_name,
                          body=message)
    connection.close()

# Función para generar reportes
def generate_report(title, description, data):
    report = {
        'title': title,
        'description': description,
        'date': datetime.datetime.now().isoformat(),
        'data': data,
        "engine_ref_data": 1
    }
    reports.append(report)
    message = json.dumps(report)
    send_to_queue(message, 'reports')
    print(f"Generated Report: {message}")

# Leer datos del puerto serie
ser = serial.Serial(serial_port, baud_rate)

# Buffer para datos del MPU6050
accel_x = []
accel_y = []
accel_z = []

# Umbrales para detección
THRESHOLD_HIGH_VIBRATION = 50
THRESHOLD_WATER_HAMMER_FLOW_DROP = 10
THRESHOLD_WATER_HAMMER_VIBRATION_PEAK = 100

while True:
    try:
        line = ser.readline().decode('utf-8').rstrip()
        data = json.loads(line)
        
        # Actualizar totalLiters
        if 'flow_rate' in data:
            totalLiters += data['flow_rate'] / 60
            data['total_liters'] = totalLiters
        
        # Procesar datos del MPU6050
        if 'acceleration_x' in data and 'acceleration_y' in data and 'acceleration_z' in data:
            accel_x.append(data['acceleration_x'])
            accel_y.append(data['acceleration_y'])
            accel_z.append(data['acceleration_z'])
            
            # Mantener el tamaño del buffer
            if len(accel_x) > 100:
                accel_x.pop(0)
                accel_y.pop(0)
                accel_z.pop(0)
            
            # Realizar la FFT cuando hay suficientes datos
            if len(accel_x) == 100:
                fft_x = fft(accel_x)
                fft_y = fft(accel_y)
                fft_z = fft(accel_z)
                
                # Detectar vibraciones (ejemplo simple: detectar picos en la FFT)
                vibration_x = np.abs(fft_x).max()
                vibration_y = np.abs(fft_y).max()
                vibration_z = np.abs(fft_z).max()
                
                data['vibration_x'] = vibration_x
                data['vibration_y'] = vibration_y
                data['vibration_z'] = vibration_z

        # Crear mensaje con solo los datos relevantes
        relevant_data = {
            "date": datetime.datetime.now().isoformat(),
            "data": {
                'temperature': data.get('temperature', None),
                'flow_rate': data.get('flow_rate', None),
                'total_liters': data.get('total_liters', None),
                'vibration_x': data.get('vibration_x', None),
                'vibration_y': data.get('vibration_y', None),
                'vibration_z': data.get('vibration_z', None)
            },
            "engine_ref_data": 1
        }

        message = json.dumps(relevant_data)
        send_to_queue(message, 'data')
        print(f"Sent: {message}")

        # Lógica para generar reportes
        if data.get('temperature', None) > 80 and data.get('flow_rate', 1) == 0:
            generate_report(
                title="Alerta de sobrecalentamiento",
                description="La bomba de agua se está sobrecalentando y no hay flujo de agua.",
                data={
                    'temperature': data.get('temperature', None),
                    'flow_rate': data.get('flow_rate', None),
                    'total_liters': data.get('total_liters', None),
                    'acceleration_x': accel_x.copy(),
                    'acceleration_y': accel_y.copy(),
                    'acceleration_z': accel_z.copy()
                }
            )
        
        if data.get('vibration_x', 0) > THRESHOLD_HIGH_VIBRATION or data.get('vibration_y', 0) > THRESHOLD_HIGH_VIBRATION or data.get('vibration_z', 0) > THRESHOLD_HIGH_VIBRATION:
            generate_report(
                title="Alerta de alta vibración",
                description="Se detectó una alta vibración en la bomba de agua.",
                data={
                    'temperature': data.get('temperature', None),
                    'flow_rate': data.get('flow_rate', None),
                    'total_liters': data.get('total_liters', None),
                    'vibration_x': data.get('vibration_x', None),
                    'vibration_y': data.get('vibration_y', None),
                    'vibration_z': data.get('vibration_z', None)
                }
            )

        if data.get('temperature', None) < 5:
            generate_report(
                title="Alerta de baja temperatura",
                description="La temperatura de la bomba de agua es muy baja.",
                data={
                    'temperature': data.get('temperature', None),
                    'flow_rate': data.get('flow_rate', None),
                    'total_liters': data.get('total_liters', None)
                }
            )

        if data.get('flow_rate', None) > 100:
            generate_report(
                title="Alerta de flujo de agua alto",
                description="El flujo de agua es demasiado alto.",
                data={
                    'temperature': data.get('temperature', None),
                    'flow_rate': data.get('flow_rate', None),
                    'total_liters': data.get('total_liters', None)
                }
            )

        # Golpe de ariete
        if 'flow_rate' in data and data['flow_rate'] < THRESHOLD_WATER_HAMMER_FLOW_DROP and \
            (data.get('vibration_x', 0) > THRESHOLD_WATER_HAMMER_VIBRATION_PEAK or
             data.get('vibration_y', 0) > THRESHOLD_WATER_HAMMER_VIBRATION_PEAK or
             data.get('vibration_z', 0) > THRESHOLD_WATER_HAMMER_VIBRATION_PEAK):
            generate_report(
                title="Alerta de golpe de ariete",
                description="Se detectó un golpe de ariete en la bomba de agua.",
                data={
                    'temperature': data.get('temperature', None),
                    'flow_rate': data.get('flow_rate', None),
                    'total_liters': data.get('total_liters', None),
                    'vibration_x': data.get('vibration_x', None),
                    'vibration_y': data.get('vibration_y', None),
                    'vibration_z': data.get('vibration_z', None)
                }
            )

        # Desalineamiento del motor
        if len(accel_x) == 100:
            fft_x = fft(accel_x)
            fft_y = fft(accel_y)
            fft_z = fft(accel_z)
            freqs_x = np.abs(fft_x)
            freqs_y = np.abs(fft_y)
            freqs_z = np.abs(fft_z)
            if np.any(freqs_x[1:] > THRESHOLD_HIGH_VIBRATION) or np.any(freqs_y[1:] > THRESHOLD_HIGH_VIBRATION) or np.any(freqs_z[1:] > THRESHOLD_HIGH_VIBRATION):
                generate_report(
                    title="Alerta de desalineamiento del motor",
                    description="Se detectó un posible desalineamiento del motor basado en las vibraciones.",
                    data={
                        'temperature': data.get('temperature', None),
                        'flow_rate': data.get('flow_rate', None),
                        'total_liters': data.get('total_liters', None),
                        'vibration_x': freqs_x.tolist(),
                        'vibration_y': freqs_y.tolist(),
                        'vibration_z': freqs_z.tolist()
                    }
                )

        # Pulsaciones
        if 'flow_rate' in data and np.std(accel_x) > 5:
            generate_report(
                title="Alerta de pulsaciones",
                description="Se detectaron pulsaciones en el flujo de agua o en las vibraciones.",
                data={
                    'temperature': data.get('temperature', None),
                    'flow_rate': data.get('flow_rate', None),
                    'total_liters': data.get('total_liters', None),
                    'vibration_x': data.get('vibration_x', None),
                    'vibration_y': data.get('vibration_y', None),
                    'vibration_z': data.get('vibration_z', None)
                }
            )

        # Engranaje del rotor
        if 'acceleration_x' in data and np.std(accel_x) > 10:
            generate_report(
                title="Alerta de engranaje del rotor",
                description="Se detectaron patrones de vibración que pueden indicar un problema con el engranaje del rotor.",
                data={
                    'temperature': data.get('temperature', None),
                    'flow_rate': data.get('flow_rate', None),
                    'total_liters': data.get('total_liters', None),
                    'acceleration_x': accel_x.copy(),
                    'acceleration_y': accel_y.copy(),
                    'acceleration_z': accel_z.copy()
                }
            )


    except Exception as e:
        print(f"Error: {e}")
        error_data = {
            'error': str(e),
            'line': line,
            'date': datetime.datetime.now().isoformat()
        }
        send_to_queue(json.dumps(error_data), 'data')
