import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    const publicRoutes = ["/", "/login", "/signup"];

    // 🚫 Do NOT call auth API on public pages
    if (publicRoutes.includes(location.pathname)) return;

    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a]">
      <Navbar />

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Body;
