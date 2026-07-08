import React from "react";
import { formatTimeOrDate } from "../utils/dateFormatter";
import { FaCheck, FaCheckDouble } from "react-icons/fa";

const ConversationList = ({ conversations, activeTargetId, onSelect, searchTerms }) => {
  const filtered = conversations.filter((c) => {
    const query = searchTerms.toLowerCase();
    const first = (c.targetUser?.firstName || "").toLowerCase();
    const last = (c.targetUser?.lastName || "").toLowerCase();
    const email = (c.targetUser?.emailId || "").toLowerCase();
    return first.includes(query) || last.includes(query) || email.includes(query);
  });

  const renderStatusIcon = (status) => {
    if (status === "sent") return <FaCheck className="text-gray-500 text-xs" />;
    if (status === "delivered") return <FaCheckDouble className="text-gray-500 text-xs" />;
    if (status === "seen") return <FaCheckDouble className="text-cyan-400 text-xs" />;
    return null;
  };

  return (
    <div className="flex-1 overflow-y-auto divide-y divide-white/5">
      {filtered.length === 0 ? (
        <div className="p-6 text-center text-sm text-gray-500">
          No conversations found
        </div>
      ) : (
        filtered.map((convo) => {
          const isSelected = convo.targetUser?._id === activeTargetId;
          const userInitials = convo.targetUser?.firstName?.charAt(0) || "?";
          
          return (
            <div
              key={convo.chatId}
              onClick={() => onSelect(convo.targetUser?._id)}
              className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-colors ${
                isSelected 
                  ? "bg-white/[0.06] border-l-4 border-indigo-500" 
                  : "hover:bg-white/[0.02]"
              }`}
            >
              <div className="relative shrink-0">
                {convo.targetUser?.photoUrl ? (
                  <img
                    src={convo.targetUser.photoUrl}
                    alt={convo.targetUser.firstName}
                    className="w-11 h-11 rounded-full object-cover ring-1 ring-white/10"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                    {userInitials}
                  </div>
                )}
                {convo.targetUser?.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#0B0E14]" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="text-sm font-semibold text-gray-200 truncate">
                    {convo.targetUser?.firstName} {convo.targetUser?.lastName}
                  </h3>
                  {convo.lastMessage && (
                    <span className="text-[11px] text-gray-500 whitespace-nowrap ml-2">
                      {formatTimeOrDate(convo.lastMessage.createdAt)}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {convo.lastMessage && convo.lastMessage.senderId?._id === convo.targetUser?._id ? null : (
                      convo.lastMessage && renderStatusIcon(convo.lastMessage.status)
                    )}
                    <p className={`text-xs truncate ${convo.unreadCount > 0 ? "text-white font-medium" : "text-gray-400"}`}>
                      {convo.lastMessage ? convo.lastMessage.text : "Start a new conversation"}
                    </p>
                  </div>

                  {convo.unreadCount > 0 && (
                    <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shrink-0">
                      {convo.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ConversationList;