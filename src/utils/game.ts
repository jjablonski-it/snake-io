import { chunk } from "lodash";
import { Server, Socket } from "socket.io";
import { Direction, Player, State, Vector } from "../types";
import {
  CHUNK_SIZE,
  DELAY,
  WORLD_SIZE,
  WORLD_SIZE_PER_PLAYER,
} from "./constants";
import { randomVectorInBounds } from "./helpers";
import { getPlayers } from "./players";

const state: State = {
  players: [],
  fruits: [],
  worldSize: 0,
};

export const initGame = (io: Server) => {
  state.players = getPlayers();

  const main = () => {
    state.players.forEach((p) => {
      p.snake.checkCollision();
      p.snake.forward();
      getChunks();
    });

    state.worldSize = WORLD_SIZE + state.players.length * WORLD_SIZE_PER_PLAYER;
    io.emit("update", state);
  };

  setInterval(main, DELAY);
};

export const handlePlayer = (player: Player, socket: Socket, _io: Server) => {
  socket.on("turn", (turn: Direction) => {
    player.snake.turn(turn);
  });
};

export const generateFriuts = () => {};

export const getChunks = (): Vector[] => {
  const chunks = state.worldSize / CHUNK_SIZE;
  return Array.from({ length: chunks }, (_, y) => {
    return Array.from({ length: chunks }, (_, x) => {
      return { x: x * CHUNK_SIZE, y: y * CHUNK_SIZE };
    });
  }).reduce((acc, value) => acc.concat(value), []);
};

export const getState = () => state;
