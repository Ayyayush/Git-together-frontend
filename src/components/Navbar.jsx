import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ==========================
  // Logout handler (IMPORTANT ADD)
  // ==========================
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
    <div className="navbar bg-base-100 shadow-md px-3 sm:px-4 md:px-8">

      {/* LEFT: Logo + Brand */}
      <div className="flex items-center flex-shrink-0">
        <img
          src={logo}
          alt="Gittogether Logo"
          className="w-8 h-8 object-contain"
        />
        <span className="ml-2 text-lg sm:text-xl font-bold tracking-wide whitespace-nowrap">
          Gittogether
        </span>
      </div>

      {/* CENTER: Search (ONLY when user is logged in) */}
      {user && (
        <div className="hidden md:flex flex-1 justify-center px-4">
          <input
            type="text"
            placeholder="Search developers"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
      )}

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">

        {/* Mobile search icon (ONLY after login) */}
        {user && (
          <button className="btn btn-ghost btn-circle md:hidden">
            🔍
          </button>
        )}

        {/* Notifications (ONLY after login) */}
        {user && (
          <button className="btn btn-ghost btn-circle">
            🔔
          </button>
        )}

        {/* If NOT logged in → Login button */}
        {!user && (
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary btn-sm"
          >
            Login
          </button>
        )}

        {/* Profile dropdown (ONLY when logged in) */}
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 sm:w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
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
              className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 shadow-lg z-[10]"
            >
              <li className="px-2 py-1 text-sm font-semibold truncate">
                {user.firstName || user.emailId}
              </li>

              <li>
                <a onClick={() => navigate("/profile")}>Profile</a>
              </li>

              <li><a>Settings</a></li>

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
