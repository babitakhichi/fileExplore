import { createSlice } from "@reduxjs/toolkit";
import { fileData } from "../fileData";


const initialFiles = localStorage.getItem("files")
  ? JSON.parse(localStorage.getItem("files"))
  : fileData;
export const fileSlice = createSlice({
  name: "files",
  initialState: {
    userData: initialFiles,
  },
  reducers: {
    addFileAction: (state, action) => {
    
      localStorage.setItem("files", JSON.stringify(action.payload));
      return (state = {
        ...state,
        userData: [...action.payload ],
      });
    },
    deleteFileAction: (state, action) => {
      
      localStorage.setItem("files", JSON.stringify(action.payload));
      return (state = {
        ...state,
        userData: action.payload,
      });
    },

    renameFileAction: (state, action) => {
     
      localStorage.setItem("files", JSON.stringify(action.payload));
      return (state = {
        ...state,
        userData: action.payload,
      });
    },

    
   
  },
});

export default fileSlice.reducer;
export const { addFileAction, deleteFileAction, renameFileAction} = fileSlice.actions;

export const addData = (data) => async (dispatch) => {
  try {
    dispatch(addFileAction(data));
  } catch (error) {
    console.log(error);
  }
};
;

export const deleteData = (data) => async (dispatch) => {
  try {
    dispatch(deleteFileAction(data));
  } catch (error) {
    console.log(error);
  }
};

export const handleRenameData = (data) => async (dispatch) => {
  try {
    dispatch(renameFileAction(data));
  } catch (error) {
    console.log(error);
  }
};



export const selectUserData = (state) => state?.files?.userData;
