import io from "socket.io-client";
import { Direction, State } from "../types";
import { GRID_P, SCALE } from "../utils/constants";
import { clamp, getScaledWorldSize } from "../utils/helpers";
import "./style.css";

let scaleModifier = 1;
const getScale = (): number => SCALE / scaleModifier;

const canvasSize = { width: window.innerWidth, height: window.innerHeight };
const scaledSize = () => ({
  width: canvasSize.width / getScale(),
  height: canvasSize.height / getScale(),
});

let socket = io();
let socketId = "";
const canvas = document.querySelector("canvas");
const ctx = canvas?.getContext("2d");

if (ctx) {
  const { width, height } = canvasSize;
  ctx.canvas.width = width;
  ctx.canvas.height = height;
}

socket.on("connect", function () {
  socketId = socket.id;
});

socket.on("update", (data: State) => {
  console.log(data);
  if (ctx) requestAnimationFrame(() => draw(data, ctx));
});

window.addEventListener("keydown", (e) => {
  const direction = e.key as Direction;
  if (direction && Object.values(Direction).includes(direction)) {
    socket.emit("turn", direction);
  }
});

const draw = (data: State, ctx: CanvasRenderingContext2D) => {
  const { fruits, players } = data;
  ctx.setTransform(getScale(), 0, 0, getScale(), 0, 0);
  ctx.clearRect(0, 0, getScaledWorldSize().x, getScaledWorldSize().y);

  const player = players.find((p) => p.id === socketId);
  const snake = player?.snake;
  if (!snake) return;

  let cameraX = clamp(
    scaledSize().width / 2 - snake.head.x,
    scaledSize().width - getScaledWorldSize().x,
    0
  );
  let cameraY = clamp(
    scaledSize().height / 2 - snake.head.y,
    scaledSize().height - getScaledWorldSize().y,
    0
  );

  ctx.translate(cameraX, cameraY);

  // Draw

  // Grid
  ctx.lineWidth = 0.01;
  ctx.beginPath();

  for (let x = 0; x < getScaledWorldSize().x; x += GRID_P) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, getScaledWorldSize().y);
  }

  for (let y = 0; y < getScaledWorldSize().y; y += GRID_P) {
    ctx.moveTo(0, y);
    ctx.lineTo(getScaledWorldSize().x, y);
  }
  ctx.stroke();

  players.forEach((p) => {
    const { id, snake } = p;
    const self = id === socketId;

    const {
      head: { x, y },
    } = snake;

    ctx.fillStyle = "red";
    p.snake.segments.forEach((s) => {
      ctx.fillRect(s.x, s.y, 1, 1);
    });

    if (self) ctx.fillStyle = "blue";
    else ctx.fillStyle = "black";
    ctx.fillRect(x, y, 1, 1);
  });

  ctx.fillStyle = "green";

  fruits.forEach((fruit) => {
    ctx.fillRect(fruit.x, fruit.y, 1, 1);
  });

  ctx.strokeRect(0, 0, getScaledWorldSize().x, getScaledWorldSize().y);
};
