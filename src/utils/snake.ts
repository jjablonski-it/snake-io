import { Direction, TurnDirection, Vector } from "../types";
import { generateFriut, getState } from "./game";
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
    this.grow();
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

    for (let i = this.segments.length - 1; i >= 0; i--) {
      if (i > 0) {
        this.segments[i] = { ...this.segments[i - 1] };
      } else {
        this.segments[i] = { ...this.head };
      }
    }

    this.head = wrapBounds(newPost);
    this.checkCollision();
  }

  grow() {
    this.length++;
    this.segments.push({ ...this.head });
  }

  consume() {
    this.grow();
    generateFriut();
  }

  checkCollision(): boolean {
    const { fruit, players } = getState();
    if (vectorEquals(fruit, this.head)) {
      this.consume();
      return true;
    }
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
