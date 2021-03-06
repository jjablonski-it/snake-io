import { Server, Socket } from "socket.io";
import { Player, State, TurnDirection } from "../types";
import { DELAY } from "./constants";
import { getRealSize, randomVectorInRange } from "./helpers";
import { getPlayers } from "./players";

const state: State = { players: [], fruit: { x: 0, y: 0 } };

export const initGame = (io: Server) => {
  state.players = getPlayers();

  const main = () => {
    state.players.forEach((p) => {
      p.snake.forward();
    });

    io.emit("update", state);
  };

  setInterval(main, DELAY);
};

export const handlePlayer = (player: Player, socket: Socket, _io: Server) => {
  socket.on("turn", (turn: TurnDirection) => {
    player.snake.turn(turn);
  });
};

export const generateFriut = () => {
  state.fruit = randomVectorInRange(getRealSize());
};

export const getState = () => state;
