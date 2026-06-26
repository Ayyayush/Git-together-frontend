import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { FiMail, FiLock, FiAlertCircle, FiArrowRight } from "react-icons/fi";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { loginValidation } from "../utils/validation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Login = () => {
  const [user, setUser] = useState({
    emailId: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isValid = loginValidation({ user, setError });
    if (!isValid) return;

    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        user,
        { withCredentials: true }
      );

      toast.success(response?.data?.message || "Login successful");

      const userData = await fetchUserData();
      dispatch(addUser(userData));

      navigate("/feed");
    } catch (error) {
      setError(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="relative flex-grow flex flex-col lg:flex-row items-center justify-center bg-[#0B0E14] overflow-hidden px-6 py-12 lg:py-0">

      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[26rem] h-[26rem] bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[22rem] h-[22rem] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* LEFT : LOGIN FORM */}
      <div className="relative z-10 lg:w-1/2 w-full max-w-md flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-black/40 p-8 lg:p-10">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Welcome back 👋
        </h2>
        <p className="text-gray-400 mb-8">
          Sign in to continue to GitTogether
        </p>

        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="email"
              name="emailId"
              value={user.emailId}
              onChange={handleInputData}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-gray-100 placeholder:text-gray-600 outline-none transition-all focus:border-indigo-400/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Enter your email"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputData}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-gray-100 placeholder:text-gray-600 outline-none transition-all focus:border-indigo-400/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
              <FiAlertCircle size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 mt-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-cyan-500/40 hover:brightness-110"
          >
            Login
            <FiArrowRight size={16} />
          </button>
        </form>

        <p className="text-sm mt-6 text-gray-400">
          {"Don't have an account?"}{" "}
          <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 hover:underline font-medium">
            Sign up for free
          </Link>
        </p>
      </div>

      {/* RIGHT : LOTTIE (SAME SIZE & RESPONSIVENESS AS GIF) */}
      <div className="relative z-10 lg:w-1/2 w-full flex justify-center items-center mt-8 lg:mt-0">
        <div className="w-full lg:w-4/5">
          <DotLottieReact
            src="https://lottie.host/8dd0524f-f3b2-4d4b-b190-f366c609d5b5/xA7UOO5kmG.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    </main>
  );
};

export default Login;