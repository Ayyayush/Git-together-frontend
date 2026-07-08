import React from "react";
import { formatTime } from "../utils/dateFormatter";
import { FaCheck, FaCheckDouble } from "react-icons/fa";

const ChatBubble = ({ message, isMine }) => {
  const renderStatus = () => {
    if (!isMine) return null;
    if (message.status === "sent") return <FaCheck className="text-white/40 text-[10px]" />;
    if (message.status === "delivered") return <FaCheckDouble className="text-white/40 text-[10px]" />;
    if (message.status === "seen") return <FaCheckDouble className="text-cyan-300 text-[10px]" />;
    return null;
  };

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[75%] md:max-w-[60%] px-4 py-2.5 rounded-2xl break-words shadow-md relative group ${
          isMine
            ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-br-md shadow-indigo-500/10"
            : "bg-white/[0.06] border border-white/10 text-gray-100 rounded-bl-md"
        }`}
      >
        {!isMine && (
          <p className="text-[11px] font-semibold mb-0.5 text-cyan-300">
            {message.senderId?.firstName}
          </p>
        )}
        <p className="text-sm leading-relaxed pr-2">{message.text}</p>
        
        <div className="flex items-center justify-end gap-1 mt-1.5 -mb-0.5 ml-auto">
          <span className={`text-[9px] ${isMine ? "text-white/70" : "text-gray-500"}`}>
            {formatTime(message.createdAt)}
          </span>
          {renderStatus()}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;