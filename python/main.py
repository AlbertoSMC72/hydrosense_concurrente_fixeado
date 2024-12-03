import threading
import tkinter as tk
from tkinter import messagebox
import requests
from python.serial_reader import serial_reader
from python.processor import data_processor

API_URL = "http://localhost:3001/app/auth/login"

def authenticate(email, password):
    """Función para autenticar al usuario con la API."""
    try:
        response = requests.post(API_URL, json={"email": email, "password": password})
        if response.status_code == 200:
            return True, "Inicio de sesión exitoso"
        else:
            return False, response.json().get("message", "Error desconocido.")
    except Exception as e:
        return False, f"Error al conectar con la API: {e}"

def start_threads(motor_id):
    """Función para iniciar los hilos después de ingresar el ID del motor."""
    try:
        # Crear un lock para sincronizar los hilos
        data_lock = threading.Lock()

        # Crear los hilos con los parámetros adecuados
        threads = [
            threading.Thread(target=serial_reader, args=(data_lock,)),  # Leer datos del puerto serie
            threading.Thread(target=data_processor, args=(motor_id, data_lock))  # Procesar datos con motor_id
        ]
        for thread in threads:
            thread.start()
        for thread in threads:
            thread.join()
    except Exception as e:
        print(f"Error al iniciar los hilos: {e}")

def open_motor_input_window():
    """Abrir ventana para ingresar el ID del motor."""
    def submit_motor_id():
        motor_id = entry_motor_id.get()
        if motor_id.strip():  # Validar que el campo no esté vacío
            motor_input_window.destroy()  # Cerrar la ventana de entrada de ID
            start_threads(motor_id)  # Iniciar los hilos con el ID del motor
        else:
            messagebox.showerror("Error", "El ID del motor no puede estar vacío.")

    motor_input_window = tk.Tk()
    motor_input_window.title("Ingresar ID del Motor")
    motor_input_window.geometry("300x150")

    tk.Label(motor_input_window, text="Ingrese el ID del motor:").pack(pady=10)
    entry_motor_id = tk.Entry(motor_input_window)
    entry_motor_id.pack(pady=5)

    tk.Button(motor_input_window, text="Enviar", command=submit_motor_id).pack(pady=10)

    motor_input_window.mainloop()

def login():
    """Función para manejar el evento de inicio de sesión."""
    email = entry_email.get()
    password = entry_password.get()

    # Llamar a la API para autenticar
    success, result = authenticate(email, password)
    if success:
        messagebox.showinfo("Inicio de sesión", result)
        root.destroy()  # Cerrar la ventana de inicio de sesión
        open_motor_input_window()  # Abrir ventana para ingresar el ID del motor
    else:
        messagebox.showerror("Error", f"Inicio de sesión fallido: {result}")

# Crear la interfaz de usuario para el inicio de sesión
root = tk.Tk()
root.title("Inicio de Sesión")
root.geometry("400x250")

# Etiquetas y campos de entrada
tk.Label(root, text="Correo electrónico:").pack(pady=5)
entry_email = tk.Entry(root)
entry_email.pack(pady=5)

tk.Label(root, text="Contraseña:").pack(pady=5)
entry_password = tk.Entry(root, show="*")
entry_password.pack(pady=5)

# Botón de inicio de sesión
btn_login = tk.Button(root, text="Iniciar sesión", command=login)
btn_login.pack(pady=10)

# Iniciar el bucle de Tkinter
root.mainloop()
