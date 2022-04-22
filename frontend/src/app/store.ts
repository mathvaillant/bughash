import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { IInitialState } from '../app/types';

import { composeWithDevTools } from "redux-devtools-extension";

import {
    authReducer
} from '../reducers/authReducers/authReducers';
import { listenBugDescriptionReducer } from "../reducers/newBugReducers/newBugReducers";

const reducers = combineReducers({
    auth: authReducer,
    bugDescription: listenBugDescriptionReducer,
});

const initialState: IInitialState = {
    userLogin: {},
};

const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
export type Store = ReturnType<typeof reducers>