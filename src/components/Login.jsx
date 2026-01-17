import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:7777/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true, // 🔐 VERY IMPORTANT
        }
      );

      console.log("Login success:", res.data);
      // later: navigate("/feed")

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body">

          <h2 className="text-2xl font-bold text-center">
            Login to <span className="text-primary">Gittogether</span>
          </h2>

          {/* Email */}
          <label className="form-control w-full mt-4">
            <span className="label-text font-medium">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>

          {/* Password */}
          <label className="form-control w-full mt-3">
            <span className="label-text font-medium">Password</span>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {/* Error */}
          {error && (
            <p className="text-error text-sm mt-2">{error}</p>
          )}

          {/* Button */}
          <button
            onClick={handleLogin}
            className={`btn btn-primary w-full mt-5 ${loading ? "loading" : ""}`}
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-500 mt-3">
            New here?{" "}
            <span className="text-primary cursor-pointer hover:underline">
              Create an account
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
