// src/components/Body.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";

const Body = () => {
  const user = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <div className={`flex flex-col min-h-screen ${isDark ? "bg-[#0B0E14]" : "bg-gray-50"}`}>
      <Navbar />
      {user ? (
        <div className="flex flex-1 relative overflow-hidden">
          {/* Dynamic Authenticated Shared Shell Layout */}
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      ) : (
        <div className="flex flex-col flex-grow w-full">
          {/* Flat Non-Authenticated Pure Layout Frame Container */}
          <Outlet />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Body;