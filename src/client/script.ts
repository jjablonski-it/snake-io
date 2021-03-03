import "./style.css";
import io from "socket.io-client";
import { emit } from "process";

const socket = io();

socket.on("ping", (message: string) => {
  console.log(message);
  socket.emit("pong", "PONG");
});
