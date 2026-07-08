import React from "react";
import { formatLastSeen } from "../utils/dateFormatter";

const ChatHeader = ({ targetUser, typingStatus }) => {
  if (!targetUser) return null;

  return (
    <div className="border-b border-white/10 bg-white/[0.03] backdrop-blur-xl px-4 md:px-6 py-4 flex items-center gap-4 shrink-0">
      <div className="relative shrink-0">
        <img
          src={targetUser.photoUrl}
          alt={targetUser.firstName}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-white/10"
        />
        {targetUser.isOnline && (
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#0B0E14]" />
        )}
      </div>

      <div className="min-w-0">
        <h2 className="text-base font-semibold text-gray-100 truncate">
          {targetUser.firstName} {targetUser.lastName}
        </h2>
        {typingStatus ? (
          <p className="text-xs text-cyan-400 font-medium animate-pulse">
            typing...
          </p>
        ) : (
          <p className="text-xs">
            {targetUser.isOnline ? (
              <span className="text-emerald-400 font-medium">Active now</span>
            ) : (
              <span className="text-gray-400">{formatLastSeen(targetUser.lastSeen)}</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;