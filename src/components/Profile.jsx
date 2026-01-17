import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    about: "",
  });

  const [error, setError] = useState("");

  // ==========================
  // Prefill form from redux
  // ==========================
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        age: user.age || "",
        gender: user.gender || "",
        about: user.about || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // Update profile
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        formData,
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (!user) return null;

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Edit Form */}
        <div className="p-6 rounded-lg shadow-lg bg-base-100">
          <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="input input-bordered w-full"
            />

            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="input input-bordered w-full"
            />

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="input input-bordered w-full"
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>

            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="About you"
              className="textarea textarea-bordered w-full"
            />

            {error && <p className="text-error text-sm">{error}</p>}

            <button className="btn btn-primary w-full">
              Save Changes
            </button>
          </form>
        </div>

        {/* Profile Preview */}
        <div className="p-6 rounded-lg shadow-lg bg-base-100 text-center">
          <img
            src={user.photoUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 className="text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h3>
          {user.about && <p className="text-sm mt-2">{user.about}</p>}

          <div className="text-sm mt-4 space-y-1">
            <p><strong>Email:</strong> {user.emailId}</p>
            {user.gender && <p><strong>Gender:</strong> {user.gender}</p>}
            {user.age && <p><strong>Age:</strong> {user.age}</p>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
