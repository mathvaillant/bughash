import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from "react-redux";
import { getBugStatus } from "../../utils/selectors/bug";
import BugServices from "../../utils/services/bugServices";
import { StatusTypes } from "../../shared/types";

const BugStatus = ({ bugId } : { bugId: string }): JSX.Element => {
  const statusLabels = {'open': 'Open', 'closed': 'Closed', 'inprogress': 'In Progress'};
  const [currentStatus, setCurrentStatus] = React.useState<StatusTypes>('open');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const open = Boolean(anchorEl);
  const bugStatus = useSelector(getBugStatus(bugId));

  React.useEffect(() => {
    if(bugStatus) {
      setCurrentStatus(bugStatus);
    }
  }, [bugStatus]);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => setAnchorEl(null);

  const handleSelect = async (value: string): Promise<void> => {
    await BugServices.updateBug({ fields: { status: value }, bugId});
    handleClose();
  };

  return (
    <div className="BugStatus">
      <Button
        size="small"
        variant="outlined"
        className={`BugStatus__selectButton ${currentStatus}`}
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {currentStatus ? statusLabels[currentStatus] : ''}
      </Button>
      <Menu
        id="bug-status"
        aria-labelledby="bug-status"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => handleSelect('open')}>Open</MenuItem>
        <MenuItem onClick={() => handleSelect('inprogress')}>In Progress</MenuItem>
        <MenuItem onClick={() => handleSelect('closed')}>Closed</MenuItem>
      </Menu>
    </div>
  );
};

export default BugStatus;
