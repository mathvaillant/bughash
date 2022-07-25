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
    window.location.reload();
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: 'max-content',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: currentTheme === 'light' ? 'background.default' : '',
        color: currentTheme === 'light' ? 'text.primary' : '',
        borderRadius: 1,
        p: 0,
        ml: 'auto'
      }}
    >
      <Typography 
        style={{ 
          textTransform: 'capitalize', 
          marginRight: '5px',
          color: currentTheme === 'light' ? 'black' : 'white',
        }} 
        variant="body1"
      >
        {currentTheme} mode
      </Typography>
      <IconButton size="small" onClick={handleToggleThemeMode} color="inherit">
        {' '} {currentTheme === 'dark' ? <Brightness7Icon sx={{ color: 'white' }}/> : <Brightness4Icon sx={{ color: 'black' }} />}
      </IconButton>
    </Box>
  )
}

export default ThemeMode;