// src/components/Login.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  FiMail,
  FiLock,
  FiAlertCircle,
  FiArrowRight,
  FiTerminal,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiLoader,
} from "react-icons/fi";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { loginValidation } from "../utils/validation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Login = () => {
  const [user, setUser] = useState({ emailId: "", password: "" });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [modalError, setModalError] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameValid, setUsernameValid] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenticatedUser = useSelector((state) => state.user);

  useEffect(() => {
    if (authenticatedUser) {
      if (!authenticatedUser.username) {
        setShowModal(true);
      } else {
        navigate("/feed", { replace: true });
      }
    }
  }, [authenticatedUser, navigate]);

  useEffect(() => {
    if (!newUsername) {
      setUsernameValid(null);
      setModalError("");
      return;
    }
    const usernameRegex = /^[a-z0-9_]+$/;
    if (!usernameRegex.test(newUsername)) {
      setUsernameValid(false);
      setModalError("Lowercase letters, numbers, and underscores only.");
      return;
    }
    if (newUsername.length < 3 || newUsername.length > 30) {
      setUsernameValid(false);
      setModalError("Must be between 3 and 30 characters.");
      return;
    }

    setModalError("");
    const delayDebounce = setTimeout(async () => {
      setCheckingUsername(true);
      try {
        const res = await axios.get(`${BASE_URL}/user/check-username?username=${newUsername}`);
        if (res.data.available) {
          setUsernameValid(true);
        } else {
          setUsernameValid(false);
          setModalError("Username is already taken.");
        }
      } catch {
        setUsernameValid(false);
      } finally {
        setCheckingUsername(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [newUsername]);

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

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { emailId: user.emailId, password: user.password },
        { withCredentials: true }
      );

      toast.success(response?.data?.message || "Login successful");
      const userData = await fetchUserData();
      dispatch(addUser(userData));
    } catch (error) {
      setError(error?.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!usernameValid || checkingUsername) return;

    try {
      await axios.patch(
        `${BASE_URL}/profile/edit`,
        { username: newUsername },
        { withCredentials: true }
      );
      toast.success("Username verified successfully!");
      const updatedData = await fetchUserData();
      dispatch(addUser(updatedData));
      setShowModal(false);
      navigate("/feed", { replace: true });
    } catch (err) {
      setModalError(err.response?.data?.message || "Failed to update your workspace profile routing parameters.");
    }
  };

  return (
    <main className="relative flex-grow flex flex-col lg:flex-row items-center justify-center bg-[#0B0E14] overflow-hidden px-6 py-12 lg:py-0 min-h-[calc(100vh-64px)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[26rem] h-[26rem] bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[22rem] h-[22rem] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[18rem] h-[18rem] bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      {/* ================= LOGIN CARD ================= */}
      <div className="relative z-10 lg:w-1/2 w-full max-w-md">
        {/* Animated gradient border wrapper */}
        <div className="relative rounded-[1.75rem] p-[1.5px] overflow-hidden">
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,rgba(99,102,241,0.6),rgba(34,211,238,0.6),rgba(139,92,246,0.6),rgba(99,102,241,0.6))] animate-[spin_6s_linear_infinite] opacity-70" />

          <div className="relative flex flex-col justify-center rounded-[1.75rem] border border-white/10 bg-[#0B0E14]/95 backdrop-blur-xl shadow-2xl shadow-black/50 p-8 lg:p-10">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Welcome back 👋
            </h2>
            <p className="text-gray-400 mb-8">
              Sign in to continue to GitTogether
            </p>

            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div className="relative">
                <label htmlFor="emailId" className="sr-only">
                  Email
                </label>
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors peer-focus:text-cyan-400" size={16} />
                <input
                  id="emailId"
                  type="email"
                  name="emailId"
                  value={user.emailId}
                  onChange={handleInputData}
                  className="peer w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-100 placeholder:text-gray-600 outline-none transition-all duration-300 focus:border-indigo-400/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-indigo-500/20 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                  placeholder="Enter your email"
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={handleInputData}
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-100 placeholder:text-gray-600 outline-none transition-all duration-300 focus:border-indigo-400/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-indigo-500/20 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>

              {/* Remember me / forgot password */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="peer sr-only"
                  />
                  <span
                    className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all duration-200 ${
                      rememberMe
                        ? "bg-gradient-to-br from-indigo-500 to-cyan-500 border-transparent"
                        : "border-white/20 bg-white/[0.03]"
                    }`}
                  >
                    {rememberMe && <FiCheckCircle size={11} className="text-white" />}
                  </span>
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-sm text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400 animate-fade-in">
                  <FiAlertCircle size={14} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex items-center justify-center gap-2 py-3.5 mt-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-cyan-500/40 hover:brightness-110 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                {isSubmitting ? (
                  <>
                    <FiLoader size={16} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Login
                    <FiArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-7">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="text-[11px] uppercase tracking-widest text-gray-600">
                New here
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <p className="text-sm text-gray-400 text-center">
              {"Don't have an account?"}{" "}
              <Link
                to="/signup"
                className="text-cyan-400 hover:text-cyan-300 hover:underline font-medium transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 lg:w-1/2 w-full flex justify-center items-center mt-8 lg:mt-0">
        <div className="w-full lg:w-4/5">
          <DotLottieReact
            src="https://lottie.host/8dd0524f-f3b2-4d4b-b190-f366c609d5b5/xA7UOO5kmG.lottie"
            loop
            autoplay
          />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md rounded-2xl border border-indigo-500/30 bg-[#0F131F] p-8 shadow-2xl shadow-indigo-500/10 text-center animate-fade-in">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
              <FiTerminal size={12} /> Action Required
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">Choose your username</h3>
            <p className="text-sm text-gray-400 mt-2 mb-6">
              Your developer namespace migration is incomplete. Choose a persistent handle to continue.
            </p>
            <form onSubmit={handleModalSubmit} className="space-y-4 text-left">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 font-mono text-sm">
                  @
                </span>
                <input
                  type="text"
                  required
                  placeholder="username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value.toLowerCase().replace(/\s/g, ""))}
                  className={`w-full bg-[#090D14] border text-gray-100 rounded-xl pl-8 pr-10 py-3 text-sm font-mono outline-none transition-all ${
                    usernameValid === true ? "border-emerald-500 focus:ring-1 focus:ring-emerald-500" :
                    usernameValid === false ? "border-red-500 focus:ring-1 focus:ring-red-500" :
                    "border-gray-800 focus:border-indigo-500"
                  }`}
                />
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                  {checkingUsername && <span className="h-4 w-4 rounded-full border-2 border-t-cyan-400 border-white/10 animate-spin" />}
                  {usernameValid === true && <FiCheckCircle className="text-emerald-500 w-4 h-4" />}
                </span>
              </div>
              {modalError && (
                <div className="flex items-center gap-2 px-1 text-xs text-red-400 font-mono">
                  {modalError}
                </div>
              )}
              <button
                type="submit"
                disabled={!usernameValid || checkingUsername}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 font-bold text-white shadow-lg shadow-indigo-600/30 hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Claim Space & Enter
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Login;