import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Profile from "./components/Tabs/Profile/index";
import { getTabProps } from "./utils";
import useDeviceDetect from "../../utils/hooks/useDeviceDetect";
import TabPanel from './components/TabPanel/TabPanel'

const Settings = (): JSX.Element => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const { isMobile } = useDeviceDetect();

  const tabOrientation = isMobile ? 'horizontal' : 'vertical';

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => setTabIndex(newValue);

  return (
    <div className='Settings'>
      <h1 className='Settings__header'>Settings</h1>

      <Box sx={{ flexGrow: 1, display: 'flex', height: '100%'}}>
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