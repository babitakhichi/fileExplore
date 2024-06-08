import { createSlice } from "@reduxjs/toolkit";
import route from "../routes/route";



const initialRoute = localStorage.getItem("route")
  ? JSON.parse(localStorage.getItem("route"))
  : route();
export const routeSlice = createSlice({
  name: "route",
  initialState: {
    routeData: initialRoute,
  },
  reducers: {
    addRouteAction: (state, action) => {
    
      localStorage.setItem("route", JSON.stringify(action.payload));
      return (state = {
        ...state,
        routeData: [...action.payload ],
      });
    },
    

    
   
  },
});

export default routeSlice.reducer;
export const { addRouteAction} = routeSlice.actions;

export const addRouteData = (data) => async (dispatch) => {
  try {
    dispatch(addRouteAction(data));
  } catch (error) {
    console.log(error);
  }
};
;


export const selectRouteData = (state) => state?.route?.routeData;
