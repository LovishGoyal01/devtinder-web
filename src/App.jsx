import { Route, Routes } from "react-router-dom";
import Body from "./componants/Body";
import Login from "./componants/Login";
import Profile from "./componants/Profile";
import Feed from "./componants/Feed";
import Connections from "./componants/Connections";
import Requests from "./componants/Requests";
import Chat from "./componants/Chat";

import { Toaster } from "react-hot-toast";

const App = () => {

  return (
    <>
      <Toaster position="top-center" toastOptions={{ style: { maxWidth: "420px", whiteSpace: "nowrap", }, }} />
      
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Feed />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="connections" element={<Connections />} />
          <Route path="requests" element={<Requests />} />
          <Route path="chat/:targetUserId" element={<Chat />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

