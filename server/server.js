import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';
import userRoutes from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { Server } from 'socket.io';
import { disconnect } from 'process';

//create expresss app and http server
const app = express();
const server = http.createServer(app);

//initialise socket.io server
export const io = new Server(server,{
  cors: {origin: "*"}
})

//store online users
export const userSocketMap = {}; //{ userId: socketId}

//socket connection handler
io.on("connection", (socket)=>{
  const userId = socket.handshake.query.userId;
  console.log("User Connected", userId);

  if(userId) userSocketMap[userId] = socket.id;
  //emit online users to connect
  io.emit("getOnlineUsesrs",Object.keys(userSocketMap));

  socket.on("disconnect", ()=>{
    console.log("User Discounted", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
  })
})

//middlewares
app.use(express.json({limit: "4mb"}));
app.use(cors());

//routes
app.use("/api/status", (req, res) => {
  res.send("Server is running...");
});
app.use("/api/auth", userRoutes)
app.use("/api/messages", messageRouter);


//database connection
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server running on port "+ PORT));
