import React, { useEffect, useState } from 'react';
import { AddBox } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import './_Header.scss';

const Header: React.FC = () => {
  const [showNew, setShowNew] = useState(true);
  const navigate = useNavigate();

  const newBugPage = window.location.pathname.includes('/new');

  useEffect(() => {
    if(newBugPage) {
      setShowNew(false);
    }
  }, [newBugPage]); 

  const handleNewDoc = (): void => {
    const newBugId = uuidv4();

    navigate(`/new/${newBugId}`);
    setShowNew(false);
  };

  return (
    <header className='Header'>
      <a href='/'>BugHash</a>
      {showNew && (
        <Button type='button' onClick={handleNewDoc} data-test={'new-bug'}>
          <AddBox /> New
        </Button>
      )}
    </header>
  )
}

export default Header