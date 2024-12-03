import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import BarChartComponent from './graficas/BarChartComponent';
import ScatterChartComponent from './graficas/ScatterChartComponent';
import PieChartComponent from './graficas/PieChartComponent';
import RealTimeCharts from './graficas/RealTimeCharts';
import FrequencyTable from './graficas/FrequencyTable';
import { fetchTemperatureData, fetchScatterChartData } from './dataFetchers';

const EnhancedCard = () => {
  const [selectedChart, setSelectedChart] = useState('chart1');
  const [intervals, setIntervals] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  const [cumulativeFrequencies, setCumulativeFrequencies] = useState([]);
  const [percentages, setPercentages] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [scatterChartData, setScatterChartData] = useState([]);

  useEffect(() => {
    const generateHistogram = async () => {
      const temperatures = await fetchTemperatureData();

      const bins = [32.25, 32.40, 32.55, 32.70, 32.85, 33.00];

      const frequency = bins.map((_, i, arr) => {
        const lower = arr[i];
        const upper = arr[i + 1];
        return temperatures.filter(t => t >= lower && t < upper).length;
      }).slice(0, -1);

      setIntervals(bins.slice(0, -1).map((bin, i) => `${bin} - ${bins[i + 1]}`));
      setFrequencies(frequency);

      let cumulativeFrequency = 0;
      const cumulativeFreq = frequency.map(f => cumulativeFrequency += f);
      const percent = frequency.map(f => ((f / temperatures.length) * 100).toFixed(2));

      setCumulativeFrequencies(cumulativeFreq);
      setPercentages(percent);
    };

    generateHistogram();

    const pieData = [
      { label: 'Tipo A', value: 10 },
      { label: 'Tipo B', value: 15 },
      { label: 'Tipo C', value: 20 },
    ];
    const totalFailures = pieData.reduce((acc, item) => acc + item.value, 0);
    const formattedPieData = pieData.map(item => ({
      id: item.label,
      value: item.value,
      label: `${item.label} (${((item.value / totalFailures) * 100).toFixed(2)}%)`,
    }));

    setPieChartData(formattedPieData);

    const fetchAndSetScatterData = async () => {
      const scatterData = await fetchScatterChartData();
      const filteredScatterData = [];
      let lastFlowRate = null;

      scatterData.forEach(item => {
        if (item.flowRate !== lastFlowRate) {
          filteredScatterData.push({
            x: item.id,
            y: item.flowRate
          });
          lastFlowRate = item.flowRate;
        }
      });

      setScatterChartData(filteredScatterData);
    };

    fetchAndSetScatterData();
  }, []);

  const handleChange = (event) => {
    setSelectedChart(event.target.value);
  };

  const chartData = {
    chart1: {
      component: BarChartComponent,
      props: {
        intervals,
        frequencies,
      },
      title: 'Gráfica de Barras con Intervalos de Clase',
      description: 'Una gráfica de barras que muestra la frecuencia de los datos en intervalos de clase.',
    },
    chart2: {
      component: ScatterChartComponent,
      props: {
        scatterChartData,
      },
      title: 'Gráfica de Puntos',
      description: 'Una gráfica de puntos que muestra la distribución del flujo de agua.',
    },
    chart3: {
      component: PieChartComponent,
      props: {
        pieChartData,
      },
      title: 'Gráfica de Pastel',
      description: 'Una gráfica de pastel que muestra la proporción de cada tipo de fallos en relación al total de fallos.',
    },
    chart4: {
      component: RealTimeCharts,
      props: {},
      title: 'Gráficas en Tiempo Real',
      description: 'Gráficas de líneas que muestran datos en tiempo real.',
    },
    table: {
      title: 'Tabla de Frecuencia',
      description: 'Una tabla que muestra la frecuencia, frecuencia acumulada y porcentaje de los datos en intervalos de clase.',
      table: (
        <FrequencyTable
          intervals={intervals}
          frequencies={frequencies}
          cumulativeFrequencies={cumulativeFrequencies}
          percentages={percentages}
        />
      ),
    },
  };

  const ChartComponent = chartData[selectedChart]?.component;
  const chartProps = chartData[selectedChart]?.props;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {chartData[selectedChart]?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {chartData[selectedChart]?.description}
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="chart-select-label">Selecciona una gráfica</InputLabel>
          <Select
            labelId="chart-select-label"
            value={selectedChart}
            onChange={handleChange}
          >
            <MenuItem value="chart1">Gráfica de Barras</MenuItem>
            <MenuItem value="chart2">Gráfica de Puntos</MenuItem>
            <MenuItem value="chart4">Gráficas en Tiempo Real</MenuItem>
            <MenuItem value="table">Tabla de Frecuencia</MenuItem>
          </Select>
        </FormControl>
        {ChartComponent && <ChartComponent {...chartProps} />}
        {selectedChart === 'table' && chartData.table.table}
      </CardContent>
    </Card>
  );
};

export default EnhancedCard;
