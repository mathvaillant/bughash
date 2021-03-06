import React from 'react';
import { Routes } from "react-router";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/system";
import { CssBaseline } from "@mui/material";
import ReduxToastr from 'react-redux-toastr'
import { hideLoader, showLoader } from "./actions/loaderActions/loaderActions";
import { getLoader } from "./utils/selectors/loader";
import useAppDataInitializer from "./utils/hooks/useAppDataInitializer";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from "./pages/Dashboard/Dashboard";
import BugPage from "./pages/BugPage/BugPage";
import BugList from "./pages/BugList/BugList";
import AppOn from "./app/AppOn";
import Loader from "./components/Loader/Loader";
import Settings from "./pages/Settings";
import useAppTheme from "./utils/hooks/useAppTheme";
import './App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const loader = useSelector(getLoader);
  const { MuiAppTheme, themeName } = useAppTheme();
  const { appDataInitializer } = useAppDataInitializer();

  React.useEffect(() => {
    (async() => {
      try {
        dispatch(showLoader());
        appDataInitializer();
      } catch (error) {
        console.log("🚀 ~ file: App.tsx ~ line 46 ~ error", error);
      } finally {
        dispatch(hideLoader()); 
      }
    })()
  }, [themeName]);

  return (
    <ThemeProvider theme={MuiAppTheme}>
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