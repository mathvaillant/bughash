import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as toastrReducer} from 'react-redux-toastr';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducers/authReducers';
import { bugsReducer } from "../reducers/bugReducers/bugsReducer";
import { loaderReducer } from "../reducers/bugReducers/loaderReducer";
import { modalReducer } from "../reducers/modalReducers/modalReducers";
import { toggleThemeReducer } from "../reducers/themeReducer";

const reducers = combineReducers({
    auth: authReducer,
    toastr: toastrReducer,
    bugs: bugsReducer,
    loader: loaderReducer,
    modals: modalReducer,
    theme: toggleThemeReducer
});

const middleware = [thunk];

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;
export type Store = ReturnType<typeof reducers>