// BarChartComponent.jsx
import React from "react";
import { BarChart } from '@mui/x-charts/BarChart';
const BarChartComponent = () => {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
      series={[{ data: [4, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
      width={400}
      height={300}
      barLabel="value"
    />
  );
};

export default BarChartComponent;
