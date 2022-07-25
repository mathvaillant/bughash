import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import BugReportIcon from '@mui/icons-material/BugReport';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { useDispatch } from "react-redux";
import { handleNewBugModal } from "../../actions/modalActions/modalActions";

const actions = [
  { icon: <BugReportIcon />, name: 'Add New Bug', key: 'newbug'},
  /* { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' }, */
];

const QuickActions = (): JSX.Element => {
  const dispatch = useDispatch();

  const handleFireAction = (key: string): void => {
    if(key === 'newbug') {
      dispatch(handleNewBugModal({ open: true }))
    }
  };  

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