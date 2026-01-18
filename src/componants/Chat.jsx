import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { Base_URL } from "../utils/constants";
import toast from "react-hot-toast";

const Chat = () => {
 
  const navigate = useNavigate();

  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const [chatUser, setChatUser] = useState(null);
  const socketRef = useRef(null);


  const fetchMessages = async () => {
    try {
      const {data} = await axios.get(Base_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      
      if(!data.success){
        toast.error(data.message);
        navigate("/connections")
      }

      const chatMessages = (data.chat?.messages || []).map((msg) => {
        const { senderId, text } = msg;

        // setting header user (only once)
        if (!chatUser && senderId?._id !== userId) {
          setChatUser({ firstName: senderId.firstName, lastName: senderId.lastName, });
        }
        return {
          senderId: senderId._id,
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
        };
      });

      setMessages(chatMessages);
      toast.success(data.message);

    }catch (error) {
       toast.error(error.message)
       navigate("/connections")
    }
  };


  const sendMessage = () => {
    const message = newMessage.trim();
    if (!message || !socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: message,
    });
  
    setNewMessage("");
  };
  
  
  useEffect(() => {
    if (!userId) return;
  
    socketRef.current = createSocketConnection();
  
    socketRef.current.emit("joinChat", {
      userId,
      targetUserId,
    });
  
    socketRef.current.on("messageReceived", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  
    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);


  useEffect(() => {
    fetchMessages();
  },[targetUserId]); // reload chat when switching users

  // ⭐ REF for auto-scroll
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ⭐ Auto-scroll when messages change
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  return (
     <div className="pt-24 flex justify-center">
       <div className="w-[50vw] h-[75vh] bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl flex flex-col overflow-hidden">
      
         {/* HEADER */}
         <div className="px-6 py-4 border-b bg-white/70 flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
            {chatUser?.firstName?.[0]}
           </div>
           <div>
             <h1 className="text-lg font-semibold text-gray-800">
               {chatUser ? `${chatUser.firstName} ${chatUser.lastName}` : "Chat"}
             </h1>
           </div>
         </div>

         {/* MESSAGES AREA (empty for now) */}
         <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
           {messages.length === 0 && (
              <div className="h-full flex items-center justify-center">
                 <p className="text-gray-400 text-sm"> No messages yet. Say hello 👋</p>
              </div>
           )}        
           {messages.map((msg, index) => {
             const isMe = msg.senderId === userId;

             return (
               <div key={index} className={`flex ${isMe ? "justify-end" : "justify-start"}`} >
                 <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow ${ isMe ? "bg-blue-600 text-white rounded-br-none" : "bg-emerald-500 text-white rounded-bl-none" }`}>
                   {msg.text}
                 </div>
               </div>
             );
           })}

           {/* auto scroll anchor */}
           <div ref={messagesEndRef} />
         </div>


         {/* INPUT BAR (empty for now) */}
         <div className="flex items-center gap-3 px-4 py-3 border-t bg-white/90">
           <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); sendMessage(); } }}
            placeholder="Type a message..." className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
           />

           <button onClick={sendMessage} className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
             Send
           </button>
         </div>

       </div>
     </div>
   );

};

export default Chat;
