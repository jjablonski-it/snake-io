import express from "express";
import { Server } from "socket.io";
import { PORT } from "./utils/constants";
const socket = require("socket.io");

const app = express();
app.use(express.static("dist/client"));

const server = app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

const io: Server = socket(server);

io.on("connect", (socket) => {
  socket.emit("ping", "PING");

  socket.on("pong", (msg) => console.log(msg));
});
