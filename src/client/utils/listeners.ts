import { Turn } from "../../types";
import { createCanvasController } from "./canvas";

interface Props {
  handeResize: ReturnType<typeof createCanvasController>["setSize"];
}

export const setupWindowListeners = (
  socket: SocketIOClient.Socket,
  { handeResize }: Props
) => {
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

  window.addEventListener("resize", () => {
    handeResize({ width: window.innerWidth, height: window.innerHeight });
  });
};
