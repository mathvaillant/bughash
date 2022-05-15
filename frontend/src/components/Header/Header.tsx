import React from 'react';
import { AddBox } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "@mui/material";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleNewDoc = (): void => navigate('/new');

  return (
    <div className='Header'>

      <Tooltip title={'Open a new bug'} placement={'bottom'}>
        <Button className={'BugPage'} type='button' onClick={handleNewDoc} data-test={'new-bug'}>
          <AddBox /> New
        </Button>
      </Tooltip>
    </div>
  )
}

export default Header