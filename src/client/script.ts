import io from "socket.io-client";
import { State, TurnDirection } from "../types";
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
  if (e.key === "ArrowLeft") {
    socket.emit("turn", TurnDirection.Left);
  } else if (e.key === "ArrowRight") {
    socket.emit("turn", TurnDirection.Right);
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

    if (self) ctx.fillStyle = "red";
    else ctx.fillStyle = "black";
    ctx.fillRect(x, y, 1, 1);
  });

  ctx.fillStyle = "green";
  ctx.fillRect(fruit.x, fruit.y, 1, 1);
};
