const express = require("express");
const { createServer } = require("node:http");
const path = require("path");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);
  socket.on("user-message", (msg) => {
    io.emit("message", msg);
  });
});
server.listen(4500, () => {
  console.log("server running at http://localhost:4500");
});
