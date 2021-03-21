import { Vector } from "../types";
import { SCALE } from "./constants";
import { getState } from "./game";

export const randRange = (range: number) => Math.floor(Math.random() * range);

export const randomVectorInRange = (range: Vector) => ({
  x: randRange(range.x),
  y: randRange(range.y),
});

export const vectorEquals = (a: Vector, b: Vector): boolean => {
  if (a.x === b.x && a.y === b.y) return true;
  return false;
};

export const getScaledWorldSize = (): Vector => ({
  x: getState().worldSize * SCALE,
  y: getState().worldSize * SCALE,
});

export const wrapBounds = (vector: Vector) => {
  const x = getState().worldSize;
  const y = x;
  if (vector.x >= x) vector.x = 0;
  else if (vector.x < 0) vector.x = x - 1;
  if (vector.y >= y) vector.y = 0;
  else if (vector.y < 0) vector.y = y - 1;
  return vector;
};

export const randomVectorInBounds = () =>
  randomVectorInRange({ x: getState().worldSize, y: getState().worldSize });

export const clamp = (value: number, min: number, max: number) => {
  console.log(value, min, max);

  if (value < min) {
    console.log("min");

    return min;
  } else if (value > max) {
    console.log("max");

    return max;
  }
  console.log("value");
  return value;
};

export const addVectors = (a: Vector, b: Vector): Vector => ({
  x: a.x + b.x,
  y: a.y + b.y,
});

export const spliceRandomElement = <T>(table: T[]) => {
  return table.splice(Math.floor(Math.random() * table.length), 1)[0];
};
