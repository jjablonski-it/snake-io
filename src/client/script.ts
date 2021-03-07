import io from "socket.io-client";
import { Direction, State } from "../types";
import { SCALE, SIZE } from "../utils/constants";
import "./style.css";

let socket = io();
let socketId = "";
const canvas = document.querySelector("canvas");
const ctx = canvas?.getContext("2d");

if (ctx) {
  ctx.canvas.width = SIZE.width;
  ctx.canvas.height = SIZE.height;
  ctx.scale(SCALE, SCALE);
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
  ctx.clearRect(0, 0, 50, 50);

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
};
