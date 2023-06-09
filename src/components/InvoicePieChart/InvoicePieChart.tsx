import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Charge } from '../../types/invoice';

const colors = [
  '#002A5E',
  '#094D96',
  '#1C72CE',
  '#389BF2',
  '#58BDFC',
  '#00471B',
  '#006C2D',
  '#009743',
  '#00C258',
  '#00E869',
  '#E5E5E5',
  '#CCCCCC',
  '#B3B3B3',
  '#999999',
  '#808080',
  '#666666',
  '#4D4D4D',
  '#333333',
  '#1A1A1A',
  '#000000',
];

interface Props {
  charges: Charge[]
}

const InvoicePieChart: React.FC<Props> = ({ charges }) => {
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
