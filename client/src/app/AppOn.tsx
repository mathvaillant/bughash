import React from 'react'
import { Navigate, Outlet } from "react-router";
import SideMenu from "../components/SideMenu/SideMenu";
import Header from "../components/Header/Header";
import NewBugModal from "../components/NewBugModal/NewBugModal";
import QuickActions from "../components/QuickActions/QuickActions";
import useBugsPubSub from "../utils/hooks/pubsub/useBugsPubSub";

const AppOn: React.FC = () => {
  const userLoggedIn = Boolean(JSON.parse(localStorage.getItem('ls_db_user_info') as string)?.token); 
  useBugsPubSub();

  if(!userLoggedIn) return <Navigate to='/login'/>;

  return (
    <div className="AppOn">
      <div className="AppOn__left">
      <SideMenu />
      <QuickActions />
      </div>

      <div className='AppOn__right'>
        <Header />
        <NewBugModal />
        <Outlet />
      </div>
    </div>
  )
  
}

export default React.memo(AppOn);