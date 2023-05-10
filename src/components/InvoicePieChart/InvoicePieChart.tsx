import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

interface Charge {
  label: string;
  cost: string;
}

const charges: Charge[] = [
  {
    label: "20 glass panels 5x4 feet",
    cost: "6350.00"
  },
  {
    label: "Aluminium composite",
    cost: "440.00"
  },
  {
    label: "Panel installation labor",
    cost: "910.00"
  }
];

// 5 colors for sections
const colors = [
  '#002A5E',
  '#094D96',
  '#1C72CE',
  '#389BF2',
  '#58BDFC',
];

const InvoicePieChart: React.FC = () => {
  const data = charges.map((charge, index) => ({
    ...charge,
    value: parseFloat(charge.cost),
    color: colors[index % colors.length]
  }));

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
              {data[index].label}
            </text>
          );
        }}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default InvoicePieChart;
