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
} from "react-icons/fa";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const { sidebar } = useSelector((state) => state.sideBar);
  const { theme } = useSelector((state) => state.theme);
  const search = useSelector((state) => state.feed.search);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        className={`navbar px-4 sm:px-6
        bg-[#0B1220]/90 backdrop-blur-sm
        border-b border-white/10
        text-white`}
      >
        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-2 shrink-0">
          {user && (
            <button
              onClick={() => dispatch(toggleSibeBar(!sidebar))}
              className="btn btn-ghost btn-circle lg:hidden"
            >
              {sidebar ? <FaTimes /> : <FaBars />}
            </button>
          )}

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/feed")}
          >
            <img src={logo} alt="Logo" className="w-9 h-9" />
            <span className="hidden sm:block text-lg font-bold">
              Gittogether
            </span>
          </div>
        </div>

        {/* ================= CENTER (SEARCH) ================= */}
        {user && (
          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="relative w-full max-w-sm">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search developers"
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                className="w-full pl-11 pr-4 py-2 rounded-full
                           bg-white/5 border border-white/10
                           text-white placeholder-gray-400
                           focus:outline-none focus:ring-1 focus:ring-blue-500/40"
              />
            </div>
          </div>
        )}

        {/* ================= RIGHT ================= */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {user && (
            <>
              <button
                onClick={() => navigate("/message")}
                className="btn btn-ghost btn-circle"
              >
                <FaEnvelope />
              </button>

              <button
                onClick={() => navigate("/notification")}
                className="btn btn-ghost btn-circle"
              >
                <FaBell />
              </button>
            </>
          )}

          {!user && (
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-full
                         bg-gradient-to-r from-blue-600 to-indigo-600
                         text-white font-semibold shadow
                         hover:scale-105 transition"
            >
              Login
            </button>
          )}

          {/* ================= PROFILE DROPDOWN ================= */}
          {user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                  {user.firstName?.charAt(0)}
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 w-56 rounded-xl
                           bg-[#0F172A] border border-white/10
                           shadow-lg p-2 z-[20]"
              >
                <li className="px-3 py-2 text-sm font-semibold opacity-80">
                  {user.firstName || user.emailId}
                </li>

                <div className="divider my-1" />

                <li><Link to="/feed"><FaHome /> Feed</Link></li>
                <li><Link to="/profile"><FaUser /> Profile</Link></li>
                <li><Link to="/connection"><FaUsers /> Connections</Link></li>
                <li><Link to="/request"><FaHandshake /> Requests</Link></li>

                <div className="divider my-1" />

                <li>
                  <button onClick={() => dispatch(toggleTheme())}>
                    {theme === "dark" ? <FaSun /> : <FaMoon />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </button>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="text-error font-semibold hover:bg-error hover:text-white rounded-lg"
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
