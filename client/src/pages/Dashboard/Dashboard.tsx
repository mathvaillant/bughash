import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../components/EmptyState/EmptyState";
import MainDataSection from "../../components/MainDataSection/MainDataSection";
import { getBugList } from "../../utils/selectors/bug";
import WelcomeSection from "./components/WelcomeSection/WelcomeSection";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const bugList = useSelector(getBugList);

  if(!bugList || !bugList.length) {
    return (
      <div className={'BugList empty'}>
        <EmptyState emptyStateFor="dashboard"/>
      </div>      
    ) 
  }

  return (
    <>
      <div className='Dashboard'>
        <WelcomeSection />
        <MainDataSection />
      </div>
    </>
  )
}

export default Dashboard;