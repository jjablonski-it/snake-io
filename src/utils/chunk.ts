import { Vector } from "../types";
import { CHUNK_SIZE } from "./constants";
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
      x: CHUNK_SIZE - 1,
      y: CHUNK_SIZE - 1,
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
