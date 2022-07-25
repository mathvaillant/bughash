
import React from 'react'
import { createTheme, Theme } from "@mui/material";
import { useSelector } from "react-redux";
import { getAppTheme } from "../selectors/theme";
import { ThemeTypes } from "../../actions/themeAction";

const useAppTheme = () : {
  MuiAppTheme: Theme,
  themeName: ThemeTypes
} => {
  const currentTheme = useSelector(getAppTheme);
  const [themeName, setThemeName] = React.useState<ThemeTypes>('light');

  const lightTheme = createTheme({
    palette: {
      background: {
        default: "#FFFFFF",
      },
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#FFFFFF',
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
        main: '#FFFFFF',
      },
    },
    spacing: 8,
    shape: {
      borderRadius: 5,
    },
  });

  React.useEffect(() => {
    setThemeName(currentTheme);
  }, [currentTheme]);

  const MuiAppTheme: Theme = currentTheme === 'dark' ? darkTheme : lightTheme;

  return {
    MuiAppTheme,
    themeName,
  };
}

export default useAppTheme;