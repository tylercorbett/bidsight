import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Charge } from '../../types/invoice';

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

// 5 colors currently supported - add more if needed
const colors = ['#002A5E', '#094D96', '#1C72CE', '#389BF2', '#58BDFC'];

interface Props {
  // No longer accepting charges as a prop
}

const InvoicePieChart: React.FC<Props> = () => {
  const data = charges.map((charge) => ({
    name: charge.label,
    value: parseFloat(charge.cost),
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

          const label = data[index].name;
          const truncatedLabel = label.length > 9 ? label.substring(0, 9) + '...' : label;

          return (
            <text
              x={x}
              y={y}
              fill={colors[index % colors.length]}
              textAnchor={x > cx ? 'start' : 'end'}
              dominantBaseline="central"
            >
              {truncatedLabel}
            </text>
          );
        }}
        dataKey="value"
        animationDuration={850} // Set animation duration to 200ms
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
