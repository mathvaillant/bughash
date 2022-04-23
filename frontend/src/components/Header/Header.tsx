import React from 'react';
import { AddBox } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { Avatar, Button, IconButton, Tooltip } from "@mui/material";
import ProfileMe from '../../assets/images/profile.png';
import './_Header.scss';

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


      <Tooltip title={'Profile'} placement={'bottom'}>
        <IconButton 
          className={'UserAvatar'}
          onClick={() => console.log('a')} 
        >
          <Avatar alt="Remy Sharp" src={ProfileMe} sx={{ width: 34, height: 34 }}/>
        </IconButton>
      </Tooltip>
    </header>
  )
}

export default Header