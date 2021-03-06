import { Server, Socket } from "socket.io";
import { Player, State, TurnDirection } from "../types";
import { DELAY } from "./constants";
import { getPlayers } from "./players";

const state: State = { players: [], fruit: { x: 0, y: 0 } };

export const initGame = (io: Server) => {
  state.players = getPlayers();

  const main = () => {
    io.emit("update", state);
  };

  setInterval(main, DELAY);
};

export const handlePlayer = (player: Player, socket: Socket, _io: Server) => {
  socket.on("turn", (turn: TurnDirection) => {
    player.snake.turn(turn);
  });
};
