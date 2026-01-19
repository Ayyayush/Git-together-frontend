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
    <div
      className="w-[360px] rounded-3xl overflow-hidden
                 bg-gradient-to-b from-[#1e293b]/95 to-[#0f172a]/95
                 border border-white/10
                 shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                 backdrop-blur-md
                 transition-all duration-300
                 hover:-translate-y-2 hover:shadow-blue-500/20"
    >
      {/* ================= IMAGE ================= */}
      <div className="relative h-[300px] flex items-center justify-center bg-black/20">
        <div className="w-44 h-44 rounded-full overflow-hidden
                        ring-4 ring-blue-500/20
                        shadow-inner bg-gray-200">
          <img
            src={info?.photoUrl || "/avatar.png"}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ================= INFO ================= */}
      <div className="px-6 pt-4 pb-5 text-white">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold tracking-wide">
            {info?.firstName} {info?.lastName}
          </h2>
          <FaCheckCircle className="text-blue-400 text-sm" />
        </div>

        {info?.age && (
          <p className="text-sm text-gray-400 mt-1">
            {info.age} years old
          </p>
        )}

        <p className="text-sm text-gray-300 mt-3 leading-relaxed line-clamp-3">
          {info?.about || "This is a default bio. Let’s connect and build something awesome."}
        </p>
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="flex justify-between items-center px-6 py-4 bg-black/30">

        {/* IGNORE */}
        <button
          onClick={() => handleSendRequest("ignored", info?._id)}
          className="flex items-center gap-2 px-5 py-2 rounded-full
                     bg-red-500/10 text-red-400
                     border border-red-500/20
                     hover:bg-red-500 hover:text-white
                     hover:shadow-red-500/40
                     transition-all"
        >
          <FaTimes />
          Ignore
        </button>

        {/* INTERESTED */}
        <button
          onClick={() => handleSendRequest("interested", info?._id)}
          className="flex items-center gap-2 px-5 py-2 rounded-full
                     bg-pink-500/10 text-pink-400
                     border border-pink-500/20
                     hover:bg-pink-500 hover:text-white
                     hover:shadow-pink-500/40
                     transition-all"
        >
          <FaHeart />
          Interested
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
