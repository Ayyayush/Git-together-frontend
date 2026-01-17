import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";                // ✅ ADDED
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    photoUrl: "",
    age: "",
    gender: "",
    about: "",
  });

  const [error, setError] = useState("");

  // ==========================
  // Prefill from redux
  // ==========================
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        photoUrl: user.photoUrl || "",
        age: user.age || "",
        gender: user.gender || "",
        about: user.about || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ==========================
  // Save profile
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
      toast.success("Profile updated successfully");     // ✅ ADDED
    } catch (err) {
      const msg = err.response?.data?.message || "Update failed";
      setError(msg);
      toast.error(msg);                                  // ✅ ADDED
    }
  };

  if (!user) return null;

  // ==========================
  // Derived UI values
  // ==========================
  const userMeta = [
    formData.age && `${formData.age} yrs`,
    formData.gender && formData.gender.toLowerCase(),
  ]
    .filter(Boolean)
    .join(", ");

  const fullDescription =
    formData.about ||
    `${formData.firstName} ${formData.lastName} is a developer on Gittogether.`;

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ================= EDIT FORM ================= */}
        <div className="p-6 rounded-lg shadow-lg bg-base-100">
          <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="input input-bordered w-full"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="input input-bordered w-full"
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Profile Photo URL
              </label>
              <input
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                placeholder="Paste image URL"
                className="input input-bordered w-full"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                className="input input-bordered w-full"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Gender
              </label>
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
            </div>

            {/* About */}
            <div>
              <label className="block text-sm font-medium mb-1">
                About
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="Write something about yourself"
                className="textarea textarea-bordered w-full"
              />
            </div>

            {error && (
              <p className="text-error text-sm">{error}</p>
            )}

            <button className="btn btn-primary w-full">
              Save Profile
            </button>
          </form>
        </div>

        {/* ================= LIVE PREVIEW ================= */}
        <div className="p-6 rounded-lg shadow-lg bg-base-100 text-center">
          <img
            src={
              formData.photoUrl ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt="Profile"
            className="w-32 h-32 rounded-xl mx-auto mb-4 object-cover"
          />

          <h3 className="text-xl font-semibold">
            {formData.firstName} {formData.lastName}
          </h3>

          {userMeta && (
            <p className="text-sm text-gray-500 mt-1">
              {userMeta}
            </p>
          )}

          <p className="text-sm mt-3 text-gray-600">
            {fullDescription}
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <button className="btn btn-outline btn-sm">Ignore</button>
            <button className="btn btn-primary btn-sm">Interested</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
