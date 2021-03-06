import io from "socket.io-client";
import { State, TurnDirection } from "../types";
import "./style.css";

let socket = io();

socket.on("update", (data: State) => {
  console.log(data);
});

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    socket.emit("turn", TurnDirection.Left);
  } else if (e.key === "ArrowRight") {
    socket.emit("turn", TurnDirection.Right);
  }
});
