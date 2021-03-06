import { Server, Socket } from "socket.io";
import { Player, State, TurnDirection } from "../types";
import { DELAY } from "./constants";
import { randomVectorInBounds } from "./helpers";
import { getPlayers } from "./players";

const state: State = { players: [], fruit: randomVectorInBounds() };

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
  state.fruit = randomVectorInBounds();
};

export const getState = () => state;
