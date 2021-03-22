import express from "express";
import { Server } from "socket.io";
import { PORT } from "./utils/constants";
import { handlePlayerMovement, initGame } from "./utils/game";
import { getOrAddPlayer, removePlayer } from "./utils/players";
const socket = require("socket.io");

const app = express();
app.use(express.static("dist/client"));

const server = app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

const io: Server = socket(server);
io.on("connect", (socket) => {
  const player = getOrAddPlayer(socket);
  console.log(`${player.id} connected`);

  handlePlayerMovement(player, socket, io);

  socket.on("disconnect", () => {
    console.log(`${player.id} disconnected`);
    socket.removeAllListeners();
    removePlayer(player);
  });
});

initGame(io);
