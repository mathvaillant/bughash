import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useDeviceDetect from "../../../../utils/hooks/useDeviceDetect";

interface IBreakDownByStatus {
  status: string
  amount: number
}

const BreakDownByStatus: React.FC<{data: IBreakDownByStatus[]}> = ({ data }): JSX.Element | null => {
  const { isMobile } = useDeviceDetect();

  if(isMobile) return null;

  return (
    <div className="BreakDownByStatus">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={300}
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
          <YAxis dataKey='amount' />
          <Tooltip />
          <Bar dataKey="amount" fill="#000000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BreakDownByStatus;