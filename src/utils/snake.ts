import { Direction, OptionalSnake, Snake } from "../types";

export const snake = ({
  head = { x: 0, y: 0 },
  segments = [],
  direction = Direction.Up,
  length = 0,
}: OptionalSnake = {}): Snake => {
  return {
    head,
    segments,
    direction,
    length,
  };
};
