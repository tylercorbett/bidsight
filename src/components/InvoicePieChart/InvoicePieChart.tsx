import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'Section 1', value: 30, color: '#001f3f' },
  { name: 'Section 2', value: 50, color: '#0074D9' },
  { name: 'Section 3', value: 20, color: '#00A6FF' },
  { name: 'Section 4', value: 40, color: '#48CAE4' },
  { name: 'Section 5', value: 10, color: '#90E0EF' },
];

const colors = ['#001f3f', '#0074D9', '#00A6FF', '#48CAE4', '#90E0EF'];

const InvoicePieChart = () => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
          const RADIAN = Math.PI / 180;
          const radius = 25 + innerRadius + (outerRadius - innerRadius);
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          const y = cy + radius * Math.sin(-midAngle * RADIAN);

          return (
            <text
              x={x}
              y={y}
              fill={data[index].color}
              textAnchor={x > cx ? 'start' : 'end'}
              dominantBaseline="central"
            >
              {data[index].name}
            </text>
          );
        }}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default InvoicePieChart;
