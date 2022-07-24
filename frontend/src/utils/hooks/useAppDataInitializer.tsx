import React from 'react'
import { useDispatch } from "react-redux";
import { setCurrentUserData } from "../../actions/authActions/authAction";
import { getBugsList } from "../../actions/bugActions/bugActions";
import { ThemeTypes, toggleTheme } from "../../actions/themeAction";
import { IUser } from "../../shared/types";

const useAppDataInitializer = (): {
  appDataInitializer: () => void;
} => {
  const dispatch = useDispatch();
  
  const appDataInitializer = React.useCallback(() => {
    const lsTheme = localStorage.getItem('theme') as ThemeTypes || 'light';
    const userInfoStored = localStorage.getItem('ls_db_user_info');
    const userData: IUser | null = userInfoStored ? JSON.parse(userInfoStored) : null;

    if(!userData?.token) return;

    dispatch(toggleTheme(lsTheme));
    dispatch(setCurrentUserData(userData));
    dispatch(getBugsList(userData.token));
  }, [dispatch]);

  return {
    appDataInitializer
  }
}

export default useAppDataInitializer