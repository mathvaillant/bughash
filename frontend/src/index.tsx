import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import ReduxToastr from 'react-redux-toastr'
import App from './App';
import store from "./app/store";
import reportWebVitals from './reportWebVitals';

const theme = createTheme({
  palette: {
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

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
          <div>
            <App />
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
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
