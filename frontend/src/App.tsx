import React, { useEffect } from 'react';
import { Outlet, Routes } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserDataToken } from "./utils/selectors/auth";
import { getBugsList } from "./actions/bugActions/bugActions";
import { hideLoader, showLoader } from "./actions/loaderActions/loaderActions";
import { getLoader } from "./utils/selectors/loader";
import { IUser } from "./shared/types";
import { setUserData } from "./actions/authActions/authAction";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Header from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";
import Dashboard from "./pages/Dashboard/Dashboard";
import BugPage from "./pages/BugPage/BugPage";
import BugList from "./pages/BugList/BugList";
import ProtectedRoute from "./app/ProtectedRoute";
import Loader from "./components/Loader/Loader";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings";
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
        console.log(error);
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
              <Route path='/new' element={<BugPage />} />
              <Route path='/edit/:id' element={<BugPage />} />
              <Route path='/list' element={<BugList />} />
              <Route path="/settings" element={<Settings />}>
                <Route path='/settings/profile' element={<Profile />} /> 
              </Route>
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