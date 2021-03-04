import { State } from "../types";
import openSocket from "socket.io-client";

let socket: SocketIOClient.Socket | null = null;

export const connectSocket = () => {
  if (socket) return socket;
  socket = openSocket();

  socket.on("update", (data: State) => {
    console.log(data);
  });
};
