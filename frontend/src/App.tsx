import React from 'react';
import { Routes } from "react-router";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import { CssBaseline, Theme } from "@mui/material";
import ReduxToastr from 'react-redux-toastr'
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
import { getAppTheme } from "./utils/selectors/theme";
import { ThemeTypes, toggleTheme } from "./actions/themeAction";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const loader = useSelector(getLoader);
  const currentTheme = useSelector(getAppTheme);

  const lightTheme = createTheme({
    palette: {
      background: {
        default: "#FFFFFF",
      },
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#3b49df',
      },
    },
    spacing: 8,
    shape: {
      borderRadius: 5,
    },
  });

  const darkTheme = createTheme({
    palette: {
      background: {
        default: "#121417",
      },
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#3b49df',
      },
    },
    spacing: 8,
    shape: {
      borderRadius: 5,
    },
  });

  const getMuiTheme = (appTheme: ThemeTypes): Theme => appTheme === 'dark' ? darkTheme : lightTheme;

  React.useEffect(() => {
    (async() => {
      try {
        dispatch(showLoader());

        const lsTheme = localStorage.getItem('theme') as ThemeTypes || 'light';
        const userInfoStored = localStorage.getItem('ls_db_user_info');
        const userData: IUser | null = userInfoStored ? JSON.parse(userInfoStored) : null;

        if(!userData?.token) return;

        dispatch(toggleTheme(lsTheme));
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
  }, [currentTheme]);

  return (
    <ThemeProvider theme={getMuiTheme(currentTheme)}>
      <CssBaseline />
        <div>
          <div className='App'>
            <Router>
              <Routes>
                <Route path='/' element={<AppOn />}>
                  <Route path='/dashboard' element={<Dashboard />} />
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

          <ReduxToastr
            timeOut={30000}
            preventDuplicates={true}
            newestOnTop={false}
            position="bottom-center"
            transitionIn="bounceIn"
            transitionOut="bounceOut"
            progressBar
          />

        </div>
    </ThemeProvider>
  );
}

export default React.memo(App);