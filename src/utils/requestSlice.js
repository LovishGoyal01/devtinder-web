import { createSlice } from "@reduxjs/toolkit";


const requestSlice = createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addRequest:(state,action)=>{
            return action.payload;
        },
        removeRequest:()=>{
            return null;
        },
    }
})

export const {addRequest , removeRequest} = requestSlice.actions;

export default requestSlice.reducer;