import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Page content will be rendered here */}
      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Body;
