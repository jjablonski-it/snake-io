import { Vector } from "../types";

export const randRange = (range: number) => Math.floor(Math.random() * range);

export const vectorEquals = (a: Vector, b: Vector): boolean => {
  if (a.x === b.x && a.y === b.y) return true;
  return false;
};
