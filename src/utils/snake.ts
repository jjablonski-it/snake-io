import { Direction, TurnDirection, Vector } from "../types";
import { SIZE } from "./constants";
import { getState } from "./game";
import { randRange, vectorEquals } from "./helpers";

const { width, height } = SIZE;
export class Snake {
  head: Vector;
  segments: Vector[];
  length: number;
  direction: Direction;
  constructor({
    head = { x: randRange(width), y: randRange(height) },
    segments = [],
    direction = Direction.Up,
    length = 0,
  } = {}) {
    this.head = head;
    this.segments = segments;
    this.direction = direction;
    this.length = length;
  }

  public turn(turn: TurnDirection) {
    let newDirection: Direction | null = null;
    if (turn === TurnDirection.Left) {
      newDirection = this.direction - 1;
    } else {
      newDirection = this.direction + 1;
    }

    if (newDirection > Direction.Left) newDirection = Direction.Up;
    else if (newDirection < Direction.Up) newDirection = Direction.Left;

    this.direction = newDirection;
  }

  public forward() {
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
  }

  public checkCollision(): boolean {
    const { fruit, players } = getState();
    const { width, height } = SIZE;
    const { x, y } = this.head;
    if (x === width || y === height || x === 0 || y === 0) return true;
    if (vectorEquals(fruit, this.head)) return true;
    const snakes = players
      .map((player) => player.snake)
      .filter((snake) => snake !== this);
    return snakes.some(
      (snake) =>
        vectorEquals(snake.head, this.head) ||
        snake.segments.some((segment) => vectorEquals(segment, this.head))
    );
  }
}
