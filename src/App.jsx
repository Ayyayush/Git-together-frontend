import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>

          {/* Layout Route */}
          <Route path="/" element={<Body />}>

            {/* Default route */}
            <Route index element={<Login />} />

            {/* Public routes */}
            <Route path="login" element={<Login />} />
            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
