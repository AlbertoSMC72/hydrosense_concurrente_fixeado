import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const PieChartComponent = ({ pieChartData }) => (
  <PieChart
    series={[
      {
        data: pieChartData,
        highlightScope: { faded: 'global', highlighted: 'item' },
        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
      },
    ]}
    height={400}
    sx={{ marginBottom: 4 }}
  />
);

export default PieChartComponent;
