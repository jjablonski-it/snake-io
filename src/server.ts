import express from "express";
import { Server } from "socket.io";
import { NAME_LENGTH, PORT } from "./utils/config";
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

  socket.on("set-name", (name: string) => {
    player.name = name.slice(0, NAME_LENGTH);
  });

  handlePlayerMovement(player, socket, io);

  socket.on("disconnect", () => {
    console.log(`${player.id} disconnected`);
    socket.removeAllListeners();
    removePlayer(player);
  });
});

initGame(io);
