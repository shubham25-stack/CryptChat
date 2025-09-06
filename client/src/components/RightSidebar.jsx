import React, { useEffect, useState, useContext } from "react";
import assets from "../assets/assets";
import { ChatContext } from "../contexts/ChatContext";
import { AuthContext } from "../contexts/AuthContext";

const RightSidebar = ({ selectedUser }) => {
  const { messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  // Get all images from messages of this user
  useEffect(() => {
    if (messages && selectedUser) {
      const images = messages.filter((msg) => msg.image).map((msg) => msg.image);
      setMsgImages(images);
    }
  }, [messages, selectedUser]);

  if (!selectedUser) return null;

  const isOnline = onlineUsers?.includes(selectedUser._id);

  return (
    <div className="bg-[#8185B2]/10 text-white w-full flex flex-col overflow-y-auto">
      {/* Profile Section */}
      <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
        <img
          src={selectedUser?.profilePic || assets.avatar_icon}
          alt="Profile"
          className="w-20 aspect-square rounded-full"
        />
        <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
          {selectedUser?.fullname}
          <span
            className={`w-3 h-3 rounded-full ${
              isOnline ? "bg-green-500 animate-pulse" : "bg-gray-500"
            }`}
          ></span>
        </h1>
        <p className="px-10 mx-auto text-center text-sm opacity-80">
          {selectedUser?.bio || "No bio available"}
        </p>
      </div>

      <hr className="border-[#ffffff50] my-4" />

      {/* Media Section */}
      <div className="px-5 text-xs">
        <p className="font-medium">Media</p>
        <div className="mt-2 max-h-[200px] overflow-y-auto grid grid-cols-2 gap-4 opacity-80">
          {msgImages.length > 0 ? (
            msgImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
                className="cursor-pointer"
              >
                <img
                  src={url}
                  alt={`Shared media ${index + 1}`}
                  className="w-full h-auto rounded-md object-cover"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-400 col-span-2 text-center">
              No media shared yet
            </p>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-auto flex justify-center py-5">
        <button
          onClick={logout}
          className="bg-gradient-to-r from-orange-400 to-red-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;
