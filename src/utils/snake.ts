import { Direction, TurnDirection, Vector } from "../types";
import { TAIL_LENGTH } from "./constants";
import { generateFriut, getState } from "./game";
import { randomVectorInBounds, vectorEquals, wrapBounds } from "./helpers";

export class Snake {
  head: Vector;
  segments: Vector[];
  direction: Direction;
  constructor({ segments = [], direction = Direction.Up } = {}) {
    this.head = randomVectorInBounds();
    this.segments = segments;
    this.direction = direction;
    console.log(this.head);
    this.setLength(TAIL_LENGTH);
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
  }

  setLength(n: number) {
    this.segments = new Array(n).fill({ ...this.head });
  }

  trimSegments(to: number) {
    this.segments.splice(to);
  }

  grow() {
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

    const headToHeadCollision = snakes.find((snake) =>
      vectorEquals(snake.head, this.head)
    );

    if (headToHeadCollision) {
      if (headToHeadCollision.getLength() >= this.getLength())
        this.setLength(TAIL_LENGTH);
      return true;
    }

    const bodyCollision = snakes.some((snake) =>
      snake.segments.some((segment) => vectorEquals(segment, this.head))
    );

    if (bodyCollision) {
      this.setLength(TAIL_LENGTH);
      return true;
    }

    return false;
  }

  getLength() {
    return this.segments.length;
  }
}
