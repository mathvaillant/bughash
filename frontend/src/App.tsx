import React from 'react';
import { Outlet, Routes } from "react-router";
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
import ProtectedRoute from "./app/ProtectedRoute";
import { useSelector } from "react-redux";
import { getAuthUserDataToken } from "./utils/selectors/auth";

const App: React.FC = () => {

  const token = useSelector(getAuthUserDataToken) || localStorage.getItem('token');

  return (
    <div className='App'>
      <Router>
        {!!token && 
          <>
            <Header/>
            <SideMenu/>
          </>
        }
        <Routes>
          <Route element={<ProtectedRoute isAuthenticated={!!token}/>}>
            <Route path='/' element={<Outlet />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/new' element={<NewBug />} />
              <Route path='/list' element={<BugList />} />  
            </Route>
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;