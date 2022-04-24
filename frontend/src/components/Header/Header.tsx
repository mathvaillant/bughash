import React from 'react';
import { AddBox } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "@mui/material";
import './_Header.scss';
import AvatarMenu from "../AvatarMenu/AvatarMenu";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleNewDoc = (): void => {
    const newBugId = uuidv4();

    navigate(`/new/${newBugId}`);
  };

  return (
    <header className='Header'>
      <a onClick={() => navigate('/dashboard')}>BugHash</a>
      <Tooltip title={'Open a new bug'} placement={'bottom'}>
        <Button className={'NewBug'} type='button' onClick={handleNewDoc} data-test={'new-bug'}>
          <AddBox /> New
        </Button>
      </Tooltip>

      <AvatarMenu />
    </header>
  )
}

export default Header