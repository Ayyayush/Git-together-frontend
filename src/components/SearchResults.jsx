import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { DEFAULT_IMG } from "../utils/constants";

const SearchResults = ({ results, loading, search, onSelect, onClose }) => {
  const navigate = useNavigate();

  const handleUserClick = (userId) => {
    onSelect(userId);
    if (onClose) onClose();
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="absolute left-0 right-0 mt-2 max-h-[400px] overflow-y-auto rounded-2xl border border-white/10 bg-[#0B0E14]/90 backdrop-blur-2xl shadow-2xl z-[1000] scrollbar-thin scrollbar-thumb-white/15">
      <div className="p-2">
        {loading ? (
          // Glassmorphism Loading Skeleton
          <div className="space-y-2 p-1">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-3 p-2.5 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-white/10" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-white/15 rounded w-1/3" />
                  <div className="h-3 bg-white/10 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : results.length === 0 ? (
          // Empty State Design
          <div className="p-4 text-center text-sm text-gray-400 font-medium">
            No developers found
          </div>
        ) : (
          // Content Data List
          <div className="space-y-1">
            {results.map((dev) => (
              <div
                key={dev._id}
                onClick={() => handleUserClick(dev._id)}
                className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-white/[0.06] active:scale-[0.99] transition-all duration-150 group"
              >
                {/* Profile Image container */}
                <div className="relative shrink-0">
                  <img
                    src={dev.photoUrl || dev.photo || DEFAULT_IMG}
                    alt={dev.username}
                    className={`w-10 h-10 rounded-full object-cover border ${
                      dev.isPremium ? "border-yellow-500 ring-1 ring-yellow-500/20" : "border-white/10"
                    }`}
                  />
                  {dev.isPremium && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-yellow-500 text-black flex items-center justify-center shadow-md">
                      <FaCrown size={8} />
                    </span>
                  )}
                </div>

                {/* Text Metadata Stack */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">
                      {dev.firstName ? `${dev.firstName} ${dev.lastName || ""}` : dev.username}
                    </p>
                    {dev.isPremium && (
                      <span className="text-[10px] uppercase tracking-wider bg-yellow-500/10 text-yellow-400 px-1.5 py-0.2 rounded font-bold border border-yellow-500/20">
                        PRO
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 truncate">@{dev.username}</p>
                  {(dev.developerTitle || dev.company) && (
                    <p className="text-[11px] text-gray-500 truncate mt-0.5">
                      {dev.developerTitle || "Developer"}{dev.company ? ` at ${dev.company}` : ""}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;