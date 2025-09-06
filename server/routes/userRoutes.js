import express from "express";
import { protectRoute } from "../middleware/auth";

const userRoutes = express.Router();
userRoutes.post("/signup",signup);
userRoutes.post("/login",login);
userRoutes.put("/update-profile",protectRoute,updateProfile);
userRoutes.get("/check",protectRoute,checkAuth);

export default userRoutes;