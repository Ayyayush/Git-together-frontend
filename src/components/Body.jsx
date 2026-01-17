import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Login from "./Login";

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Page content will be rendered here */}
      <div className="flex-1">
        <Outlet />
      </div>
      <Login/>

      <Footer />
    </div>
  );
};

export default Body;
