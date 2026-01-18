import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { toggleSibeBar } from "../utils/sidebarSlice";
import { toggleTheme } from "../utils/themeSlice";

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
} from "react-icons/fa";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const { sidebar } = useSelector((state) => state.sideBar);
  const { theme } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/"); // ✅ Landing page
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div
      className={`navbar shadow-md px-3 sm:px-6 z-50 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-base-100 text-gray-800"
      }`}
    >
      {/* LEFT */}
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
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Logo" className="w-9 h-9" />
          <span className="hidden sm:block text-lg font-bold">
            Gittogether
          </span>
        </div>
      </div>

      {/* CENTER */}
      {user && (
        <div className="hidden md:flex flex-1 justify-center px-6">
          <input
            type="text"
            placeholder="Search developers"
            className="input input-bordered w-full max-w-sm"
          />
        </div>
      )}

      {/* RIGHT */}
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
            className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:scale-105 transition"
          >
            Login
          </button>
        )}

        {/* STYLED DROPDOWN */}
        {user && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                {user.firstName?.charAt(0)}
              </div>
            </div>

            <ul
              tabIndex={0}
              className={`menu dropdown-content mt-3 w-56 rounded-xl shadow-xl p-2 z-[20]
                ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"}
              `}
            >
              {/* Header */}
              <li className="px-3 py-2 text-sm font-semibold opacity-80 cursor-default">
                {user.firstName || user.emailId}
              </li>

              <div className="divider my-1"></div>

              <li>
                <Link to="/profile" className="flex items-center gap-3">
                  <FaUser /> Profile
                </Link>
              </li>

              <li>
                <Link to="/connection" className="flex items-center gap-3">
                  <FaUsers /> Connections
                </Link>
              </li>

              <li>
                <Link to="/request" className="flex items-center gap-3">
                  <FaHandshake /> Requests
                </Link>
              </li>

              <div className="divider my-1"></div>

              <li>
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="flex items-center gap-3"
                >
                  {theme === "dark" ? <FaSun /> : <FaMoon />}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-error font-semibold hover:bg-error hover:text-white"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
