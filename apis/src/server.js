const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const redisClient = require("./config/redis");
const app = require("./app");
const connectMongoDB = require("./config/mongodb");

dotenv.config();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

// MongoDB
connectMongoDB()
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Redis
redisClient.on("connect", () => {
  console.log("✅ Redis connected");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

// Socket.IO
// require('./sockets')(io); // We’ll build this later

// Routes
app.get("/", (req, res) => res.send("API is running..."));

// Start Server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
