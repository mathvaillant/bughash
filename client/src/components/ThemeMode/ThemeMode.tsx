import React from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../actions/themeAction";
import { getAppTheme } from "../../utils/selectors/theme";

const ThemeMode = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(getAppTheme);

  const handleToggleThemeMode = (): void => {
    if(currentTheme === 'light') {
      dispatch(toggleTheme('dark'));
      localStorage.setItem('theme', 'dark');
    } else {
      dispatch(toggleTheme('light'));
      localStorage.setItem('theme', 'light');
    }
  }

  return (
    <IconButton size="small" onClick={handleToggleThemeMode} color="inherit">
      {' '} {currentTheme === 'dark' ? <Brightness7Icon sx={{ color: 'white' }}/> : <Brightness4Icon sx={{ color: 'black' }} />}
    </IconButton>
  )
}

export default ThemeMode;