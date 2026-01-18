import { Link, useLocation } from "react-router-dom";
import {
  FaCompass,
  FaUserFriends,
  FaBell,
  FaHandshake,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const activeTab = location.pathname;
  const { sidebar } = useSelector((store) => store.sideBar);
  const { theme } = useSelector((store) => store.theme);

  return (
    <div
      className={`fixed top-[64px] z-30 h-full shadow-lg md:static md:shadow-none transition-all ${
        sidebar ? "left-0" : "-left-[260px]"
      } ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
      }`}
    >
      <aside className="w-64 h-full p-6 shadow-2xl flex flex-col justify-between">
        <nav className="space-y-4 flex-grow">

          <Link
            to={"/feed"}
            className={`flex items-center text-gray-400 hover:text-white text-lg p-4 hover:bg-gray-800 rounded-md ${
              activeTab === "/feed" && "bg-gray-800"
            }`}
          >
            <FaCompass className="mr-3" />
            Explore
          </Link>

          <Link
            to={"/connection"}
            className={`flex items-center text-gray-400 hover:text-white text-lg p-4 hover:bg-gray-800 rounded-md ${
              activeTab === "/connection" && "bg-gray-800"
            }`}
          >
            <FaUserFriends className="mr-3" />
            Connections
          </Link>

          <Link
            to={"/notification"}
            className={`flex items-center text-gray-400 hover:text-white text-lg p-4 hover:bg-gray-800 rounded-md ${
              activeTab === "/notification" && "bg-gray-800"
            }`}
          >
            <FaBell className="mr-3" />
            Notifications
          </Link>

          <Link
            to={"/request"}
            className={`flex items-center text-gray-400 hover:text-white text-lg p-4 hover:bg-gray-800 rounded-md ${
              activeTab === "/request" && "bg-gray-800"
            }`}
          >
            <FaHandshake className="mr-3" />
            Requests
          </Link>

          <Link
            to={"/message"}
            className={`flex items-center text-gray-400 hover:text-white text-lg p-4 hover:bg-gray-800 rounded-md ${
              activeTab === "/message" && "bg-gray-800"
            }`}
          >
            <FaEnvelope className="mr-3" />
            Messages
          </Link>

          <Link
            to={"/profile"}
            className={`flex items-center text-gray-400 hover:text-white text-lg p-4 hover:bg-gray-800 rounded-md ${
              activeTab === "/profile" && "bg-gray-800"
            }`}
          >
            <FaUser className="mr-3" />
            Profile
          </Link>

        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
