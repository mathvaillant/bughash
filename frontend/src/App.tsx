import React from 'react';
import { Routes } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Header from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewBug from "./pages/NewBug/NewBug";
import BugList from "./pages/BugList/BugList";
import './App.scss';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Router>
        <Header/>
        <SideMenu/>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/new/:id' element={<NewBug />} />
          <Route path='/list' element={<BugList />} />  
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;