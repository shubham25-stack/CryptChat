import User from "../models/User.js";
import Message from "../models/message.js";
import { io, userSocketMap } from "../server.js";
import cloudinary from "cloudinary";

// ---------------- Get all users except logged-in user ----------------
export const getUserForSidebar = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch users except logged-in one
        const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password");

        // Count unseen messages for each user
        const unseenMessages = {};
        await Promise.all(
            filteredUsers.map(async (user) => {
                const count = await Message.countDocuments({
                    senderId: user._id,
                    receiverId: userId,
                    seen: false,
                });
                if (count > 0) unseenMessages[user._id] = count;
            })
        );

        return res.json({ success: true, users: filteredUsers, unseenMessages });
    } catch (error) {
        console.error("❌ getUserForSidebar error:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ---------------- Get messages of selected user ----------------
export const getMessages = async (req, res) => {
    try {
        const { id: selectedUserId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: selectedUserId },
                { senderId: selectedUserId, receiverId: myId },
            ],
        }).sort({ createdAt: 1 });

        // Mark messages as seen
        await Message.updateMany(
            { senderId: selectedUserId, receiverId: myId, seen: false },
            { $set: { seen: true } }
        );

        return res.json({ success: true, messages });
    } catch (error) {
        console.error("❌ getMessages error:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ---------------- Mark all messages from a sender as seen ----------------
export const markMessagesAsSeen = async (req, res) => {
    try {
        const { id: senderId } = req.params;
        const receiverId = req.user._id;

        await Message.updateMany(
            { senderId, receiverId, seen: false },
            { $set: { seen: true } }
        );

        return res.json({ success: true });
    } catch (error) {
        console.error("❌ markMessagesAsSeen error:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// ---------------- Send a message ----------------
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;

        let imageUrl = null;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                folder: "cryptchat",
            });
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        // Emit the new message to receiver if online
        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.json({ success: true, newMessage });
    } catch (error) {
        console.error("❌ sendMessage error:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
