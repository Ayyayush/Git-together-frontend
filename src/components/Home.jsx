import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Home;
