import { Direction, TurnDirection, Vector } from "../types";
import { SIZE } from "./constants";
import { getState } from "./game";
import { randomVectorInBounds, vectorEquals, wrapBounds } from "./helpers";

export class Snake {
  head: Vector;
  segments: Vector[];
  length: number;
  direction: Direction;
  constructor({ segments = [], direction = Direction.Up, length = 0 } = {}) {
    this.head = randomVectorInBounds();
    this.segments = segments;
    this.direction = direction;
    this.length = length;
    console.log(this.head);
  }

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
  }

  forward() {
    const newPost = { ...this.head };
    switch (this.direction) {
      case Direction.Up:
        newPost.y--;
        break;
      case Direction.Right:
        newPost.x++;
        break;
      case Direction.Down:
        newPost.y++;
        break;
      case Direction.Left:
        newPost.x--;
        break;
    }
    this.head = wrapBounds(newPost);
    this.checkCollision();
  }

  private consume() {}

  checkCollision(): boolean {
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
