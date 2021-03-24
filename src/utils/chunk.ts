import { Vector } from "../types";
import { CHUNK_SIZE } from "./constants";
import { getChunkForVector, getState } from "./game";
import { randomVectorInRange } from "./helpers";

export class Chunk {
  fruit: Vector | null;
  constructor(public position: Vector) {
    this.fruit = null;
  }

  getBounds() {
    return {
      minX: this.position.x,
      maxX: this.position.x + CHUNK_SIZE,
      minY: this.position.y,
      maxY: this.position.y + CHUNK_SIZE,
    };
  }

  randomVectorWithin() {
    const vector = randomVectorInRange({
      x: Math.min(CHUNK_SIZE - 1, getState().worldSize - this.position.x),
      y: Math.min(CHUNK_SIZE - 1, getState().worldSize - this.position.y),
    });

    vector.x += this.position.x;
    vector.y += this.position.y;
    return vector;
  }

  generateFruit() {
    this.fruit = this.randomVectorWithin();
  }

  removeFruit() {
    this.fruit = null;
  }

  isFruit() {
    return !!this.fruit;
  }

  getPlayers() {
    return getState().players.filter((player) => {
      const { head, segments } = player.snake;
      return (
        getChunkForVector(head) === this ||
        segments.some((segment) => getChunkForVector(segment) === this)
      );
    });
  }

  isPlayer() {
    return this.getPlayers().length > 0;
  }

  isOccupied() {
    return this.isFruit() || this.isPlayer();
  }
}
