import io from "socket.io-client";
import { State } from "../../types";

let socket = io();

interface Props {
  updateCallback: (data: State) => void;
}

export const initSocket = ({ updateCallback }: Props) => {
  let socketId = "";

  socket.on("connect", () => {
    socketId = socket.id;
  });

  socket.on("update", (data: State) => updateCallback(data));

  return socket;
};
