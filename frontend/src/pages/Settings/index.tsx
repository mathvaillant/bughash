import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Profile from "./components/Tabs/Profile/index";
import { getTabProps } from "./utils";
import useDeviceDetect from "../../utils/hooks/useDeviceDetect";

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

const Settings = (): JSX.Element => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const { isMobile } = useDeviceDetect();

  const tabOrientation = isMobile ? 'horizontal' : 'vertical';

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => setTabIndex(newValue);

  return (
    <div className='Settings'>
      <h1 className='Settings__header'>Settings</h1>

      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%'}}>
        <Tabs
          orientation={tabOrientation}
          variant="scrollable"
          value={tabIndex}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Profile" {...getTabProps(0)} />
          <Tab label="Workspace" {...getTabProps(1)} />
        </Tabs>

        <TabPanel value={tabIndex} index={0}>
          <Profile />
        </TabPanel>
        {/* <TabPanel value={tabIndex} index={1}>
          Workspace
        </TabPanel> */}
      </Box>
    </div>
  );
}

export default Settings;