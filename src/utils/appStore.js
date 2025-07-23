import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";
import FeedReducer from "./feedSlice";
import ConnectionsReducer from "./connectionSlice";

const appStore = configureStore({
    reducer:{
        user:UserReducer,
        feed:FeedReducer,
        connections:ConnectionsReducer,
    }
})

export default appStore;