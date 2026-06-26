import axios from "axios";
import { useDispatch } from "react-redux";
import { updateFeed } from "../utils/feedSlice";
import { FaCheckCircle, FaHeart, FaTimes } from "react-icons/fa";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";

const FeedCard = ({ info }) => {
  const dispatch = useDispatch();

  if (!info) {
    return null;
  }

  const handleSendRequest = async (status) => {
    if (!info?._id) {
      console.error("User ID is missing:", info);
      toast.error("Invalid user data.");
      return;
    }

    try {
      console.log("Sending Request");
      console.log("Status:", status);
      console.log("User ID:", info._id);

      await axios.post(
        `${BASE_URL}/request/send/${status}/${info._id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(
        status === "interested"
          ? "Connection Request Sent! 🚀"
          : "User Ignored"
      );

      dispatch(updateFeed(info._id));
    } catch (err) {
      console.error(err);

      const message =
        err?.response?.data?.message || "Something went wrong. Try again.";

      toast.error(message);
    }
  };

  return (
    <div
      className="w-[360px] max-w-[90vw]
                 rounded-3xl overflow-hidden
                 bg-gradient-to-b from-[#161b27]/95 to-[#0B0E14]/95
                 border border-white/10
                 shadow-[0_25px_70px_rgba(0,0,0,0.65)]
                 backdrop-blur-md
                 transition-all duration-300
                 hover:-translate-y-2 hover:shadow-indigo-500/25"
    >
      <div className="relative h-[320px] flex items-center justify-center">
        <div className="absolute w-56 h-56 rounded-full bg-gradient-to-br from-indigo-500/30 via-violet-500/20 to-cyan-400/20 blur-2xl" />

        <div className="relative w-52 h-52 rounded-full overflow-hidden ring-4 ring-indigo-500/30 bg-gray-200 shadow-inner">
          <img
            src={info.photoUrl || "/avatar.png"}
            alt={`${info.firstName} ${info.lastName || ""}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="px-6 pb-5 text-white text-center">
        <div className="flex items-center justify-center gap-2 mt-2">
          <h2 className="text-xl font-semibold tracking-wide">
            {info.firstName} {info.lastName}
          </h2>

          {info.verified && (
            <FaCheckCircle className="text-cyan-400 text-sm translate-y-[1px]" />
          )}
        </div>

        {(info.age || info.gender) && (
          <p className="text-sm text-gray-400 mt-1 uppercase tracking-wide">
            {[info.age && `${info.age} yrs`, info.gender]
              .filter(Boolean)
              .join(" • ")}
          </p>
        )}

        <p className="text-sm text-gray-300 mt-3 leading-relaxed line-clamp-2 px-2">
          {info.about || "No bio yet."}
        </p>
      </div>

      <div className="flex justify-between items-center gap-3 px-6 py-4 bg-black/30">
        <button
          onClick={() => handleSendRequest("ignored")}
          className="flex flex-1 items-center justify-center gap-2 py-2 rounded-full
                     bg-red-500/10 text-red-400
                     border border-red-500/20
                     hover:bg-red-500 hover:text-white
                     hover:shadow-lg hover:shadow-red-500/40
                     transition-all"
        >
          <FaTimes />
          Ignore
        </button>

        <button
          onClick={() => handleSendRequest("interested")}
          className="flex flex-1 items-center justify-center gap-2 py-2 rounded-full
                     bg-gradient-to-r from-indigo-500 to-cyan-500 text-white
                     shadow-md shadow-indigo-500/30
                     hover:scale-[1.03] hover:shadow-lg hover:shadow-cyan-500/40
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