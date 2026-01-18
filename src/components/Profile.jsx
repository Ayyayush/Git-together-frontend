import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
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
  const [loading, setLoading] = useState(false);

  // ==========================
  // Prefill form from redux
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

  // ==========================
  // Input handler
  // ==========================
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
      setLoading(true);

      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        formData,
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      toast.success("Profile updated successfully");
    } catch (err) {
      const msg = err.response?.data?.message || "Profile update failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  // ==========================
  // Derived UI values
  // ==========================
  const userMeta = [
    formData.age && `${formData.age} yrs`,
    formData.gender && formData.gender,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <div className="flex-1 overflow-y-auto bg-base-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ================= EDIT PROFILE FORM ================= */}
        <div className="bg-base-100 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">
            Edit Profile
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">First Name</span>
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="First name"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Last Name</span>
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Profile Photo URL</span>
              </label>
              <input
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Paste image URL"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Age */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Age</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Age"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Gender</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            {/* About */}
            <div>
              <label className="label">
                <span className="label-text font-medium">About</span>
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                rows={4}
                placeholder="Tell something about yourself"
              />
            </div>

            {error && <p className="text-error text-sm">{error}</p>}

            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
            >
              Save Profile
            </button>
          </form>
        </div>

        {/* ================= LIVE PROFILE PREVIEW ================= */}
        <div className="bg-base-100 rounded-2xl shadow-xl p-8 text-center">

          {/* Avatar */}
          <div className="relative w-40 h-40 mx-auto mb-6">
            <img
              src={
                formData.photoUrl ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="Profile"
              className="
                w-full h-full rounded-full object-cover
                ring-4 ring-primary
                ring-offset-4 ring-offset-base-100
                shadow-[0_0_35px_rgba(59,130,246,0.45)]
              "
            />
          </div>

          {/* Name */}
          <h3 className="text-2xl font-bold tracking-wide">
            {formData.firstName} {formData.lastName}
          </h3>

          {/* Meta */}
          {userMeta && (
            <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest">
              {userMeta}
            </p>
          )}

          {/* About */}
          <p className="text-sm mt-4 text-gray-300 leading-relaxed max-w-sm mx-auto">
            {formData.about ||
              "Passionately curious developer on Gittogether"}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center gap-6">
            <button
              className="
                px-7 py-2 rounded-full
                border border-gray-500
                text-gray-300
                hover:bg-gray-700 hover:text-white
                transition-all duration-300
                tracking-wide
              "
            >
              Ignore
            </button>

            <button
              className="
                px-8 py-2 rounded-full
                bg-gradient-to-r from-blue-500 to-indigo-600
                text-white font-semibold
                shadow-lg shadow-blue-500/40
                hover:scale-105 hover:shadow-indigo-500/60
                transition-all duration-300
                tracking-wide
              "
            >
              Interested
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
