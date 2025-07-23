import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";
import FeedReducer from "./feedSlice";

const appStore = configureStore({
    reducer:{
        user:UserReducer,
        feed:FeedReducer,
    }
})

export default appStore;