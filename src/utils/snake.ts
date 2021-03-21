import { Direction, Vector } from "../types";
import { LENGTH_PER_FRUIT, TAIL_LENGTH } from "./constants";
import { generateFriuts, getState, removeFruit } from "./game";
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

  turn(direction: Direction) {
    // 2 key direction
    // if (newDirection > Direction.Left) newDirection = Direction.Up;
    // else if (newDirection < Direction.Up) newDirection = Direction.Left;
    console.log(direction);

    this.direction = direction;
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
    console.log(this.head);
  }

  setLength(n: number) {
    this.segments = new Array(n).fill({ ...this.head });
  }

  trimSegments(to: number) {
    this.segments.splice(to);
  }

  grow(n: number = 1) {
    this.segments.push(...new Array(n).fill({ ...this.head }));
  }

  consume() {
    this.grow(LENGTH_PER_FRUIT);
  }

  checkCollision(): boolean {
    const { fruits, players } = getState();

    const fruitToEat = fruits.find((fruit) => vectorEquals(fruit, this.head));
    if (fruitToEat) {
      this.consume();
      removeFruit(fruitToEat);

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
