import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import appStore from "./utils/appStore";

import Body from "./components/Body";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Notification from "./components/Notification";
import Message from "./components/Message";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          <Route path="/" element={<Body />}>

            <Route index element={<Landing />} />

            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />

            <Route path="connection" element={<Connections />} />
            <Route path="request" element={<Requests />} />
            <Route path="notification" element={<Notification />} />

            {/* UPDATED */}
            <Route path="message/:targetUserId" element={<Message />} />

            <Route path="*" element={<NotFoundPage />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;