import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import BugReportIcon from '@mui/icons-material/BugReport';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { OpenInNew } from "@mui/icons-material";
import _ from "underscore";

const COLORS = ['#000000', '#203856', '#006B38FF', '#E94B3CFF'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (
    { cx, cy, midAngle, innerRadius, outerRadius, percent, index } : 
    { cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number, index: number}
): JSX.Element => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
    {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const BreakDownByBug = ({ data } : { data: any }): JSX.Element => {
  /* const dataFormatted = data.reduce((acc, item) => {
    if(!_.flatten(item.timeWorked).length) return acc;

    return
  }, []); */
  

  return (
    <div className="BreakDownByBug">
      <ResponsiveContainer width="100%" height="100%" className={'BreakDownByBug__pie'}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="40%"
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

      <List
        sx={{ 
          width: '100%', 
          maxWidth: 360, 
          bgcolor: 'background.paper',
        }}>
        {data.map(({ bugTitle }, index) => {
          const labelId = `checkbox-list-label-${bugTitle}`;

          return (
            <ListItem
              key={index}
              disablePadding
              disableGutters
            >
              <ListItemButton 
                role={undefined} /* onClick={handleToggle(value)} */ 
                dense
              >
                <ListItemIcon>
                  <BugReportIcon sx={{ fill: COLORS[index % COLORS.length] }}/>
                </ListItemIcon>
                <ListItemText id={labelId} primary={bugTitle} />
                <OpenInNew fontSize="small"/>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default BreakDownByBug;

    