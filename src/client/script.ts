import "./style.css";
import io from "socket.io-client";

const socket = io();

socket.on("ping", (message: string) => {
  console.log(message);
  socket.emit("pong", "PONG");
});
