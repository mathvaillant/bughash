import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
interface ISettingsTabProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: ISettingsTabProps): JSX.Element => {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="Settings__tabpanel"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default TabPanel;