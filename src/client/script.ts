import "./style.css";
import { createCanvasController } from "./utils/canvas";
import { setupWindowListeners } from "./utils/listeners";
import { initSocket } from "./utils/socket";

const canvasSize = { width: window.innerWidth, height: window.innerHeight };
const canvas = document.querySelector("canvas");

(() => {
  const ctx = canvas?.getContext("2d");
  if (!ctx) return;

  const canvasController = createCanvasController(ctx);
  canvasController.setSize(canvasSize);

  const socket = initSocket({
    updateCallback: (data) => {
      console.log(data);
      requestAnimationFrame(() => canvasController.update(data));
    },
  });

  setupWindowListeners(socket);
})();
