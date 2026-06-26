import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { FiSend } from "react-icons/fi";

import { BASE_URL } from "../utils/constants";
import { createSocketConnection } from "../utils/socket";

const Message = () => {
  const { targetUserId } = useParams();

  const user = useSelector((store) => store.user);

  const [messages, setMessages] = useState([]);
  const [targetUser, setTargetUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const socketRef = useRef(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const fetchChat = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}/chat/${targetUserId}`,
        {
          withCredentials: true,
        }
      );

      setTargetUser(res.data.data.targetUser);
      setMessages(res.data.data.chat.messages);

    } catch (err) {
      console.log(err);
      toast.error("Unable to load chat");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChat();
  }, [targetUserId]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!user) return;

    socketRef.current = createSocketConnection();

    socketRef.current.emit("joinChat", {
      firstName: user.firstName,
      userId: user._id,
      targetUserId,
    });

    socketRef.current.on("messageReceived", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current.off("messageReceived");
    };
  }, [user, targetUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = () => {
    const text = newMessage.trim();

    if (!text) return;

    if (!socketRef.current?.connected) {
      toast.error("Socket not connected");
      return;
    }

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId: user._id,
      targetUserId,
      text,
    });

    setNewMessage("");
    inputRef.current?.focus();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[85vh] bg-[#0B0E14]">
        <span className="h-8 w-8 rounded-full border-2 border-white/10 border-t-indigo-400 animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[85vh] bg-[#0B0E14] rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/40">

      {/* Header */}

      <div className="border-b border-white/10 bg-white/[0.03] backdrop-blur-xl px-4 md:px-6 py-4 flex items-center gap-4 shrink-0">

        <div className="relative shrink-0">
          <img
            src={targetUser?.photoUrl}
            alt={targetUser?.firstName}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-white/10"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#0B0E14]" />
        </div>

        <div className="min-w-0">

          <h2 className="text-base font-semibold text-gray-100 truncate">

            {targetUser?.firstName} {targetUser?.lastName}

          </h2>

          <p className="text-xs text-emerald-400">

            Active now

          </p>

        </div>

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">

        {messages.length === 0 && (

          <div className="flex items-center justify-center h-full">

            <p className="text-gray-500 text-center text-sm">

              Start your conversation with{" "}
              <span className="font-semibold text-gray-300">
                {targetUser?.firstName}
              </span>{" "}
              👋

            </p>

          </div>

        )}

        {messages.map((message) => {

          const isMine =
            String(message.senderId._id) ===
            String(user._id);

          return (

            <div
              key={message._id}
              className={`flex ${
                isMine
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[75%] md:max-w-[60%] px-4 py-2.5 rounded-2xl break-words shadow-md ${
                  isMine
                    ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-br-md shadow-indigo-500/20"
                    : "bg-white/[0.06] border border-white/10 text-gray-100 rounded-bl-md"
                }`}
              >

                {!isMine && (

                  <p className="text-xs font-semibold mb-1 text-cyan-300">

                    {message.senderId.firstName}

                  </p>

                )}

                <p className="text-sm leading-relaxed">{message.text}</p>

                <p className={`text-[10px] mt-1.5 text-right ${isMine ? "text-white/70" : "text-gray-500"}`}>

                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}

                </p>

              </div>

            </div>

          );

        })}

        <div ref={bottomRef}></div>

      </div>

      {/* Input */}

      <div className="border-t border-white/10 bg-white/[0.02] p-3 md:p-4 flex gap-3 shrink-0">

        <input
          ref={inputRef}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {

            if (e.key === "Enter" && !e.shiftKey) {

              e.preventDefault();
              sendMessage();

            }

          }}
          placeholder={`Message ${targetUser?.firstName}...`}
          className="flex-1 rounded-full bg-white/[0.05] border border-white/10 px-5 py-2.5 text-sm text-gray-100 placeholder:text-gray-600 outline-none transition-all focus:border-indigo-400/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-indigo-500/20"
        />

        <button
          onClick={sendMessage}
          disabled={!newMessage.trim()}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shrink-0"
        >
          <FiSend size={16} />
        </button>

      </div>

    </div>
  );
};

export default Message;