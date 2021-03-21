import { Direction, Vector } from "../types";
import { LENGTH_PER_FRUIT, TAIL_LENGTH } from "./constants";
import { getChunkForVector, getState, returnPoints } from "./game";
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

  resetLength() {
    returnPoints(this);
    this.setLength(TAIL_LENGTH);
  }

  checkCollision(): boolean {
    const { players } = getState();
    const currentChunk = getChunkForVector(this.head);

    if (!currentChunk) throw "No chunk for snake found";

    if (
      currentChunk.isFruit() &&
      vectorEquals(this.head, currentChunk.fruit!)
    ) {
      this.consume();
      currentChunk.removeFruit();
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
        this.resetLength();
      return true;
    }

    const bodyCollision = snakes.some((snake) =>
      snake.segments.some((segment) => vectorEquals(segment, this.head))
    );

    if (bodyCollision) {
      this.resetLength();
      return true;
    }

    return false;
  }

  getLength() {
    return this.segments.length;
  }
}
