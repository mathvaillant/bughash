import React from 'react'
import { Navigate, Outlet } from "react-router";
import SideMenu from "../components/SideMenu/SideMenu";
import Header from "../components/Header/Header";
import NewBugModal from "../components/NewBugModal/NewBugModal";
import QuickActions from "../components/QuickActions/QuickActions";

const AppOn: React.FC = () => {
  const userLoggedIn = Boolean(JSON.parse(localStorage.getItem('ls_db_user_info') as string)?.token); 

  if(!userLoggedIn) {
    return <Navigate to='/login'/> 
  }

  return <>
    <SideMenu />
    <QuickActions />
    <>
      <Header />
      <NewBugModal />
      <Outlet />
    </>
  </>
  
}

export default AppOn