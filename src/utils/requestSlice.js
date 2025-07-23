import { createSlice } from "@reduxjs/toolkit";


const requestSlice = createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addRequest:(state,action)=>{
            return action.payload;
        },
        removeRequest:(state,action)=>{
            return state.filter((x) => x.fromUserId._id !== action.payload);
        },
    }
})

export const {addRequest , removeRequest} = requestSlice.actions;

export default requestSlice.reducer;