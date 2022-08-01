import React, { PureComponent } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    status: 'Open',
    bugs: 2,
  },
  {
    status: 'Closed',
    bugs: 6,
  },
  {
    status: 'In Progress',
    bugs: 3,
  },
];

const BreakDownByStatus = (): JSX.Element => {
  return (
    <div className="BreakDownByStatus">
      <ResponsiveContainer width="100%" height="100%">
      <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
          }}
      >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis dataKey='bugs' />
          <Tooltip />
          <Bar dataKey="bugs" fill="#000000" />
      </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BreakDownByStatus;