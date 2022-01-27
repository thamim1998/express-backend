const express = require("express");
const app = express();
const dotenv = require("dotenv").config({ path: "./routes/.env" });
const mongoose = require("mongoose");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require("cors");

//connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("connected to DB")
);

//middleware
app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("disconnected", (socket) => {
    console.log("User disconnected", socket.id);
  });
});

//import Routes
const authRoute = require("./routes/auth");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");
const postRoute = require("./routes/post");

//route middleware routes
app.use("/api/user", authRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);
app.use("/api/post", postRoute);

server.listen(5000, () => console.log("listening on port"));
