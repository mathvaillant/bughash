import React from 'react'
import { Navigate, Outlet } from "react-router";
import SideMenu from "../components/SideMenu/SideMenu";
import Header from "../components/Header/Header";
import NewBugModal from "../components/NewBugModal/NewBugModal";
import QuickActions from "../components/QuickActions/QuickActions";
import useBugsPubSub from "../utils/hooks/pubsub/useBugsPubSub";
import { getSidebarExpandedState } from "../utils/selectors/sidebar";
import { useSelector } from "react-redux";

const AppOn: React.FC = () => {
  useBugsPubSub();
  const userLoggedIn = Boolean(JSON.parse(localStorage.getItem('ls_db_user_info') as string)?.token);
  const sidebarExpanded = useSelector(getSidebarExpandedState); 

  if(!userLoggedIn) return <Navigate to='/login'/>;

  return (
    <div className="AppOn">
      <div className={`AppOn__left ${sidebarExpanded ? 'sidebarExpanded' : ''}`}>
        <SideMenu />
      </div>

      <div className={`AppOn__right ${sidebarExpanded ? 'sidebarExpanded' : ''}`}>
        <Header />
        <NewBugModal />
        <Outlet />
      </div>

      <QuickActions />
    </div>
  )
  
}

export default React.memo(AppOn);