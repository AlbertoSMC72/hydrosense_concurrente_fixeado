import serial
import json
from python.config import SERIAL_PORT, BAUD_RATE
from python.queue_manager import data_queue

def serial_reader():
    ser = serial.Serial(SERIAL_PORT, BAUD_RATE)
    while True:
        try:
            line = ser.readline().decode('utf-8').rstrip()  # Leer línea del puerto serie
            data = json.loads(line)  # Convertir la línea a JSON
            data_queue.put(data)  # Agregar los datos crudos a la cola
        except Exception as e:
            print(f"Error in serial_reader: {e}")
            error_data = {'error': str(e)}
            data_queue.put(error_data)  # Enviar datos de error a la cola
