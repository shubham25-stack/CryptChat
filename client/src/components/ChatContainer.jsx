import React, { useContext, useEffect, useRef, useState } from "react";
import assets from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../contexts/ChatContext";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();
  const [input, setInput] = useState("");

  // ✅ Send text message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  // ✅ Send image message
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select a valid image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  // ✅ Fetch messages when a user is selected
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  // ✅ Auto scroll
  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="h-full overflow-hidden relative backdrop-blur-lg flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between py-3 px-4 border-b border-orange-500/50">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <img
            src={selectedUser.profilePic || assets.avatar_icon}
            alt="Profile"
            className="w-8 rounded-full"
          />
          <p className="text-white flex items-center gap-2">
            {selectedUser.fullname}
            {onlineUsers?.includes(selectedUser._id) && (
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            )}
          </p>
          <img
            onClick={() => setSelectedUser(null)}
            src={assets.arrow_icon}
            alt="Back"
            className="md:hidden w-5 cursor-pointer"
          />
        </div>

        {/* Right Side */}
        <img
          src={assets.help_icon}
          alt="Help"
          className="hidden md:block w-5 cursor-pointer"
        />
      </div>

      {/* Chat Content */}
      <div className="flex-1 overflow-y-scroll p-3 space-y-4">
        {messages.map((msg, index) => {
          const isSender = msg.senderId === authUser?._id;

          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              {/* Receiver Avatar and Time */}
              {!isSender && (
                <div className="flex flex-col items-start text-xs text-gray-400">
                  <img
                    src={selectedUser?.profilePic || assets.avatar_icon}
                    alt="Receiver Avatar"
                    className="w-7 rounded-full mb-1"
                  />
                  <p>{formatMessageTime(msg.createdAt)}</p>
                </div>
              )}

              {/* Message Bubble or Image */}
              {msg.image ? (
                <img
                  src={msg.image}
                  alt="Chat Attachment"
                  className="max-w-[230px] border border-orange-500/40 rounded-lg overflow-hidden mb-8"
                />
              ) : (
                <p
                  className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all text-white ${
                    isSender
                      ? "bg-gradient-to-r from-orange-600 to-orange-500 rounded-br-none"
                      : "bg-white/10 border border-orange-500/40 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </p>
              )}

              {/* Sender Avatar and Time */}
              {isSender && (
                <div className="flex flex-col items-end text-xs text-gray-400">
                  <img
                    src={
                      authUser?.profilePic || assets.avatar_icon
                    }
                    alt="Sender Avatar"
                    className="w-7 rounded-full mb-1"
                  />
                  <p>{formatMessageTime(msg.createdAt)}</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Scroll Anchor */}
        <div ref={scrollEnd} className="h-1"></div>
      </div>

      {/* Bottom Input */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex-1 flex items-center bg-white/10 px-3 rounded-full border border-orange-500/30">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) =>
              e.key === "Enter" ? handleSendMessage(e) : null
            }
            type="text"
            placeholder="Send a Message"
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400"
          />
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            hidden
          />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt="Gallery"
              className="w-5 mr-2 cursor-pointer"
            />
          </label>
        </div>
        <img
          onClick={(e) => handleSendMessage(e)}
          src={assets.send_button}
          alt="Send"
          className="w-7 cursor-pointer bg-gradient-to-r from-orange-600 to-orange-500 rounded-full p-1"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden h-full w-full">
      <img src={assets.logo_icon} alt="Logo" className="w-16" />
      <p className="text-lg font-medium text-orange-400">
        Chat anytime, anywhere
      </p>
    </div>
  );
};

export default ChatContainer;
