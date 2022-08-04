import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import BugReportIcon from '@mui/icons-material/BugReport';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { OpenInNew } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../../EmptyState/EmptyState";

const COLORS = ['#388ae5', '#203856', '#006B38FF', '#E94B3CFF'];

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

interface IBreakDownByTimeWorked {
  bugTitle: string
  bugId: string
  timeWorked: number
}

const BreakDownByTimeWorked: React.FC<{data: IBreakDownByTimeWorked[]}> = ({ data }): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="BreakDownByTimeWorked">
      <ResponsiveContainer width="100%" height="100%" className={'BreakDownByTimeWorked__pie'}>
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
            {data.map((entry: any, index: number) => (
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
        {data.map(({ bugTitle, bugId } : { bugTitle: string, bugId: string }, index: number) => {
          const labelId = `checkbox-list-label-${bugTitle}`;

          return (
            <ListItem
              key={index}
              disablePadding
              disableGutters
            >
              <ListItemButton 
                role={undefined} onClick={() => navigate(`/edit/${bugId}`)}
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

export default BreakDownByTimeWorked;

    