import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Section 1', value: 30 },
  { name: 'Section 2', value: 50 },
  { name: 'Section 3', value: 20 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const InvoicePieChart = () => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default InvoicePieChart;
