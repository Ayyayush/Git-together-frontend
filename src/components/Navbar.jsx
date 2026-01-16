const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-8">
      
      {/* Left: Brand */}
      <div className="flex-1">
        <a className="btn btn-ghost text-xl font-bold tracking-wide">
          Gittogether
        </a>
      </div>

      {/* Center: Search (hidden on small screens) */}
      <div className="hidden md:flex flex-1 justify-center">
        <input
          type="text"
          placeholder="Search developers"
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">

        {/* Mobile Search Icon */}
        <button className="btn btn-ghost btn-circle md:hidden">
          🔍
        </button>

        {/* Notifications */}
        <button className="btn btn-ghost btn-circle">
          🔔
        </button>

        {/* Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 shadow-lg z-[10]"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge badge-primary badge-sm">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li>
              <a className="text-error font-semibold">Logout</a>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
