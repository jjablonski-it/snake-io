import io from "socket.io-client";
import { Direction, State } from "../types";
import { SCALE, SIZE } from "../utils/constants";
import { clamp, getRealSize } from "../utils/helpers";
import "./style.css";

let scaleModifier = 1;
const getScale = (): number => SCALE / scaleModifier;

const canvasSize = { width: 500, height: 500 };
const scaledSize = {
  width: canvasSize.width / getScale(),
  height: canvasSize.height / getScale(),
};

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
  if (ctx) draw(data, ctx);
});

window.addEventListener("keydown", (e) => {
  const direction = e.key as Direction;
  if (direction && Object.values(Direction).includes(direction)) {
    socket.emit("turn", direction);
  }
});

const draw = (data: State, ctx: CanvasRenderingContext2D) => {
  const { fruit, players } = data;
  ctx.setTransform(getScale(), 0, 0, getScale(), 0, 0);
  ctx.clearRect(0, 0, scaledSize.width, scaledSize.height);

  const player = players.find((p) => p.id === socketId);
  const snake = player?.snake;
  if (!snake) return;

  const cameraX = clamp(
    scaledSize.width / 2 - snake.head.x,
    0,
    getRealSize().x - scaledSize.width
  );
  const cameraY = clamp(
    scaledSize.height / 2 - snake.head.y,
    0,
    getRealSize().y - scaledSize.height
  );

  ctx.translate(cameraX, cameraY);

  //Draw everything

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
  ctx.fillRect(fruit.x, fruit.y, 1, 1);

  ctx.lineWidth = 0.25;
  ctx.strokeRect(0, 0, getRealSize().x, getRealSize().y);
};
