import express from "express";
import { signup, login, checkAuth, updateProfile } from "../controllers/userController.js"; 
import { protectRoute } from "../middleware/auth.js";

const userRoutes = express.Router();

// Debug/status route for GET /api/auth
userRoutes.get("/", (req, res) => {
	res.json({ success: true, message: "Auth route is live" });
});

// Auth check and update profile routes 
userRoutes.get("/check", protectRoute, checkAuth);
userRoutes.put("/update-profile", protectRoute, updateProfile);

userRoutes.post("/signup", signup);
userRoutes.post("/login", login);

export default userRoutes;

// In your main server file (e.g., server.js or app.js), you would use the userRoutes like this:
// app.use("/api/auth", userRoutes);
