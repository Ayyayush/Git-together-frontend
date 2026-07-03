import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { toggleSibeBar } from "../utils/sidebarSlice"; 
import { toggleTheme } from "../utils/themeSlice";
import { setSearch } from "../utils/feedSlice";

import logo from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

import {
  FaBell,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaUser,
  FaSignOutAlt,
  FaUsers,
  FaHandshake,
  FaSearch,
  FaHome,
  FaCrown,
} from "react-icons/fa";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const { sidebar } = useSelector((state) => state.sideBar);
  const { theme } = useSelector((state) => state.theme);
  const search = useSelector((state) => state.feed.search);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Single source of truth syncs Redux state seamlessly to DOM and Storage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
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
        <div className="flex items-center gap-3 shrink-0">
          {user && (
            <button
              type="button"
              onClick={() => dispatch(toggleSibeBar(!sidebar))}
              className="btn btn-ghost btn-circle lg:hidden hover:bg-white/10"
            >
              {sidebar ? <FaTimes /> : <FaBars />}
            </button>
          )}

          <div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => navigate("/feed")}
          >
            <img src={logo} alt="Logo" className="w-9 h-9 transition-transform group-hover:scale-105" />
            <span className="hidden sm:block text-lg font-bold tracking-tight bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              GitTogether
            </span>
          </div>
        </div>

        {/* ================= CENTER (SEARCH) ================= */}
        {user && (
          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="relative w-full max-w-sm">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={13} />
              <input
                type="text"
                placeholder="Search developers"
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                className="w-full pl-11 pr-4 py-2 rounded-full
                           bg-white/[0.05] border border-white/10
                           text-sm text-white placeholder-gray-500
                           transition-all
                           focus:outline-none focus:border-indigo-400/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
        )}

        {/* ================= RIGHT ================= */}
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {user && (
            <>
              <button
                type="button"
                onClick={() => navigate("/message")}
                className="btn btn-ghost btn-circle hover:bg-white/10 transition-colors"
              >
                <FaEnvelope className="text-gray-300" size={15} />
              </button>

              <button
                type="button"
                onClick={() => navigate("/notification")}
                className="btn btn-ghost btn-circle hover:bg-white/10 transition-colors"
              >
                <FaBell className="text-gray-300" size={15} />
              </button>
            </>
          )}

          {!user && (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-full
                         bg-gradient-to-r from-indigo-500 to-cyan-500
                         text-sm text-white font-semibold shadow-lg shadow-indigo-500/25
                         hover:scale-105 hover:shadow-cyan-500/35 transition-all duration-300"
            >
              Login
            </button>
          )}

          {/* ================= PROFILE DROPDOWN ================= */}
          {user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ml-1">
                <div className="relative">
                  {/* Dynamic Premium Border Ring */}
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm ${user.isPremium ? "ring-2 ring-yellow-400" : "ring-2 ring-white/10"}`}>
                    {user.firstName?.charAt(0)}
                  </div>

                  {/* Golden Badge Wrapper */}
                  {user.isPremium && (
                    <span
                      className="absolute -top-1 -right-1
                                 w-5 h-5 rounded-full
                                 bg-yellow-500 text-black
                                 flex items-center justify-center"
                    >
                      <FaCrown size={10} />
                    </span>
                  )}
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 w-60 rounded-2xl
                           bg-base-100 text-base-content backdrop-blur-xl border border-base-300
                           shadow-2xl shadow-black/50 p-2 z-[999]"
              >
                {/* Enhanced Dropdown Header Info Stack */}
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
                  <Link to="/request" className="hover:bg-base-200 rounded-lg">
                    <FaHandshake /> Requests
                  </Link>
                </li>

                <div className="divider my-2 border-base-300" />

                <li>
                  <button
                    type="button"
                    onClick={() => dispatch(toggleTheme())}
                    className="hover:bg-base-200 transition-all duration-200 py-2 rounded-lg"
                  >
                    {theme === "dark" ? <FaSun /> : <FaMoon />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </button>
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