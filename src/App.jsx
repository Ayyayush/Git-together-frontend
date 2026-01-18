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

        {/* ✅ Global Toast Container */}
        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          {/* Layout */}
          <Route path="/" element={<Body />}>

            {/* LANDING */}
            <Route index element={<Landing />} />

            {/* AUTH */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            {/* PROTECTED */}
            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />

            {/* MATCH SIDEBAR */}
            <Route path="connection" element={<Connections />} />
            <Route path="request" element={<Requests />} />
            <Route path="notification" element={<Notification />} />
            <Route path="message" element={<Message />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />

          </Route>
        </Routes>

      </BrowserRouter>
    </Provider>
  );
}

export default App;
