const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("chat message", (message) => {
    console.log("Received message:", message);
  
    // Broadcast the message to all connected clients
    io.emit("chat message", message);
  });
  
});



const port = 3000; // Choose any port number you prefer
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
