import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";
import FeedReducer from "./feedSlice";
import ConnectionsReducer from "./connectionSlice";
import RequestReducer from "./requestSlice";

const appStore = configureStore({
    reducer:{
        user:UserReducer,
        feed:FeedReducer,
        connections:ConnectionsReducer,
        requests:RequestReducer,
    }
})

export default appStore;