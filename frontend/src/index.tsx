import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import ReduxToastr from 'react-redux-toastr'
import App from './App';
import store from "./app/store";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
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
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
