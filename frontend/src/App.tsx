import React, { useEffect } from 'react';
import { Outlet, Routes } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserDataToken } from "./utils/selectors/auth";
import { getBugsList } from "./actions/bugActions/bugActions";
import { toastr } from "react-redux-toastr";
import { hideLoader, showLoader } from "./actions/loaderActions/loaderActions";
import { getLoader } from "./utils/selectors/loader";
import { IUser } from "./shared/types";
import { setUserData } from "./actions/authActions/authAction";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Header from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewBug from "./pages/NewBug/NewBug";
import BugList from "./pages/BugList/BugList";
import ProtectedRoute from "./app/ProtectedRoute";
import Loader from "./components/Loader/Loader";
import './App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const token = useSelector(getAuthUserDataToken);
  const loader = useSelector(getLoader); 

  useEffect(() => {
    (async() => {
      try {
        dispatch(showLoader());
        
        const userInfoStored = localStorage.getItem('ls_db_user_info');
        const userData: IUser | null = userInfoStored ? JSON.parse(userInfoStored) : null;

        if(!userData?.token) {
          throw new Error('Permission denied!');
        }

        dispatch(setUserData(userData));
        dispatch(getBugsList(userData?.token));

      } catch (error: any) {
        toastr.error('Permission denied!', 'Please login or register');
      } finally {
        dispatch(hideLoader());
      }
    })()
  }, []);

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

      <Loader show={loader}/>
    </div>
  );
}

export default App;