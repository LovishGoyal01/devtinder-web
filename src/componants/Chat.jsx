import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { Base_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  // ⭐ REF for auto-scroll
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const chat = await axios.get(Base_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      console.log(chat);

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
        };
      });

      setMessages(chatMessages);
    } catch (err) {
      if (err.response?.status === 403) {
        alert("You are not friends, cannot chat!");
        return;
      }

      console.log("Error loading chat:", err.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [targetUserId]); // reload chat when switching users

  useEffect(() => {
    if (!userId) {
      return;
    }

    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  // ⭐ Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="bg-gradient-to-t from-rose-500 to-blue-400 min-h-screen text-white pt-20">
      <div className="w-3/5 mt-6 h-[70vh] mx-auto border border-white/30 bg-[#F9FAFB]/70 backdrop-blur-md flex flex-col shadow-sm">
        <h1 className="p-3 border-b text-black font-bold text-xl border-gray-400">Chat</h1>

        <div className="flex-1 overflow-y-scroll p-5">
          {messages.map((msg, index) => {
            return (
              <div
                key={index}
                className={ "chat " + (user.firstName === msg.firstName ? "chat-end" : "chat-start") }
              >
                <div className="chat-header text-gray-700 font-semibold">
                  {msg.firstName + " " + msg.lastName}
                  {/* <time className="text-xs opacity-50">2 hours ago</time> */}
                </div>
                
                <div className={"chat-bubble max-w-1/2 " + (user.firstName === msg.firstName ? "bg-blue-500/90 text-white" : "bg-emerald-400/90 text-white") }>{msg.text}</div>
                {/* <div className="chat-footer opacity-50">Seen</div> */}
              </div>
            );
          })}

          {/* ⭐ Auto-scroll anchor element */}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="flex p-3 border-t border-gray-400 gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); sendMessage(); }   }}
            className="flex-1 p-2 border border-white/40 backdrop-blur-sm text-black rounded"
          />
          <button onClick={sendMessage} className="btn btn-primary">
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
