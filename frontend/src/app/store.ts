import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from "redux-devtools-extension";

import {
    authReducer
} from '../reducers/authReducers/authReducers';
import { listenBugDescriptionReducer } from "../reducers/newBugReducers/newBugReducers";

const reducers = combineReducers({
    auth: authReducer,
    bugDescription: listenBugDescriptionReducer,
});

const middleware = [thunk];

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
export type Store = ReturnType<typeof reducers>