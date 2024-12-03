import datetime
from scipy.fft import fft
import numpy as np
from python.queue_manager import data_queue
from python.rabbitmq import send_to_queue

def data_processor(motor_id, data_lock):
    accel_x, accel_y, accel_z = [], [], []
    total_liters = 0

    while True:
        data = None  # Inicializar la variable para evitar errores de referencia

        with data_lock:
            if not data_queue.empty():
                data = data_queue.get()  # Obtener los datos de la cola

        if data is None:
            continue

        try:
            # Actualizar total_liters
            if 'flow_rate' in data:
                total_liters += data['flow_rate'] / 60
                data['total_liters'] = total_liters

            # Procesar datos del MPU6050
            if 'acceleration_x' in data and 'acceleration_y' in data and 'acceleration_z' in data:
                accel_x.append(data['acceleration_x'])
                accel_y.append(data['acceleration_y'])
                accel_z.append(data['acceleration_z'])

                # Mantener tamaño máximo del buffer
                if len(accel_x) > 100:
                    accel_x.pop(0)
                    accel_y.pop(0)
                    accel_z.pop(0)

                # Realizar la FFT cuando hay suficientes datos
                if len(accel_x) == 100:
                    fft_x = fft(accel_x)
                    fft_y = fft(accel_y)
                    fft_z = fft(accel_z)

                    # Detectar vibraciones (picos de FFT)
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
                "engine_ref_data": motor_id
            }

            send_to_queue(relevant_data, "data")  # Enviar a RabbitMQ
            print(f"Processed and sent: {relevant_data}")

        except Exception as e:
            print(f"Error processing data: {e}")
