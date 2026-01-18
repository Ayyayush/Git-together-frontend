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
    <div className="flex flex-col lg:flex-row h-full">
      {/* LEFT : LOGIN FORM */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="max-w-md w-full shadow-lg p-4 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-4">
            Welcome 🙌, Gittogether
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Welcome back, please enter your details.
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
              <div className="text-red-500 text-sm">{error}</div>
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

      {/* RIGHT : IMAGE (FIXED UI) */}
      <div className="flex-1 flex justify-center items-center relative">
        {/* Oval background */}
        <div className="w-[320px] h-[320px] bg-pink-200 rounded-full flex items-center justify-center translate-x-8 shadow-xl">
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
