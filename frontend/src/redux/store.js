/* eslint-disable default-case */
import { combineReducers } from "@reduxjs/toolkit";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./authReducer";

const reducer = combineReducers({
  AuthReducer,

});

const rootReducer = (state, action) => {
  return reducer(state, action);
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);
export default store;
