import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice"

const appStore = configureStore({
    reducer:{
        user:UserReducer,
    }
})

export default appStore;