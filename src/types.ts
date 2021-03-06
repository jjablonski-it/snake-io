import { Snake } from "./utils/snake";

export enum Direction {
  Up = 1,
  Right,
  Down,
  Left,
}

export enum TurnDirection {
  Left,
  Right,
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
