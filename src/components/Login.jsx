import { Link, useNavigate } from "react-router-dom";
import swipe from "../assets/swipe.gif";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { loginValidation } from "../utils/validation";

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
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* MOBILE IMAGE */}
      <div className="flex lg:hidden justify-center mt-6 mb-4">
        <img
          src={swipe}
          alt="Login Illustration"
          className="w-40 h-40 object-contain"
        />
      </div>

      {/* LEFT : LOGIN FORM */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-8">
        <div className="w-full max-w-md shadow-lg p-6 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-2">
            Welcome back 👋
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Sign in to continue to GitTogether
          </p>

          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="emailId"
                value={user.emailId}
                onChange={handleInputData}
                className="mt-1 w-full p-3 border rounded text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInputData}
                className="mt-1 w-full p-3 border rounded text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-4">
            {"Don't have an account?"}{" "}
            <Link to="/signup" className="text-blue-500 underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* DESKTOP IMAGE */}
      <div className="hidden lg:flex flex-1 justify-center items-center">
        <div className="w-[320px] h-[320px] bg-pink-200 rounded-full flex items-center justify-center shadow-xl">
          <img
            src={swipe}
            alt="Login Illustration"
            className="w-64 h-64 object-contain rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
