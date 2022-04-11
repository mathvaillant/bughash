import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { initialStateProps } from '../app/types';

import { composeWithDevTools } from "redux-devtools-extension";

import {
    userLoginReducer
} from '../reducers/userReducers/userReducers';

const reducer = combineReducers({
    userLogin: userLoginReducer
});

const initialState: initialStateProps = {
    userLogin: {},
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;