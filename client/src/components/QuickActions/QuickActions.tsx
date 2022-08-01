import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import BugReportIcon from '@mui/icons-material/BugReport';
import { useDispatch } from "react-redux";
import { handleNewBugModal } from "../../actions/modalActions/modalActions";
import useDeviceDetect from "../../utils/hooks/useDeviceDetect";
import ThemeMode from "../ThemeMode/ThemeMode";

const actions = [
  { icon: <BugReportIcon />, name: 'Add New Bug', key: 'newbug'},
  { icon: <ThemeMode />, name: 'Toggle App Theme', key: 'appTheme'},
];

const QuickActions = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const { isMobile } = useDeviceDetect();

  const handleFireAction = (key: string): void => {
    if(key === 'newbug') {
      dispatch(handleNewBugModal({ open: true }))
    }
  };  
  
  if(isMobile) return null;

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'fixed', bottom: '10px', right: '16px' }}
      icon={<SpeedDialIcon />}
    >
    {actions.map((action) => (
        <SpeedDialAction
          onClick={() => handleFireAction(action.key)}
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
    ))}
    </SpeedDial>
  );
}

export default QuickActions;