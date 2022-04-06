import React from 'react';
import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";
import Login from '../pages/Login/Login';
import Header from "../components/Header/Header";
import SideMenu from "../components/SideMenu/SideMenu";
import Dashboard from "../pages/Dashboard/Dashboard";
import NewBug from "../pages/NewBug/NewBug";
import './App.scss';
import PrivateRoutes from "./PrivateRoutes";

const App: React.FC = () => {
  const isAuthenticated = false;

  return (
    <div className='App'>
      <BrowserRouter>
          {isAuthenticated && (
            <>
              <Header/>
              <SideMenu/>
            </>
          )}
          <Routes>
            <Route path='/' element={<PrivateRoutes />}> 
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/new/:id' element={<NewBug />} />  
            </Route>
            <Route path='/login' element={<Login/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;