import React from 'react';
import { Routes } from "react-router";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoader } from "./utils/selectors/loader";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from "./pages/Dashboard/Dashboard";
import BugPage from "./pages/BugPage/BugPage";
import BugList from "./pages/BugList/BugList";
import AppOn from "./app/AppOn";
import Loader from "./components/Loader/Loader";
import Settings from "./pages/Settings";
import './App.scss';
import { hideLoader, showLoader } from "./actions/loaderActions/loaderActions";
import { IUser } from "./shared/types";
import { setUserData } from "./actions/authActions/authAction";
import { getBugsList } from "./actions/bugActions/bugActions";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const loader = useSelector(getLoader);

  React.useEffect(() => {
    (async() => {
      try {
        dispatch(showLoader());

        const userInfoStored = localStorage.getItem('ls_db_user_info');
        const userData: IUser | null = userInfoStored ? JSON.parse(userInfoStored) : null;

        if(!userData?.token) return;

        dispatch(setUserData(userData));
        dispatch(getBugsList(userData.token));

        if(window.location.pathname === '/') {
          window.location.replace('/dashboard');
        }

      } catch (error) {
        console.log(error);
      } finally {
        dispatch(hideLoader());
      }
    })()
  }, []);

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<AppOn />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/new' element={<BugPage />} />
            <Route path='/edit/:id' element={<BugPage />} />
            <Route path='/list' element={<BugList />} />
            <Route path="/settings" element={<Settings />} />
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