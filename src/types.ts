import { Socket } from "socket.io";
import { Chunk } from "./utils/chunk";
import { Snake } from "./utils/snake";

export enum Turn {
  LEFT = -1,
  RIGHT = 1,
}

export enum Direction {
  Up = 0,
  Right = 1,
  Down,
  Left,
}

// export enum Direction {
//   Up = "ArrowUp",
//   Right = "ArrowRight",
//   Down = "ArrowDown",
//   Left = "ArrowLeft",
// }
export interface Vector {
  x: number;
  y: number;
}
export interface Player {
  id: string;
  snake: Snake;
  name: string;
  getSocket: () => Socket;
}
export interface State {
  players: Player[];
  chunks: Chunk[];
  worldSize: number;
}
export interface StateDTO {
  fruits: Vector[];
  players: Player[];
  me: Player;
  worldSize: number;
}
