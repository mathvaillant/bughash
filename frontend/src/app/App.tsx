import React from 'react';
import { Routes } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from '../pages/Login/Login';
import Header from "../components/Header/Header";
import SideMenu from "../components/SideMenu/SideMenu";
import Dashboard from "../pages/Dashboard/Dashboard";
import NewBug from "../pages/NewBug/NewBug";
import './App.scss';
import PrivateRoutes from "./PrivateRoutes";
import BugList from "../pages/BugList/BugList";

const App: React.FC = () => {
  return (
    <div className='App'>
      <Router>
        <Header/>
        <SideMenu/>
        <Routes>
          <Route path='/' element={<PrivateRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/new/:id' element={<NewBug />} />
            <Route path='/list' element={<BugList />} />  
          </Route>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;