import { words } from "lodash";
import { Direction, Player, StateDTO, Turn, Vector } from "../types";
import {
  GRID_P,
  LENGTH_PER_FRUIT,
  MIN_SCALE,
  SCALE,
  WORLD_SIZE,
} from "../utils/constants";
import { clamp, getScaledWorldSize } from "../utils/helpers";
import "./style.css";
import { initSocket } from "./utils/socket";

let scaleModifier = 1;

const canvasSize = { width: window.innerWidth, height: window.innerHeight };

let player = null;
let globalWorldSize = WORLD_SIZE;
const canvas = document.querySelector("canvas");
const ctx = canvas?.getContext("2d");

const socket = initSocket({
  updateCallback: (data) => {
    console.log(data);
    const p = data.players.find((p) => p.id === socket.id);
    player = p;

    if (player)
      scaleModifier = Math.max(
        MIN_SCALE,
        SCALE -
          player.snake.segments.length / LENGTH_PER_FRUIT / LENGTH_PER_FRUIT
      );
    // console.log("scaleModifier", scaleModifier);

    if (ctx) requestAnimationFrame(() => draw(data, ctx));

    globalWorldSize = data.worldSize;
  },
});

const getScale = (): number => SCALE + scaleModifier;

const scaledSize = () => ({
  width: canvasSize.width / getScale(),
  height: canvasSize.height / getScale(),
});

if (ctx) {
  const { width, height } = canvasSize;
  ctx.canvas.width = width;
  ctx.canvas.height = height;
}

window.addEventListener("keydown", (e) => {
  const direction = e.key;
  console.log(direction);

  if (direction === "ArrowLeft") socket.emit("turn", Turn.LEFT);
  else if (direction === "ArrowRight") socket.emit("turn", Turn.RIGHT);
  // const direction = e.key as Direction;
  // if (direction && Object.values(Direction).includes(direction)) {
  //   socket.emit("turn", direction);
  // }
});

const draw = (data: StateDTO, ctx: CanvasRenderingContext2D) => {
  const { fruits, players } = data;
  ctx.setTransform(getScale(), 0, 0, getScale(), 0, 0);
  ctx.clearRect(0, 0, getScaledWorldSize().x, getScaledWorldSize().y);

  const player = players.find((p) => p.id === socket.id);
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

  for (let x = 0; x < ctx.canvas.width; x += GRID_P) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, ctx.canvas.height);
  }

  for (let y = 0; y < ctx.canvas.height; y += GRID_P) {
    ctx.moveTo(0, y);
    ctx.lineTo(ctx.canvas.width, y);
  }
  ctx.stroke();

  players.forEach((p) => {
    const { id, snake } = p;
    const self = id === socket.id;

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
    ctx.fillRect(fruit!.x, fruit!.y, 1, 1);
  });

  ctx.lineWidth = 0.1;
  // ctx.strokeStyle = "red";
  ctx.strokeRect(0, 0, globalWorldSize, globalWorldSize);
};
