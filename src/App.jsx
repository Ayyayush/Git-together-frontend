// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Notification from "./components/Notification";
import Message from "./components/Message";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            {/* Public Routes */}
            <Route index element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

            {/* Protected Routes */}
            <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/profile/:userId" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/connection" element={<ProtectedRoute><Connections /></ProtectedRoute>} />
            <Route path="/request" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><Message /></ProtectedRoute>} />
            <Route path="/chat/:targetUserId" element={<ProtectedRoute><Message /></ProtectedRoute>} />
            <Route path="/message" element={<ProtectedRoute><Navigate to="/chat" replace /></ProtectedRoute>} />
            <Route path="/notification" element={<ProtectedRoute><Notification /></ProtectedRoute>} />

            {/* Catch All / 404 Alternative */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;