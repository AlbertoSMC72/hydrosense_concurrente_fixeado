import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import io from 'socket.io-client';

const RealTimeCharts = () => {
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);
  const [temperatureMessage, setTemperatureMessage] = useState('');

  useEffect(() => {
    const socket = io('http://52.54.253.177:8080', { transports: ['websocket'] });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('message', (newData) => {
      console.log(newData);

      // Actualizar los datos del gráfico
      if (newData && newData.data && typeof newData.data.flow_rate !== 'undefined' && typeof newData.data.total_liters !== 'undefined') {
        setYData((prevYData) => [...prevYData, newData.data.flow_rate]);
        setXData((prevXData) => [...prevXData, newData.data.total_liters]);

        // Actualizar el mensaje de temperatura
        const temperature = newData.data.temperature;
        const message = temperature > 40 ? "Temperatura muy alta" : "Temperatura normal";
        setTemperatureMessage(message);
      } else {
        console.error('Datos recibidos con estructura incorrecta:', newData);
      }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <p>{temperatureMessage}</p>
      <LineChart
        xAxis={[{ data: xData }]}
        series={[
          {
            data: yData,
            area: true,
          },
        ]}
        height={300}
        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
        grid={{ vertical: true, horizontal: true }}
      />
    </>
  );
};

export default RealTimeCharts;
