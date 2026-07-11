// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import appStore from "./utils/appStore";
import { addUser, removeUser } from "./utils/userSlice";
import { BASE_URL } from "./utils/constants";
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

/*
 * ============================
 * AppContent
 * ============================
 * Handles authentication initialization on first load.
 *
 * Why this exists:
 * - JWT lives in an HTTP-only cookie, so the browser has it after a refresh,
 *   but Redux (in-memory) does NOT — Redux always resets to its initial
 *   state on a hard refresh.
 * - Without this step, ProtectedRoute would see `user === null` immediately
 *   after a refresh and redirect to "/", even though the cookie is still
 *   valid, logging the user out.
 * - This component calls GET /profile/view once on mount. If the cookie is
 *   valid, the backend returns the profile and we rehydrate Redux via
 *   addUser(). If not (401), we dispatch removeUser() to make sure Redux
 *   is explicitly null rather than possibly stale.
 * - Routes (and therefore ProtectedRoute / PublicRoute) are not rendered
 *   until this check completes, so no route can make a redirect decision
 *   based on incomplete auth information.
 */
const AppContent = () => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });

        if (!isMounted) return;

        if (res.data?.success && res.data?.data) {
          dispatch(addUser(res.data.data));
        } else {
          dispatch(removeUser());
        }
      } catch (err) {
        // No valid cookie / session expired / not authenticated.
        if (isMounted) {
          dispatch(removeUser());
        }
      } finally {
        if (isMounted) {
          setAuthChecked(true);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0B0E14]">
        <div className="h-10 w-10 rounded-full border-2 border-white/10 border-t-indigo-400 animate-spin" />
      </div>
    );
  }

  return (
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
  );
};

function App() {
  return (
    <Provider store={appStore}>
      <AppContent />
    </Provider>
  );
}

export default App;