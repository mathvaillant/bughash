import { Button } from "@mui/material";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { AddBox } from '@mui/icons-material';
import emptyState from '../../assets/images/dashboard-emptystate.png';
import './_Dashboard.scss';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const CONTENT = null;

  const handleNewDoc = (): void => navigate('/new');

  return (
    <>
      <div className='Dashboard'>
        {!CONTENT && (
          <img src={emptyState}/>
        )}
          
        <h1>You have no bugs opened at the moment 🥳 </h1>
        <Button type='button' className='' onClick={handleNewDoc} data-test={'new-bug'}>
            <AddBox /> New
        </Button>
      </div>
    </>
  )
}

export default Dashboard;