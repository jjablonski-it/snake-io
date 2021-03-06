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

type Optional<T> = {
  [K in keyof T]?: T[K];
};

export interface Vector {
  x: number;
  y: number;
}

export interface Snake {
  head: Vector;
  segments: Vector[];
  length: number;
  direction: Direction;
  forward: () => void;
  turn: (props: TurnDirection) => void;
  checkCollision: () => boolean;
}

export type OptionalSnake = Optional<Snake>;

export interface Player {
  id: string;
  snake: Snake;
}

export interface State {
  players: Player[];
  fruit: Vector;
}
