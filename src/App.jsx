import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./componants/Body";
import Login from "./componants/Login";
import Profile from "./componants/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./componants/Feed";
import Connections from "./componants/Connections";
import Requests from "./componants/Requests";
import Chat from "./componants/Chat";


const App = ()=> {
  
  return (
    <Provider store={appStore}>  
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body/>}>
              <Route path="/" element={<Feed/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/connections" element={<Connections/>} />
              <Route path="/requests" element={<Requests/>} />
              <Route path="/chat/:targetUserId" element={<Chat/>} />
            </Route>  
          </Routes>
       </BrowserRouter>
      </Provider> 
  )
}

export default App;
