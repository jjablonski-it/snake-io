import { Player } from "../types";
import { snake } from "./snake";

const players: Player[] = [];

export const getPlayers = () => players;

export const getOrAddPlayer = (id: Player["id"]) => {
  const player = players.find((p) => p.id === id);
  if (player) return player;

  const newPlayer: Player = { id, snake: snake() };
  players.push(newPlayer);
  return newPlayer;
};

export const removePlayer = (id: Player["id"]) => {
  const index = players.findIndex((p) => p.id === id);
  players.splice(index, 1);
};
