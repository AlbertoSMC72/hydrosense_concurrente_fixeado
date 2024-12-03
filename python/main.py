import threading
from python.serial_reader import serial_reader
from python.processor import data_processor

if __name__ == "__main__":
    # Crear hilos para cada tarea concurrente
    threads = [
        threading.Thread(target=serial_reader),      # Leer datos del puerto serie
        threading.Thread(target=data_processor)     # Procesar datos y enviarlos
    ]

    for thread in threads:
        thread.start()

    for thread in threads:
        thread.join()
