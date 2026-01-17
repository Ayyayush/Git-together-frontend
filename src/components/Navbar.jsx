import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import logo from "../assets/logo.png";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-3 sm:px-4 md:px-8">

      {/* LEFT: Logo + Brand (never break) */}
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

      {/* CENTER: Search (desktop only) */}
      <div className="hidden md:flex flex-1 justify-center px-4">
        <input
          type="text"
          placeholder="Search developers"
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">

        {/* Mobile search */}
        <button className="btn btn-ghost btn-circle md:hidden">
          🔍
        </button>

        {/* Notifications */}
        <button className="btn btn-ghost btn-circle">
          🔔
        </button>

        {/* Profile */}
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
                {user.name || user.email}
              </li>

              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge badge-primary badge-sm">New</span>
                </a>
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
