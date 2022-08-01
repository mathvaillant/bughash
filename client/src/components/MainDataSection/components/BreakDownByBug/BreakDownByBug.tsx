import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import BugReportIcon from '@mui/icons-material/BugReport';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { bugTitle: 'Bug A', timeWorked: 400 },
  { bugTitle: 'Bug B', timeWorked: 300 },
  { bugTitle: 'Bug C', timeWorked: 300 },
  { bugTitle: 'Bug D', timeWorked: 200 },
];

const COLORS = ['#000000', '#203856', '#006B38FF', '#E94B3CFF'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (
    { cx, cy, midAngle, innerRadius, outerRadius, percent, index } : 
    { cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number, index: number}
) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <Tooltip 
      followCursor={true} 
      title={data.at(index)?.bugTitle || ''}    
    >
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
      </text>
    </Tooltip>
  );
};

const BreakDownByBug = (): JSX.Element => {
  return (
    <div className="BreakDownByBug">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="timeWorked"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <List>
        <ListItem>
            <ListItemIcon>
              <BugReportIcon />
            </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
      </List>
    </div>
  );
}

export default BreakDownByBug;