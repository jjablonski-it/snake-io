import { Direction, OptionalSnake, Snake } from "../types";

export const snake = ({
  head = { x: 0, y: 0 },
  segments = [],
  direction = Direction.Up,
  length = 0,
}: OptionalSnake = {}): Snake => {
  const forward = () => {
    switch (direction) {
      case Direction.Up:
        head.y--;
        break;
      case Direction.Right:
        head.x++;
        break;
      case Direction.Down:
        head.y++;
        break;
      case Direction.Left:
        head.x--;
        break;
    }
  };

  const turn = () => {};

  return {
    head,
    segments,
    direction,
    length,
    forward,
    turn,
  };
};
