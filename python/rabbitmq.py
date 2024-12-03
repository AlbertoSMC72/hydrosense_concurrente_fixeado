import pika
import json
from python.config import AMQP_OPTIONS

def send_to_queue(message, queue_name):
    try:
        connection = pika.BlockingConnection(pika.ConnectionParameters(
            host=AMQP_OPTIONS['hostname'],
            port=AMQP_OPTIONS['port'],
            credentials=pika.PlainCredentials(
                AMQP_OPTIONS['username'],
                AMQP_OPTIONS['password']
            )
        ))
        channel = connection.channel()
        channel.queue_declare(queue=queue_name, durable=True)
        channel.basic_publish(exchange='', routing_key=queue_name, body=json.dumps(message))
        connection.close()
    except Exception as e:
        print(f"Error sending to queue: {e}")
