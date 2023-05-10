import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'Section 1', value: 30, color: '#001f3f' },
  { name: 'Section 2', value: 50, color: '#0074D9' },
  { name: 'Section 3', value: 20, color: '#00A6FF' },
  { name: 'Section 4', value: 40, color: '#48CAE4' },
  { name: 'Section 5', value: 10, color: '#90E0EF' },
];

// 50 colors currently supported - add more if needed
const colors = [
  '#002A5E',
  '#094D96',
  '#1C72CE',
  '#389BF2',
  '#58BDFC',
  '#78D1FF',
  '#99E5FF',
  '#BBF0FF',
  '#DFFCFF',
  '#F4FFFF',
  '#4C4CFF',
  '#4C4CFF',
  '#4C4CFF',
  '#4C4CFF',
  '#4C4CFF',
  '#4C4CFF',
  '#4C4CFF',
  '#4C4CFF',
  '#4C4CFF',
  '#4C4CFF',
  '#FF8C94',
  '#FFA678',
  '#FFC460',
  '#FFDF54',
  '#FFF248',
  '#F9FF40',
  '#D5FF40',
  '#B0FF40',
  '#8CFF40',
  '#68FF40',
  '#40FF5E',
  '#40FF83',
  '#40FFA9',
  '#40FFCF',
  '#40FFFF',
  '#40E6FF',
  '#40C1FF',
  '#409DFF',
  '#4078FF',
  '#4054FF',
  '#8340FF',
  '#A940FF',
  '#D040FF',
  '#FF40FF',
  '#FF40D0',
  '#FF409D',
  '#FF4068',
  '#FF4034'
];

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
