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
}
export interface State {
  players: Player[];
  fruit: Vector;
}
