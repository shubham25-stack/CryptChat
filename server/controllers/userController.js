import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudnary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";

// signup new user
export const signup = async (req, res) => {
    const { email, fullname, password, bio } = req.body;

    try {
        if (!fullname || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }   

        const user = await User.findOne({ email });
        if (user) {
            return res.json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
            bio
        });

        await newUser.save();

        const token = generateToken(newUser._id);
        res.json({
            success: true, 
            userData: newUser, 
            token, 
            message: "Account created successfully" 
        }); 
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// controller to login user
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }   

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const token = generateToken(user._id);
        res.json({ 
            success: true, 
            userData: user, 
            token, 
            message: "Login successful" 
        }); 
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// controller to check if user is authenticated
export const checkAuth = async (req, res) => {
    res.json({ success: true, user: req.user });
};

// controller to update user profile
export const updateProfile = async (req, res) => {
    try {
        const { fullname, bio, profilePic } = req.body;
        if (!fullname) {
            return res.json({ success: false, message: "Fullname is required" });
        }

        const userId = req.user._id;
        let updatedUser;

        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(
                userId, 
                { fullname, bio }, 
                { new: true }
            ).select("-password");
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(
                userId, 
                { fullname, bio, profilePic: upload.secure_url }, 
                { new: true }
            ).select("-password");
        }

        res.json({ success: true, user: updatedUser, message: "Profile updated successfully" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
