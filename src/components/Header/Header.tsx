import React from 'react';
import { AddBox } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import './_Header.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleNewDoc = (): void => {
    const newBugId = uuidv4();

    navigate(`/new/${newBugId}`);
  };

  return (
    <header className='Header'>
      <a href='/'>BugHash</a>
      <Button type='button' onClick={handleNewDoc}>
        <AddBox />
        New
      </Button>
    </header>
  )
}

export default Header