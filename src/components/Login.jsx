import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        `${BASE_URL}`,
        { emailId, password },
        { withCredentials: true }
      );

      // ✅ Save user data in Redux
      dispatch(addUser(res.data));

      // ✅ Redirect after login
      navigate("/feed");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">

          <h2 className="text-2xl font-bold text-center">
            Login to <span className="text-primary">Gittogether</span>
          </h2>

          {/* Email */}
          <label className="form-control w-full mt-4">
            <span className="label-text">Email</span>
            <input
              type="email"
              className="input input-bordered w-full"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>

          {/* Password */}
          <label className="form-control w-full mt-3">
            <span className="label-text">Password</span>
            <input
              type="password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {/* Error */}
          {error && <p className="text-error text-sm mt-2">{error}</p>}

          {/* Button */}
          <button
            onClick={handleLogin}
            className={`btn btn-primary w-full mt-4 ${loading ? "loading" : ""}`}
          >
            Login
          </button>

        </div>
      </div>
    </div>
  );
};

export default Login;
