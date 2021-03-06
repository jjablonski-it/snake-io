import { Direction, OptionalSnake, Snake, TurnDirection } from "../types";

export const createSnake = ({
  head = { x: 0, y: 0 },
  segments = [],
  direction = Direction.Up,
  length = 0,
}: OptionalSnake = {}): Snake => ({
  head,
  segments,
  direction,
  length,
  turn(turn: TurnDirection) {
    let newDirection: Direction | null = null;
    if (turn === TurnDirection.Left) {
      newDirection = this.direction - 1;
    } else {
      newDirection = this.direction + 1;
    }

    if (newDirection > Direction.Left) newDirection = Direction.Up;
    else if (newDirection < Direction.Up) newDirection = Direction.Left;

    this.direction = newDirection;
    console.log(this.direction);
  },
  forward() {
    switch (this.direction) {
      case Direction.Up:
        this.head.y--;
        break;
      case Direction.Right:
        this.head.x++;
        break;
      case Direction.Down:
        this.head.y++;
        break;
      case Direction.Left:
        this.head.x--;
        break;
    }
  },
});
