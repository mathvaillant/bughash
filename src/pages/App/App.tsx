import React from 'react';
import { Routes } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
import Dashboard from "../Dashboard/Dashboard";
import NewBug from "../NewBug/NewBug";
import './_App.scss';


const App: React.FC = () => {
  return (
    <>
      <Router>
        <Header/>
        <main>
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/new/:id' element={<NewBug />} />  
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
