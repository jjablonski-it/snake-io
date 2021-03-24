import { Turn } from "../../types";

export const setupWindowListeners = (socket: SocketIOClient.Socket) => {
  window.addEventListener("keydown", (e) => {
    const direction = e.key;
    console.log(direction);

    if (direction === "ArrowLeft") socket.emit("turn", Turn.LEFT);
    else if (direction === "ArrowRight") socket.emit("turn", Turn.RIGHT);
  });

  window.addEventListener("click", ({ pageX }) => {
    if (pageX < window.innerWidth / 2) {
      socket.emit("turn", Turn.LEFT);
    } else {
      socket.emit("turn", Turn.RIGHT);
    }
  });
};
