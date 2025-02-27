import { Socket } from "socket.io";
import { Player } from "../types";
import { returnPoints } from "./game";
import { Snake } from "./snake";

const players: Player[] = [];

export const getPlayers = () => players;

export const getOrAddPlayer = (socket: Socket) => {
  const player = players.find((p) => p.id === socket.id);
  if (player) return player;

  const newPlayer: Player = {
    name: "",
    id: socket.id,
    snake: new Snake(),
    getSocket() {
      return socket;
    },
  };
  players.push(newPlayer);
  return newPlayer;
};

export const removePlayer = (player: Player) => {
  returnPoints(player.snake);
  const index = players.findIndex((p) => p === player);
  players.splice(index, 1);
};
