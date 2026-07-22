import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { setSearch } from "../utils/feedSlice";
import { setNotificationsData, addNotificationItem, markItemAsRead } from "../utils/notificationSlice";

import logo from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL, SEARCH_API } from "../utils/constants";
import SearchResults from "./SearchResults";
import { createSocketConnection } from "../utils/socket";
import { formatDistanceToNow } from "date-fns";

import {
  FaBell,
  FaEnvelope,
  FaUser,
  FaSignOutAlt,
  FaUsers,
  FaHandshake,
  FaSearch,
  FaHome,
  FaCrown,
  FaComments,
} from "react-icons/fa";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const { notifications, unreadCount } = useSelector((state) => state.notifications || { notifications: [], unreadCount: 0 });

  const [localSearch, setLocalSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  
  const searchContainerRef = useRef(null);
  const notifContainerRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchInitialNotifications = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/notifications`, { withCredentials: true });
        if (res.data?.success) {
          dispatch(setNotificationsData({
            notifications: res.data.data.notifications,
            unreadCount: res.data.data.unreadCount
          }));
        }
      } catch (err) {
        console.error("Failed structural loading of notification metadata stream", err);
      }
    };

    fetchInitialNotifications();
  }, [user, dispatch]);

  useEffect(() => {
    if (!user) return;

    const socket = createSocketConnection();
    
    const handleIncomingNotification = (notificationPayload) => {
      dispatch(addNotificationItem(notificationPayload));
    };

    socket.on("new-notification", handleIncomingNotification);

    return () => {
      socket.off("new-notification", handleIncomingNotification);
    };
  }, [user, dispatch]);

  useEffect(() => {
    if (localSearch.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}${SEARCH_API}?q=${encodeURIComponent(localSearch)}`,
          { withCredentials: true }
        );
        setResults(res.data?.data || []);
      } catch (err) {
        console.error("Search query execution failed", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [localSearch]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setLocalSearch("");
      }
      if (notifContainerRef.current && !notifContainerRef.current.contains(e.target)) {
        setShowNotifDropdown(false);
      }
    };
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setLocalSearch("");
        setShowNotifDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleSelectDeveloper = (userId) => {
    setLocalSearch("");
    setResults([]);
    navigate("/profile/" + userId);
  };

  const handleLogout = async () => {
    try {
      // Await the backend clearing the httpOnly cookie first.
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
    } catch (err) {
      // Even if the network call fails, we still want to clear local auth
      // state and route the user away from protected content — the app
      // should never depend on this call succeeding to log the user out
      // client-side, and any subsequent authenticated request will fail
      // and be caught by ProtectedRoute anyway.
      console.error("Logout request failed", err);
    } finally {
      // Clearing Redux + navigating away happens unconditionally so the
      // UI never gets stuck showing protected content after logout.
      dispatch(removeUser());
      navigate("/login", { replace: true });
    }
  };

  const handleNotificationClick = async (notif) => {
    setShowNotifDropdown(false);
    if (!notif.isRead) {
      try {
        await axios.patch(`${BASE_URL}/notifications/${notif._id}/read`, {}, { withCredentials: true });
        dispatch(markItemAsRead(notif._id));
      } catch (err) {
        console.error("Error reading notification item", err);
      }
    }
    navigate(notif.link);
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`navbar px-4 sm:px-6 py-2.5
        bg-[#0B0E14]/80 backdrop-blur-xl
        border-b border-white/10
        text-white`}
      >
        {/* ================= LEFT ================= */}
        <div className="flex items-center shrink-0">
          <div
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group"
            onClick={() => navigate(user ? "/feed" : "/login")}
          >
            <img src={logo} alt="Logo" className="w-9 h-9 transition-transform group-hover:scale-105" />
            <span className="block text-base sm:text-lg font-bold tracking-tight bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              GitTogether
            </span>
          </div>
        </div>

        {/* ================= CENTER (SEARCH) ================= */}
        {user && (
          <div className="hidden md:flex flex-1 justify-center px-6">
            <div ref={searchContainerRef} className="relative w-full max-w-sm">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={13} />
              <input
                type="text"
                placeholder="Search developers"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2 rounded-full
                           bg-white/[0.05] border border-white/10
                           text-sm text-white placeholder-gray-500
                           transition-all
                           focus:outline-none focus:border-indigo-400/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-indigo-500/20"
              />
              {localSearch.trim().length >= 2 && (
                <SearchResults
                  results={results}
                  loading={loading}
                  search={localSearch}
                  onSelect={handleSelectDeveloper}
                  onClose={() => setLocalSearch("")}
                />
              )}
            </div>
          </div>
        )}

        {/* ================= RIGHT ================= */}
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {user ? (
            <>
              <button
                type="button"
                onClick={() => navigate("/chat")}
                className="btn btn-ghost btn-circle hover:bg-white/10 transition-colors"
              >
                <FaEnvelope className="text-gray-300" size={15} />
              </button>

              <div ref={notifContainerRef} className="relative">
                <button
                  type="button"
                  onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                  className="btn btn-ghost btn-circle hover:bg-white/10 transition-colors relative"
                >
                  <FaBell className={unreadCount > 0 ? "text-indigo-400 animate-pulse" : "text-gray-300"} size={15} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center px-1 shadow-lg shadow-red-500/30">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifDropdown && (
                  <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-[#0B0E14] border border-white/10 shadow-2xl p-2 z-[1000] text-white">
                    <div className="px-3 py-2 flex items-center justify-between border-b border-white/5">
                      <span className="font-bold text-sm tracking-wide">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full font-medium">
                          {unreadCount} Unread
                        </span>
                      )}
                    </div>
                    
                    <div className="max-h-[320px] overflow-y-auto my-1 space-y-1">
                      {notifications && notifications.length > 0 ? (
                        notifications.slice(0, 15).map((notif) => (
                          <div
                            key={notif._id}
                            onClick={() => handleNotificationClick(notif)}
                            className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${notif.isRead ? "hover:bg-white/[0.04] opacity-75" : "bg-white/[0.03] border-l-2 border-indigo-500 hover:bg-white/[0.06]"}`}
                          >
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center font-bold text-xs shrink-0 shadow">
                              {notif.sender?.photoUrl ? (
                                <img src={notif.sender.photoUrl} alt="" className="w-full h-full rounded-full object-cover" />
                              ) : (
                                (notif.sender?.firstName?.charAt(0) || "?")
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-semibold text-xs truncate">
                                  {notif.sender ? `${notif.sender.firstName} ${notif.sender.lastName || ""}` : "System"}
                                </span>
                                <span className="text-[10px] text-gray-500 shrink-0">
                                  {notif.createdAt ? formatDistanceToNow(new Date(notif.createdAt), { addSuffix: false }) : "now"}
                                </span>
                              </div>
                              <p className="text-xs text-gray-300 mt-0.5 line-clamp-2 leading-relaxed">
                                {notif.message}
                              </p>
                            </div>
                            {!notif.isRead && (
                              <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="py-8 text-center text-xs text-gray-500">
                          No recent notifications setup found
                        </div>
                      )}
                    </div>

                    <div className="border-t border-white/5 pt-1 mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setShowNotifDropdown(false);
                          navigate("/notification");
                        }}
                        className="w-full text-center py-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:bg-white/[0.02] rounded-xl transition-colors"
                      >
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-sm text-white font-semibold shadow-lg shadow-indigo-500/25 hover:scale-105 hover:shadow-cyan-500/35 transition-all duration-300"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="hidden sm:block px-5 py-2 rounded-full border border-white/20 bg-white/[0.03] text-sm text-white font-semibold transition-all duration-300 hover:bg-white/[0.08]"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* ================= PROFILE DROPDOWN ================= */}
          {user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ml-1">
                <div className="relative">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm ${user.isPremium ? "ring-2 ring-yellow-400" : "ring-2 ring-white/10"}`}>
                    {user.firstName?.charAt(0)}
                  </div>

                  {user.isPremium && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-yellow-500 text-black flex items-center justify-center">
                      <FaCrown size={10} />
                    </span>
                  )}
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 w-60 rounded-2xl bg-base-100 text-base-content backdrop-blur-xl border border-base-300 shadow-2xl shadow-black/50 p-2 z-[999]"
              >
                <li className="px-3 pt-2 text-sm font-semibold truncate">
                  {user.firstName || user.emailId}
                </li>
                <li className={`px-3 pb-2 text-xs font-medium tracking-wide ${user.isPremium ? "text-yellow-400" : "text-gray-500"}`}>
                  {user.isPremium ? `${user.premiumType || "Gold"} Member` : "Free Member"}
                </li>

                <div className="divider my-1 border-base-300" />

                <li>
                  <Link to="/feed" className="hover:bg-base-200 rounded-lg">
                    <FaHome /> Feed
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="hover:bg-base-200 rounded-lg">
                    <FaUser /> Profile
                  </Link>
                </li>
                <li>
                  <Link to="/connection" className="hover:bg-base-200 rounded-lg">
                    <FaUsers /> Connections
                  </Link>
                </li>
                <li>
                  <Link to="/chat" className="hover:bg-base-200 rounded-lg">
                    <FaComments /> Chat
                  </Link>
                </li>
                <li>
                  <Link to="/request" className="hover:bg-base-200 rounded-lg">
                    <FaHandshake /> Requests
                  </Link>
                </li>

                <li className="mt-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-red-400 font-semibold hover:bg-red-500 hover:text-white transition-all duration-200 py-2 rounded-lg"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;