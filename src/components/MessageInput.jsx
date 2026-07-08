import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";

const MessageInput = ({ onSendMessage, onTyping, placeholder }) => {
  const [newMessage, setNewMessage] = useState("");
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const isCurrentlyTypingRef = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, [placeholder]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);

    if (!isCurrentlyTypingRef.current) {
      isCurrentlyTypingRef.current = true;
      onTyping(true);
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      isCurrentlyTypingRef.current = false;
      onTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    const text = newMessage.trim();
    if (!text) return;

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    isCurrentlyTypingRef.current = false;
    onTyping(false);

    onSendMessage(text);
    setNewMessage("");
    inputRef.current?.focus();
  };

  return (
    <div className="border-t border-white/10 bg-white/[0.02] p-3 md:p-4 flex gap-3 shrink-0">
      <input
        ref={inputRef}
        type="text"
        value={newMessage}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 rounded-full bg-white/[0.05] border border-white/10 px-5 py-2.5 text-sm text-gray-100 placeholder:text-gray-600 outline-none transition-all focus:border-indigo-400/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-indigo-500/20"
      />
      <button
        onClick={handleSend}
        disabled={!newMessage.trim()}
        className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shrink-0"
      >
        <FiSend size={16} />
      </button>
    </div>
  );
};

export default MessageInput;