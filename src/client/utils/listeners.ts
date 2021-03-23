import { Socket } from "socket.io";
import { Turn } from "../../types";

export const setupListeners = (socket: Socket) => {
  window.addEventListener("keydown", (e) => {
    const direction = e.key;
    console.log(direction);

    if (direction === "ArrowLeft") socket.emit("turn", Turn.LEFT);
    else if (direction === "ArrowRight") socket.emit("turn", Turn.RIGHT);
  });

  window.addEventListener("click", ({ pageX }) => {
    console.log(pageX);
    if (pageX < window.innerWidth / 2) {
      socket.emit("turn", Turn.LEFT);
    } else {
      socket.emit("turn", Turn.RIGHT);
    }
  });
};
