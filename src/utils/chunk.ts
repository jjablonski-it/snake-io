import { Vector } from "../types";
import { CHUNK_SIZE, WORLD_SIZE } from "./constants";
import { getState } from "./game";
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
}
