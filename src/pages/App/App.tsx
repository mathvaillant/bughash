import React from 'react';
import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
import SideMenu from "../../components/SideMenu/SideMenu";
import Dashboard from "../Dashboard/Dashboard";
import NewBug from "../NewBug/NewBug";
import './_App.scss';


const App: React.FC = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header/>
        <SideMenu />
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/new/:id' element={<NewBug />} />  
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
