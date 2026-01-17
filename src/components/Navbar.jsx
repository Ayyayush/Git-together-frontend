import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import logo from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {
  const user = useSelector((state) => state.user);
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
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-3 sm:px-6">

      {/* LEFT: Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer shrink-0"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="Gittogether Logo"
          className="w-9 h-9 object-contain"
        />

        {/* Hide text on very small screens */}
        <span className="hidden sm:block text-lg font-bold tracking-wide">
          Gittogether
        </span>
      </div>

      {/* CENTER: Search (Desktop only) */}
      {user && (
        <div className="hidden md:flex flex-1 justify-center px-6">
          <input
            type="text"
            placeholder="Search developers"
            className="input input-bordered w-full max-w-sm"
          />
        </div>
      )}

      {/* RIGHT: Actions */}
      <div className="ml-auto flex items-center gap-2 sm:gap-3">

        {/* Mobile Search Icon */}
        {user && (
          <button className="btn btn-ghost btn-circle md:hidden">
            🔍
          </button>
        )}

        {/* Notification */}
        {user && (
          <button className="btn btn-ghost btn-circle">
            🔔
          </button>
        )}

        {/* Login Button */}
        {!user && (
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-full
                       bg-gradient-to-r from-blue-600 to-indigo-600
                       text-white font-semibold
                       shadow hover:shadow-lg
                       transition-transform hover:scale-105"
          >
            Login
          </button>
        )}

        {/* Profile Dropdown */}
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  alt="User Avatar"
                  src={
                    user.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 shadow-lg z-[20]"
            >
              <li className="px-2 py-1 text-sm font-semibold truncate">
                {user.firstName || user.emailId}
              </li>

              <li><a onClick={() => navigate("/profile")}>Profile</a></li>
              <li><Link to="/connections">Connections</Link></li>
              <li><Link to="/requests">Connection Requests</Link></li>

              <li>
                <a
                  onClick={handleLogout}
                  className="text-error font-semibold"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
