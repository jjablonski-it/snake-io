import { stat } from "node:fs";
import { Server, Socket } from "socket.io";
import { Direction, Player, State, Vector } from "../types";
import {
  CHUNK_SIZE,
  DELAY,
  WORLD_SIZE,
  WORLD_SIZE_PER_PLAYER,
} from "./constants";
import { addVectors, randomVectorInRange } from "./helpers";
import { getPlayers } from "./players";

const state: State = {
  players: [],
  fruits: [],
  worldSize: WORLD_SIZE,
};

export const initGame = (io: Server) => {
  state.players = getPlayers();
  generateFriuts();

  const main = () => {
    state.players.forEach((p) => {
      p.snake.checkCollision();
      p.snake.forward();
      // getChunks();
      console.log(state.fruits);
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

export const getChunks = (): Vector[] => {
  const chunks = state.worldSize / CHUNK_SIZE;

  return Array.from({ length: chunks }, (_, y) => {
    return Array.from({ length: chunks }, (_, x) => {
      return { x: x * CHUNK_SIZE, y: y * CHUNK_SIZE };
    });
  }).reduce((acc, value) => acc.concat(value), []);
};

export const generateFriuts = () => {
  const chunks = getChunks();

  console.log("chunks", chunks);
  chunks.forEach((chunk) => {
    const fruit = randomVectorInRange({ x: CHUNK_SIZE, y: CHUNK_SIZE });
    state.fruits.push(addVectors(fruit, chunk));
  });
  state.fruits.push({ x: 0, y: 0 });
};

export const removeFruit = (fruit: Vector) => {
  state.fruits = state.fruits.filter((f) => f !== fruit);
};

export const getState = () => state;
