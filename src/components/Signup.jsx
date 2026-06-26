import { Link, useNavigate } from "react-router-dom";
import Chat from "../assets/Chat.gif";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaCode, FaTerminal } from "react-icons/fa6";
import { signupValidation } from "../utils/validation";

const Signup = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const isValid = signupValidation({ user, setError });
    if (!isValid) return;

    try {
      await axios.post(
        `${BASE_URL}/signup`,
        user,
        { withCredentials: true }
      );

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <main className="relative flex-grow flex flex-col lg:flex-row items-center justify-center px-4 py-12 sm:px-6 lg:px-16 overflow-hidden bg-[#0D1117] text-gray-200 min-h-[calc(100vh-64px)]">
      {/* Decorative Premium Background Gradients & Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-indigo-600/10 to-purple-600/0 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-emerald-600/10 to-cyan-600/0 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Form Container Side */}
        <div className="w-full lg:w-[52%] max-w-md mx-auto lg:mx-0">
          <div className="backdrop-blur-xl bg-gray-900/40 border border-gray-800 p-8 rounded-2xl shadow-2xl shadow-black/40 relative group transition-all duration-300 hover:border-gray-700/60">
            {/* Top Indicator Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_12px_rgba(99,102,241,0.5)]" />
            
            {/* Header Content */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
                <FaTerminal className="w-3 h-3" /> Initializing Session
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Join the Network
              </h1>
              <p className="text-gray-400 text-sm mt-1.5">
                Create your GitTogether developer profile.
              </p>
            </div>

            {/* Error Message Box */}
            {error && (
              <div className="alert alert-error bg-red-950/40 border border-red-800/60 text-red-300 text-sm py-3 px-4 rounded-xl mb-5 flex items-center gap-2 animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
              </div>
            )}

            {/* Registration Form */}
            <form className="space-y-4" onSubmit={handleSubmitForm}>
              
              {/* Names Field Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <FaUser className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleInputData}
                    className="w-full bg-[#090D14] border border-gray-800 text-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-600 hover:border-gray-700"
                  />
                </div>
                <div className="form-control relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <FaUser className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleInputData}
                    className="w-full bg-[#090D14] border border-gray-800 text-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-600 hover:border-gray-700"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="form-control relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <FaEnvelope className="w-3.5 h-3.5" />
                </span>
                <input
                  type="email"
                  placeholder="Email Address"
                  name="emailId"
                  value={user.emailId}
                  onChange={handleInputData}
                  className="w-full bg-[#090D14] border border-gray-800 text-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-600 hover:border-gray-700"
                />
              </div>

              {/* Password Field */}
              <div className="form-control relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <FaLock className="w-3.5 h-3.5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (Min 6 characters)"
                  name="password"
                  value={user.password}
                  onChange={handleInputData}
                  className="w-full bg-[#090D14] border border-gray-800 text-gray-100 rounded-xl pl-10 pr-11 py-3 text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-600 hover:border-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full mt-2 btn bg-indigo-600 hover:bg-indigo-500 text-white font-medium border-none rounded-xl py-3 shadow-[0_4px_20px_rgba(79,70,229,0.3)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
              >
                Create Developer Account
              </button>
            </form>

            {/* Form Footer / Redirect Link */}
            <div className="mt-6 pt-5 border-t border-gray-800 text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors underline underline-offset-4 decoration-indigo-500/40 hover:decoration-indigo-400">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Brand Illustration Side */}
        <div className="w-full lg:w-[48%] hidden lg:flex flex-col items-center justify-center text-center">
          <div className="relative group p-6 rounded-2xl bg-gradient-to-b from-gray-900/20 to-transparent border border-gray-800/40 shadow-inner max-w-md">
            {/* Tiny Floating Badges */}
            <div className="absolute -top-4 -left-4 animate-bounce duration-1000 bg-gray-900 border border-gray-700 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-mono shadow-xl shadow-black/50">
              <FaCode className="text-emerald-400" /> <span>Connect</span>
            </div>
            <div className="absolute -bottom-2 -right-4 animate-pulse bg-gray-900 border border-gray-700 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-mono shadow-xl shadow-black/50">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span>Collab Live</span>
            </div>

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