import { Server, Socket } from "socket.io";
import { Direction, Player, State, Vector } from "../types";
import { Chunk } from "./chunk";
import {
  CHUNK_SIZE,
  DELAY,
  LENGTH_PER_FRUIT,
  TAIL_LENGTH,
  WORLD_SIZE,
  WORLD_SIZE_PER_PLAYER,
} from "./constants";
import { spliceRandomElement } from "./helpers";
import { getPlayers } from "./players";
import { Snake } from "./snake";

const state: State = {
  players: [],
  chunks: [],
  worldSize: WORLD_SIZE,
};

export const initGame = (io: Server) => {
  state.players = getPlayers();
  state.chunks = generateChunks();
  generateFriuts();

  const main = () => {
    state.players.forEach((p) => {
      p.snake.checkCollision();
      p.snake.forward();
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

const generateChunks = (): Chunk[] => {
  const result: Chunk[] = [];

  const chunks = Math.ceil(WORLD_SIZE / CHUNK_SIZE);
  for (let i = 0; i < chunks; i++) {
    for (let j = 0; j < chunks; j++) {
      result.push(new Chunk({ x: j * CHUNK_SIZE, y: i * CHUNK_SIZE }));
    }
  }
  return result;
};

// export const getFruits = (): Vector[] => {
//   return state.chunks
//     .filter((chunk) => chunk.isFruit())
//     .map((chunk) => chunk.getFruitPoisition()!);
// };

export const generateFriuts = () => {
  state.chunks.forEach((chunk) => !chunk.isFruit() && chunk.generateFruit());
};

export const removeFruit = (chunk: Chunk) => {
  chunk.removeFruit();
};

export const getState = () => state;

export const getChunkForVector = ({ x, y }: Vector): Chunk | undefined => {
  return state.chunks.find((chunk) => {
    const bounds = chunk.getBounds();
    if (
      x >= bounds.minX &&
      x < bounds.maxX &&
      y >= bounds.minY &&
      y < bounds.maxY
    ) {
      return true;
    }
  });
};

export const returnPoints = (snake: Snake) => {
  const points = (snake.getLength() - TAIL_LENGTH) / LENGTH_PER_FRUIT;
  console.log("points to return", points);

  if (points <= 0) return;

  const emptyChunks = state.chunks.filter((chunk) => !chunk.isFruit());

  for (let i = 0; i < points; i++) {
    const randomChunk = spliceRandomElement<Chunk>(emptyChunks);
    if (!randomChunk) throw "Returning too much points";

    randomChunk.generateFruit();
  }
};
