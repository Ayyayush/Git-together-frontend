import axios from "axios";
import { useDispatch } from "react-redux";
import { updateFeed } from "../utils/feedSlice";
import { FaCheckCircle, FaHeart, FaTimes } from "react-icons/fa";
import { BASE_URL } from "../utils/constants";

const FeedCard = ({ info }) => {
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(updateFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-[360px] rounded-2xl bg-[#1e293b] shadow-2xl overflow-hidden border border-white/10 hover:scale-[1.02] transition">

      {/* IMAGE SECTION */}
      <div className="h-[320px] bg-black">
        <img
          src={info?.photoUrl || "/avatar.png"}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* INFO SECTION */}
      <div className="p-4 text-white">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            {info?.firstName} {info?.lastName}
          </h2>

          <FaCheckCircle className="text-blue-500 text-sm" />
        </div>

        {info?.age && (
          <p className="text-sm text-gray-400 mt-1">
            {info.age} years old
          </p>
        )}

        <p className="text-sm text-gray-300 mt-3 line-clamp-3">
          {info?.about || "This is a default about of the user!"}
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-between items-center px-6 py-4 bg-[#0f172a]">
        <button
          onClick={() => handleSendRequest("ignored", info?._id)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition"
        >
          <FaTimes />
          Ignore
        </button>

        <button
          onClick={() => handleSendRequest("interested", info?._id)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 text-pink-400 hover:bg-pink-500 hover:text-white transition"
        >
          <FaHeart />
          Interested
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
