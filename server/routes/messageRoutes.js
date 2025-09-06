import expres from "express";
import { getMessages, getUserForSidebar, sendMessage } from "../controllers/messageController";
import { protectRoute } from "../middleware/auth";

const messageRouter = expres.Router();

messageRouter.get("/users", protectRoute, getUserForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("mark/:id",protectRoute,getMessages);
messageRouter.post("/send/:id", protectRoute,sendMessage)


export default messageRouter;