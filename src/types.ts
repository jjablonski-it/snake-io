import { Socket } from "socket.io";
import { Chunk } from "./utils/chunk";
import { Snake } from "./utils/snake";

export enum Direction {
  Up = "ArrowUp",
  Right = "ArrowRight",
  Down = "ArrowDown",
  Left = "ArrowLeft",
}
export interface Vector {
  x: number;
  y: number;
}
export interface Player {
  id: string;
  snake: Snake;
  getSocket: () => Socket;
}
export interface State {
  players: Player[];
  chunks: Chunk[];
  worldSize: number;
}
