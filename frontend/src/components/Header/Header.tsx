import React from 'react';
import { AddBox } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Tooltip } from "@mui/material";
import useDeviceDetect from "../../utils/hooks/useDeviceDetect";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isMobile } = useDeviceDetect();

  const handleNewDoc = (): void => navigate('/new');

  const handleGoBack = (): void => navigate('/dashboard');

  return (
    <div className='Header'>
      {isMobile && (
        <Tooltip title='Go Back' placement="bottom">
          <IconButton className="GoBack" onClick={handleGoBack}>
            <ArrowBackIcon/>
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title={'Open a new bug'} placement={'bottom'}>
        <Button className={'BugPage'} type='button' onClick={handleNewDoc} data-test={'new-bug'}>
          <AddBox /> New
        </Button>
      </Tooltip>
    </div>
  )
}

export default Header