import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import fileSlice from "./fileSlice";
import routeSlice from "./routeSlice";



const reducer = combineReducers({
  files: fileSlice,
  route:routeSlice
});

const store = configureStore({
  reducer,
});

export default store;
