import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

import Body from "./components/Body";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Signup from "./components/Signup";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>

          {/* Layout */}
          <Route path="/" element={<Body />}>

            {/* LANDING PAGE */}
            <Route index element={<Landing />} />

            {/* AUTH */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            {/* PROTECTED */}
            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
