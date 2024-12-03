import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const BarChartComponent = ({ intervals, frequencies }) => (
  <BarChart
    xAxis={[{ scaleType: 'band', data: intervals }]}
    series={[{ data: frequencies }]}
    width={600}
    height={400}
  />
);

export default BarChartComponent;
