import { Server, Socket } from "socket.io";
import { Direction, Player, State, Turn, Vector } from "../types";
import { Chunk } from "./chunk";
import {
  CHUNK_SIZE,
  DELAY,
  LENGTH_PER_FRUIT,
  RENDER_DISTANCE,
  RENDER_DISTANCE_PER_LENGTH,
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
  generateChunks();
  generateFriuts();

  const main = () => {
    state.worldSize = WORLD_SIZE + state.players.length * WORLD_SIZE_PER_PLAYER;

    state.players.forEach((p) => {
      p.snake.checkCollision();
      p.snake.turn();
      p.snake.forward();
    });

    fixChunks();
    state.players.forEach((player) => {
      const { fruits, players } = extractChunkData(getChunksToRender(player));

      player
        .getSocket()
        .emit("update", { fruits, players, worldSize: state.worldSize });
    });
  };

  setInterval(main, DELAY);
};

export const handlePlayerMovement = (
  player: Player,
  socket: Socket,
  _io: Server
) => {
  socket.on("turn", (turn: Turn) => {
    player.snake.setDirection(turn);
  });
};

const generateChunks = () => {
  const chunks = Math.ceil(WORLD_SIZE / CHUNK_SIZE);
  for (let i = 0; i < chunks; i++) {
    for (let j = 0; j < chunks; j++) {
      state.chunks.push(new Chunk({ x: j * CHUNK_SIZE, y: i * CHUNK_SIZE }));
    }
  }
};

const fixChunks = () => {
  const currentChunks = Math.sqrt(state.chunks.length);
  const proper = state.worldSize / CHUNK_SIZE;

  if (proper > currentChunks) {
    for (let i = 0; i < proper; i++) {
      for (let j = 0; j < proper; j++) {
        if (i < currentChunks && j < currentChunks) continue;

        const newChunk = new Chunk({
          x: j * CHUNK_SIZE,
          y: i * CHUNK_SIZE,
        });
        newChunk.generateFruit();
        state.chunks.push(newChunk);
      }
    }
    return;
  } else if (proper < currentChunks) {
    state.chunks = state.chunks.filter(
      (chunk) =>
        chunk.position.x < state.worldSize && chunk.position.y < state.worldSize
    );
  }

  state.chunks = state.chunks.filter(
    (value, i, self) => self.indexOf(value) === i
  );
};

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
  if (points <= 0) return;

  const emptyChunks = state.chunks.filter((chunk) => !chunk.isFruit());

  for (let i = 0; i < points; i++) {
    const randomChunk = spliceRandomElement<Chunk>(emptyChunks);
    if (!randomChunk) return;

    randomChunk.generateFruit();
  }
};

const getPlayerRenderDistance = (player: Player) => {
  return (
    RENDER_DISTANCE + player.snake.getLength() * RENDER_DISTANCE_PER_LENGTH
  );
};

const getChunksToRender = (player: Player): Chunk[] => {
  const renderDistance = getPlayerRenderDistance(player);

  const currentChunk = getChunkForVector(player.snake.head);
  if (!currentChunk) return [];

  const renderChunks = state.chunks.filter(
    (chunk) =>
      Math.abs(chunk.position.x - currentChunk.position.x) <
        renderDistance * CHUNK_SIZE &&
      Math.abs(chunk.position.y - currentChunk.position.y) <
        renderDistance * CHUNK_SIZE
  );

  return renderChunks;
};

const extractChunkData = (chunks: Chunk[]) => {
  const players = chunks.reduce(
    (total: Player[], value) =>
      total.concat(
        value.getPlayers().filter((player) => !total.includes(player))
      ),
    []
  );

  const fruits = chunks
    .filter((chunk) => chunk.isFruit())
    .map((chunk) => chunk.fruit);

  return { players, fruits };
};
