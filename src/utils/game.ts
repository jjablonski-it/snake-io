import { Server, Socket } from "socket.io";
import { Direction, Player, State } from "../types";
import { DELAY, WORLD_SIZE, WORLD_SIZE_PER_PLAYER } from "./constants";
import { randomVectorInBounds } from "./helpers";
import { getPlayers } from "./players";

const state: State = {
  players: [],
  fruit: randomVectorInBounds(),
  worldSize: WORLD_SIZE,
};

export const initGame = (io: Server) => {
  state.players = getPlayers();

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

export const generateFriut = () => {
  state.fruit = randomVectorInBounds();
};

export const getState = () => state;
