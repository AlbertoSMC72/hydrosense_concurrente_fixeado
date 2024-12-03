import React from 'react';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

const ScatterChartComponent = ({ scatterChartData }) => (
  <ScatterChart
    series={[{ data: scatterChartData }]}
    height={400}
    sx={{ marginBottom: 4 }}
  />
);

export default ScatterChartComponent;
