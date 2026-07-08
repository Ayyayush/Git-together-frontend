import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { FaSearch, FaChevronLeft } from "react-icons/fa";

import { BASE_URL } from "../utils/constants";
import { createSocketConnection } from "../utils/socket";

import ConversationList from "./ConversationList";
import ChatHeader from "./ChatHeader";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import MessageInput from "./MessageInput";

const Message = () => {
  const { targetUserId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [targetUser, setTargetUser] = useState(null);
  const [searchTerms, setSearchTerms] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [isTargetTyping, setIsTargetTyping] = useState(false);

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  const fetchConversations = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/chats/conversations`, {
        withCredentials: true,
      });
      setConversations(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load conversations");
    } finally {
      setLoadingConversations(false);
    }
  };

  const fetchChat = async () => {
    if (!targetUserId) return;
    try {
      setLoadingChat(true);
      const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });
      setTargetUser(res.data.data.targetUser);
      setMessages(res.data.data.chat.messages);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load chat messages");
    } finally {
      setLoadingChat(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [targetUserId]);

  useEffect(() => {
    if (targetUserId) {
      fetchChat();
    } else {
      setTargetUser(null);
      setMessages([]);
    }
    setIsTargetTyping(false);
  }, [targetUserId]);

  useEffect(() => {
    if (!user) return;

    socketRef.current = createSocketConnection();

    socketRef.current.emit("userConnected", { userId: user._id });

    if (targetUserId) {
      socketRef.current.emit("joinChat", {
        userId: user._id,
        targetUserId,
      });
    }

    socketRef.current.on("messageReceived", (message) => {
      setMessages((prev) => [...prev, message]);
      if (socketRef.current) {
        socketRef.current.emit("markAsSeen", { userId: user._id, targetUserId });
      }
      fetchConversations();
    });

    socketRef.current.on("conversationUpdated", () => {
      fetchConversations();
    });

    socketRef.current.on("userTyping", ({ userId, isTyping }) => {
      if (userId === targetUserId) {
        setIsTargetTyping(isTyping);
      }
    });

    socketRef.current.on("messagesSeen", ({ seenBy }) => {
      if (seenBy === targetUserId) {
        setMessages((prev) =>
          prev.map((m) => (m.senderId._id === user._id ? { ...m, status: "seen", seen: true } : m))
        );
      }
    });

    socketRef.current.on("userStatusChanged", ({ userId, isOnline, lastSeen }) => {
      setConversations((prev) =>
        prev.map((c) =>
          c.targetUser?._id === userId
            ? { ...c, targetUser: { ...c.targetUser, isOnline, lastSeen } }
            : c
        )
      );
      setTargetUser((prev) =>
        prev?._id === userId ? { ...prev, isOnline, lastSeen } : prev
      );
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off("messageReceived");
        socketRef.current.off("conversationUpdated");
        socketRef.current.off("userTyping");
        socketRef.current.off("messagesSeen");
        socketRef.current.off("userStatusChanged");
      }
    };
  }, [user, targetUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTargetTyping]);

  const handleSendMessage = (text) => {
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
  };

  const handleTypingStatus = (isTyping) => {
    if (socketRef.current && targetUserId) {
      socketRef.current.emit("typing", {
        userId: user._id,
        targetUserId,
        isTyping,
      });
    }
  };

  const handleConversationSelect = (id) => {
    navigate(`/chat/${id}`);
  };

  if (loadingConversations) {
    return (
      <div className="flex justify-center items-center h-[85vh] bg-[#0B0E14]">
        <span className="h-8 w-8 rounded-full border-2 border-white/10 border-t-indigo-400 animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="flex h-[85vh] bg-[#0B0E14] rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/40">
      
      {/* LEFT SIDEBAR PANEL */}
      <div className={`w-full md:w-80 lg:w-96 border-r border-white/10 flex flex-col shrink-0 bg-white/[0.01] ${
        targetUserId ? "hidden md:flex" : "flex"
      }`}>
        <div className="p-4 border-b border-white/10 bg-white/[0.02]">
          <h1 className="text-lg font-bold text-gray-100 mb-3">Chats</h1>
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={13} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerms}
              onChange={(e) => setSearchTerms(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-xs text-white placeholder-gray-500 outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
        </div>

        <ConversationList
          conversations={conversations}
          activeTargetId={targetUserId}
          onSelect={handleConversationSelect}
          searchTerms={searchTerms}
        />
      </div>

      {/* RIGHT CHAT CONTENT CONTAINER */}
      <div className={`flex-1 flex flex-col min-w-0 bg-[#0B0E14] ${
        !targetUserId ? "hidden md:flex items-center justify-center bg-white/[0.01]" : "flex"
      }`}>
        {targetUserId ? (
          <>
            <div className="md:hidden flex items-center px-2 py-1.5 border-b border-white/10 bg-white/[0.02]">
              <button
                onClick={() => navigate("/chat")}
                className="p-2 text-gray-400 hover:text-white flex items-center gap-1 text-sm font-medium"
              >
                <FaChevronLeft size={14} /> Back
              </button>
            </div>

            <ChatHeader targetUser={targetUser} typingStatus={isTargetTyping} />

            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {loadingChat ? (
                <div className="flex items-center justify-center h-full">
                  <span className="h-6 w-6 rounded-full border-2 border-white/10 border-t-indigo-400 animate-spin"></span>
                </div>
              ) : (
                <>
                  {messages.map((message) => {
                    const isMine = String(message.senderId._id || message.senderId) === String(user._id);
                    return (
                      <ChatBubble
                        key={message._id}
                        message={message}
                        isMine={isMine}
                      />
                    );
                  })}
                  {isTargetTyping && <TypingIndicator targetUser={targetUser} />}
                  <div ref={bottomRef}></div>
                </>
              )}
            </div>

            <MessageInput
              onSendMessage={handleSendMessage}
              onTyping={handleTypingStatus}
              placeholder={`Message ${targetUser?.firstName || ""}...`}
            />
          </>
        ) : (
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto mb-4 text-gray-400">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-200 mb-1">Your Messages</h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              Select an existing connection from the side panel to start talking or search for developers.
            </p>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Message;