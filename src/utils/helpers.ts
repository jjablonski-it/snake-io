import { Vector } from "../types";
import { SCALE, SIZE } from "./constants";

export const randRange = (range: number) => Math.floor(Math.random() * range);

export const randomVectorInRange = (range: Vector) => ({
  x: randRange(range.x),
  y: randRange(range.y),
});

export const vectorEquals = (a: Vector, b: Vector): boolean => {
  if (a.x === b.x && a.y === b.y) return true;
  return false;
};

export const getRealSize = (): Vector => ({
  x: SIZE.width / SCALE,
  y: SIZE.height / SCALE,
});
