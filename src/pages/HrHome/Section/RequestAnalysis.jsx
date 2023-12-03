import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import useCustomRequestData from '../../../Hooks/useCustomRequestData';

const RequestAnalysis = ({ requestData }) => {
  const { customRequestData, refetch } = useCustomRequestData();

  console.log(customRequestData?.length);
  const type = requestData.reduce((acc, cur) => {
    acc[cur.type] = (acc[cur.type] || 0) + 1;

    return acc;
  }, {});

  const total = requestData?.length + customRequestData?.length;

  const data = [
    {
      name: 'Group A',
      value: (requestData?.length / total) * 100,
      color: '#0088FE',
    },
    {
      name: 'Group B',
      value: (customRequestData?.length / total) * 100,
      color: '#014F7F',
    },
  ];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        fontWeight={800}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="h-[60vh] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            label={renderCustomizedLabel}
            isAnimationActive={true}
            data={data}
            outerRadius={130}
            labelLine={false}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color}></Cell>
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="flex gap-5 justify-center text-stone-200 font-semibold">
        <div className="flex items-center gap-2">
          <p>Provided Asset Request</p>
          <span className="py-1.5 px-8 bg-[#0088FE]"></span>
        </div>
        <div className="flex items-center gap-2">
          <p>Custom Resuest</p>
          <span className="py-1.5 px-8 bg-[#13415e]"></span>
        </div>
      </div>
    </div>
  );
};

export default RequestAnalysis;
