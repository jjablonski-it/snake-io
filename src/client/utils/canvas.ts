import { head } from "lodash";
import { StateDTO } from "../../types";
import {
  GRID_P,
  LENGTH_PER_FRUIT,
  MIN_SCALE,
  SCALE,
  ZOOMOUT_PER_FRUIT,
} from "../../utils/constants";
import { Snake } from "../../utils/snake";

export const createCanvasController = (ctx: CanvasRenderingContext2D) => {
  let width: number;
  let height: number;

  let zoomOut = 1;

  const setSize = (size: { width: number; height: number }) => {
    ctx.canvas.width = width = size.width;
    ctx.canvas.height = height = size.height;
  };

  const getScale = () => Math.max(MIN_SCALE, SCALE - zoomOut);

  const setZoom = (snake: StateDTO["me"]["snake"]) => {
    zoomOut = (snake.segments.length / LENGTH_PER_FRUIT) * ZOOMOUT_PER_FRUIT;
  };

  const update = ({ me: { snake }, players, fruits, worldSize }: StateDTO) => {
    const { width, height } = ctx.canvas;
    setZoom(snake);

    console.log(zoomOut);
    console.log(getScale());

    ctx.resetTransform();
    ctx.clearRect(0, 0, width, height);
    ctx.scale(getScale(), getScale());
    ctx.translate(
      width / getScale() / 2 - snake.head.x,
      height / getScale() / 2 - snake.head.y
    );

    drawBorders(worldSize);
    drawGrid(worldSize);
    drawSnake(snake, "blue");
    drawSnakes(players.map((p) => p.snake));
    drawFruits(fruits);
  };

  const drawBorders = (worldSize: StateDTO["worldSize"]) => {
    ctx.lineWidth = 0.1;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeRect(0, 0, worldSize, worldSize);
  };

  const drawGrid = (worldSize: StateDTO["worldSize"]) => {
    ctx.lineWidth = 0.01;
    ctx.beginPath();

    for (let x = 0; x < worldSize; x += GRID_P) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, worldSize);
    }

    for (let y = 0; y < worldSize; y += GRID_P) {
      ctx.moveTo(0, y);
      ctx.lineTo(worldSize, y);
    }
    ctx.stroke();
  };

  const drawSnake = (
    { head, segments }: StateDTO["me"]["snake"],
    headColor: string = "blue",
    bodyColor: string = "gray"
  ) => {
    ctx.fillStyle = headColor;
    ctx.fillRect(head.x, head.y, 1, 1);

    ctx.fillStyle = bodyColor;
    segments.forEach(({ x, y }) => {
      ctx.fillRect(x, y, 1, 1);
    });
  };

  const drawSnakes = (snake: Snake[]) => {
    snake.forEach((snake) => drawSnake(snake, "red"));
  };

  const drawFruits = (fruits: StateDTO["fruits"], color: string = "green") => {
    ctx.fillStyle = color;
    fruits.forEach(({ x, y }) => {
      ctx.fillRect(x, y, 1, 1);
    });
  };

  return { update, setSize };
};
