// FeedCard.jsx
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateFeed } from "../utils/feedSlice";
import { FaCheckCircle, FaHeart, FaTimes, FaUser, FaCrown, FaCheck } from "react-icons/fa";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";

const FeedCard = ({ info, isRecommendation = false, onActionSuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      if (onActionSuccess) {
        onActionSuccess(info._id);
      } else {
        dispatch(updateFeed(info._id));
      }
    } catch (err) {
      console.error(err);

      const message =
        err?.response?.data?.message || "Something went wrong. Try again.";

      toast.error(message);
    }
  };

  return (
    <div
      className={`w-[360px] max-w-[90vw]
                 rounded-3xl overflow-hidden
                 bg-gradient-to-b from-[#161b27]/95 to-[#0B0E14]/95
                 shadow-[0_25px_70px_rgba(0,0,0,0.65)]
                 backdrop-blur-md
                 transition-all duration-300
                 hover:-translate-y-2
                 ${isRecommendation ? "border-2 border-indigo-500/30 hover:shadow-indigo-500/30" : "border border-white/10 hover:shadow-indigo-500/25"}`}
    >
      <div className="relative h-[320px] flex items-center justify-center">
        {/* Dynamic score ring metric overlay if it is an engine match */}
        {isRecommendation && typeof info.score === "number" && (
          <div className="absolute top-4 right-4 bg-indigo-500/10 border border-indigo-400/30 rounded-full px-2.5 py-1 text-[10px] font-mono font-bold text-indigo-300 tracking-wider z-10 shadow-lg backdrop-blur-sm">
            Match Score: {info.score}
          </div>
        )}

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
          <h2 className="text-xl font-semibold tracking-wide flex items-center gap-1.5 truncate max-w-[260px]">
            {info.firstName} {info.lastName}
          </h2>

          {info.isPremium && (
            <span className="text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded px-1.5 py-0.5 text-[9px] uppercase font-mono font-black tracking-widest flex items-center gap-0.5 shadow-sm">
              <FaCrown size={8} /> Premium
            </span>
          )}

          {info.verified && (
            <FaCheckCircle className="text-cyan-400 text-sm translate-y-[1px]" />
          )}
        </div>

        {info.username && (
          <p className="text-xs text-indigo-400 font-mono mt-0.5">@{info.username}</p>
        )}

        {(info.developerTitle || info.company) && (
          <p className="text-xs text-gray-300 mt-1 font-medium truncate px-2">
            {[info.developerTitle, info.company].filter(Boolean).join(" at ")}
          </p>
        )}

        {info.college && (
          <p className="text-[11px] text-gray-400 font-medium truncate mt-0.5 px-4">
            🎓 {info.college}
          </p>
        )}

        {(info.age || info.gender) && (
          <p className="text-xs text-gray-400 mt-1.5 uppercase tracking-wide">
            {[info.age && `${info.age} yrs`, info.gender]
              .filter(Boolean)
              .join(" • ")}
          </p>
        )}

        {info.skills && Array.isArray(info.skills) && info.skills.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1 mt-3 px-2 max-h-[52px] overflow-hidden">
            {info.skills.slice(0, 4).map((skill, index) => (
              <span key={index} className="text-[10px] font-mono bg-white/5 border border-white/5 text-gray-300 px-2 py-0.5 rounded-md">
                {skill}
              </span>
            ))}
          </div>
        )}

        {info.about && (
          <p className="text-sm text-gray-300 mt-3 leading-relaxed line-clamp-2 px-2">
            {info.about}
          </p>
        )}

        {/* Engine Match Logic Component Checklist Panel */}
        {isRecommendation && Array.isArray(info.reasons) && info.reasons.length > 0 && (
          <div className="mt-4 border border-indigo-500/10 bg-indigo-500/[0.02] rounded-xl px-3 py-2.5 text-left">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400 mb-1.5">Recommended because</p>
            <ul className="flex flex-col gap-1">
              {info.reasons.slice(0, 3).map((reason, idx) => (
                <li key={idx} className="flex items-center gap-1.5 text-xs text-gray-300">
                  <FaCheck className="text-indigo-400 shrink-0 text-[10px]" />
                  <span className="truncate">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* View Profile Platform Button */}
        <button
          onClick={() => navigate(`/profile/${info._id}`)}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-400 border border-indigo-500/30 px-3 py-1.5 rounded-lg bg-indigo-500/5 hover:bg-indigo-500/10 transition-all"
        >
          <FaUser size={10} />
          View Profile
        </button>
      </div>

      <div className="flex justify-between items-center gap-3 px-6 py-4 bg-black/30">
        <button
          onClick={() => handleSendRequest("ignored")}
          className="group relative flex flex-1 items-center justify-center gap-2 py-2
                     rounded-full
                     bg-red-500/[0.08] text-red-400 font-semibold text-sm tracking-wide
                     border border-red-500/25
                     backdrop-blur-sm
                     shadow-[0_1px_2px_rgba(0,0,0,0.25)]
                     transition-all duration-200 ease-out
                     hover:bg-red-500 hover:text-white hover:border-red-500/80
                     hover:shadow-[0_8px_20px_-6px_rgba(239,68,68,0.55)]
                     active:scale-[0.97] active:shadow-[0_2px_8px_-3px_rgba(239,68,68,0.45)]
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0E14]"
        >
          <FaTimes className="text-[12px] transition-transform duration-200 group-active:scale-90" />
          <span>Next Time</span>
        </button>

        <button
          onClick={() => handleSendRequest("interested")}
          className="group relative flex flex-1 items-center justify-center gap-2 py-2
                     rounded-full
                     bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-sm tracking-wide
                     border border-white/10
                     shadow-[0_4px_14px_-3px_rgba(99,102,241,0.5)]
                     transition-all duration-200 ease-out
                     hover:shadow-[0_10px_26px_-5px_rgba(34,211,238,0.6)]
                     hover:brightness-110
                     active:scale-[0.97] active:brightness-95
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0E14]"
        >
          <FaHeart className="text-[12px] transition-transform duration-200 group-hover:scale-110 group-active:scale-90" />
          <span>Collaborate</span>
        </button>
      </div>
    </div>
  );
};

export default FeedCard;