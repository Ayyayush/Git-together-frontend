// src/components/Signup.jsx
import { Link, useNavigate } from "react-router-dom";
import Chat from "../assets/Chat.gif";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
  FaTerminal,
  FaAt,
} from "react-icons/fa6";
import { FiLoader, FiArrowRight } from "react-icons/fi";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    username: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(null); // "checking" | "available" | "taken"
  const [usernameMessage, setUsernameMessage] = useState("");
  const usernameCheckTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const authenticatedUser = useSelector((state) => state.user);

  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Debounced username availability check
  useEffect(() => {
    if (usernameCheckTimeoutRef.current) {
      clearTimeout(usernameCheckTimeoutRef.current);
    }

    if (!user.username || user.username.length < 3) {
      setUsernameStatus(null);
      setUsernameMessage("");
      return;
    }

    setUsernameStatus("checking");
    usernameCheckTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await axios.get(`${BASE_URL}/auth/check-username`, {
          params: { username: user.username },
        });
        if (isMounted.current) {
          if (res.data.available) {
            setUsernameStatus("available");
            setUsernameMessage(res.data.message);
          } else {
            setUsernameStatus("taken");
            setUsernameMessage(res.data.message);
          }
        }
      } catch (err) {
        if (isMounted.current) {
          setUsernameStatus("taken");
          setUsernameMessage("Error checking username availability");
        }
      }
    }, 500); // Debounce for 500ms

    return () => {
      if (usernameCheckTimeoutRef.current) {
        clearTimeout(usernameCheckTimeoutRef.current);
      }
    };
  }, [user.username]);

  useEffect(() => {
    if (authenticatedUser && authenticatedUser.username) {
      navigate("/feed", { replace: true });
    }
  }, [authenticatedUser, navigate]);

  const handleInputData = (e) => {
    if (e.target.name === "username") {
      setUser({ ...user, [e.target.name]: e.target.value.toLowerCase().replace(/\s/g, "") });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setError("");

    if (!user.firstName || !user.lastName || !user.emailId || !user.password || !user.username) {
      setError("All fields are explicitly required.");
      return;
    }

    if (user.firstName.length < 2) {
      setError("First name must be at least 2 characters long.");
      return;
    }

    if (usernameStatus !== "available") {
      setError("Please choose an available username.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(
        `${BASE_URL}/signup`,
        user,
        { withCredentials: true }
      );
      navigate("/login");
    } catch (err) {
      if (isMounted.current) {
        setError(err.response?.data?.message || "Registration sequence failed");
      }
    } finally {
      if (isMounted.current) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <main className="relative flex-grow flex flex-col lg:flex-row items-center justify-center bg-[#0B0E14] overflow-hidden px-6 py-12 lg:py-0 min-h-[calc(100vh-64px)]">
      {/* Background Glow Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[26rem] h-[26rem] bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[22rem] h-[22rem] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[18rem] h-[18rem] bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16 justify-center">
        {/* ================= SIGNUP CARD ================= */}
        <div className="relative z-10 lg:w-1/2 w-full max-w-md">
          {/* Animated gradient border wrapper */}
          <div className="relative rounded-[1.75rem] p-[1.5px] overflow-hidden">
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,rgba(99,102,241,0.6),rgba(34,211,238,0.6),rgba(139,92,246,0.6),rgba(99,102,241,0.6))] animate-[spin_6s_linear_infinite] opacity-70" />

            <div className="relative flex flex-col justify-center rounded-[1.75rem] border border-white/10 bg-[#0B0E14]/95 backdrop-blur-xl shadow-2xl shadow-black/50 p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4 self-start">
                <FaTerminal size={12} /> Initializing Session
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                Join the Network
              </h2>
              <p className="text-gray-400 mb-8">
                Create your GitTogether developer profile.
              </p>

              <form className="space-y-4" onSubmit={handleSubmitForm}>
                {/* First Name & Last Name Split Field */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label htmlFor="firstName" className="sr-only">First Name</label>
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors peer-focus:text-cyan-400" size={14} />
                    <input
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleInputData}
                      className="peer w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-100 placeholder:text-gray-600 outline-none transition-all duration-300 focus:border-indigo-400/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-indigo-500/20 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="lastName" className="sr-only">Last Name</label>
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors peer-focus:text-cyan-400" size={14} />
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleInputData}
                      className="peer w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-100 placeholder:text-gray-600 outline-none transition-all duration-300 focus:border-indigo-400/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-indigo-500/20 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                    />
                  </div>
                </div>

                {/* Username Field */}
                <div className="relative">
                  <label htmlFor="username" className="sr-only">Username</label>
                  <FaAt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors peer-focus:text-cyan-400" size={14} />
                  <input
                    id="username"
                    type="text"
                    placeholder="username"
                    name="username"
                    value={user.username}
                    onChange={handleInputData}
                    className="peer w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-100 placeholder:text-gray-600 outline-none transition-all duration-300 focus:border-indigo-400/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-indigo-500/20 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                  />
                </div>
                
                {/* Username Availability Status */}
                {user.username && user.username.length >= 3 && (
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-mono ${
                    usernameStatus === "checking" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30" :
                    usernameStatus === "available" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" :
                    "bg-red-500/10 text-red-400 border border-red-500/30"
                  }`}>
                    <span className={`inline-block w-2 h-2 rounded-full ${
                      usernameStatus === "checking" ? "bg-yellow-400 animate-pulse" :
                      usernameStatus === "available" ? "bg-emerald-400" :
                      "bg-red-400"
                    }`} />
                    {usernameMessage || "Checking..."}
                  </div>
                )}

                {/* Email Field */}
                <div className="relative">
                  <label htmlFor="emailId" className="sr-only">Email</label>
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors peer-focus:text-cyan-400" size={14} />
                  <input
                    id="emailId"
                    type="email"
                    placeholder="Email Address"
                    name="emailId"
                    value={user.emailId}
                    onChange={handleInputData}
                    className="peer w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-100 placeholder:text-gray-600 outline-none transition-all duration-300 focus:border-indigo-400/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-indigo-500/20 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <label htmlFor="password" className="sr-only">Password</label>
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password (Min 8 characters)"
                    name="password"
                    value={user.password}
                    onChange={handleInputData}
                    className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-100 placeholder:text-gray-600 outline-none transition-all duration-300 focus:border-indigo-400/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-indigo-500/20 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400 animate-fade-in">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex items-center justify-center gap-2 py-3.5 mt-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-cyan-500/40 hover:brightness-110 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  {isSubmitting ? (
                    <>
                      <FiLoader size={16} className="animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Developer Account
                      <FiArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-7">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="text-[11px] uppercase tracking-widest text-gray-600">
                  Registered handles
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              <p className="text-sm text-gray-400 text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-cyan-400 hover:text-cyan-300 hover:underline font-medium transition-colors"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* ================= GRAPHIC DISPLAY PANEL ================= */}
        <div className="w-full lg:w-1/2 hidden lg:flex flex-col items-center justify-center text-center">
          <div className="relative group p-6 rounded-2xl bg-gradient-to-b from-gray-900/20 to-transparent border border-gray-800/40 shadow-inner max-w-md">
            <img
              src={Chat}
              alt="GitTogether Platform Preview"
              className="w-full h-auto max-h-[340px] object-contain rounded-xl opacity-90 transition-all duration-500 group-hover:scale-[1.02] filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            />
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-200">The Global Developer Coffeehouse</h3>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                Match with founders, build side projects, exchange stack reviews, and connect directly with hiring teams using your real codebase metrics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;