
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package
const dotenv = require("dotenv");
const socketIo = require("socket.io");
const http = require("http");
const userRoutes = require("./Router/Userrouter");
const postRoutes = require("./Router/Postrouter");
const notificationRoutes = require("./Router/Notificationrouter");
const chatRoutes = require("./Router/Chatrouter");
const ChatController = require('./Controllers/Chatcontroller')
const UserController = require("./Controllers/Usercontroller")
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

mongoose.connect(process.env.mongo_url, {
  
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to Mongo DB");
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected id", socket.id);
  socket.on('join room', (room)=>{
    console.log('room', room);
    ChatController.joinRoom(socket, room)
    
  })
  
  socket.on('chat message', (data)=>{
    console.log('message received ', data);
    ChatController.sendMessage(io, socket, data);
  })
  socket.on('addFriend', (data)=>{
    console.log('friend req',data);
    UserController.newFriendRequest(data)
    
  })
  

  socket.on("disconnect", () => {
    console.log("User disconnected : ", socket.id);
  });
});

app.use("/users", userRoutes);
app.use("/post", postRoutes);
app.use("/notification", notificationRoutes);
app.use("/chat", chatRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});