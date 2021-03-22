import io from "socket.io-client";
import { StateDTO } from "../../types";

let socket = io();

interface Props {
  updateCallback: (data: StateDTO) => void;
}

export const initSocket = ({ updateCallback }: Props) => {
  socket.on("update", (data: StateDTO) => updateCallback(data));

  return socket;
};
