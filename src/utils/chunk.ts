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

  generateFruit() {
    const randomPos = randomVectorInRange({
      x: Math.min(CHUNK_SIZE - 1, getState().worldSize - this.position.x),
      y: Math.min(CHUNK_SIZE - 1, getState().worldSize - this.position.y),
    });

    randomPos.x += this.position.x;
    randomPos.y += this.position.y;

    this.fruit = randomPos;
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
    this.getPlayers().length > 0;
  }

  isOccupied() {
    return this.isFruit() || this.isPlayer();
  }
}
