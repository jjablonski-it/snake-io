import io from "socket.io-client";
import { State, TurnDirection } from "../types";
import { SCALE } from "../utils/constants";
import "./style.css";

let socket = io();
const canvas = document.querySelector("canvas");
const ctx = canvas?.getContext("2d");
ctx?.scale(...SCALE);

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
  ctx.clearRect(0, 0, 50, 50);
  data.players.forEach((p) => {
    const { snake } = p;
    const {
      head: { x, y },
    } = snake;
    ctx.fillRect(x, y, 1, 1);
  });
};
