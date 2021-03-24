import { StateDTO } from "../../types";
import { GRID_P, SCALE } from "../../utils/constants";

export const createCanvasController = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = ctx.canvas;
  const setSize = ({ width, height }: { width: number; height: number }) => {
    ctx.canvas.width = width;
    ctx.canvas.height = height;
  };

  const update = (data: StateDTO) => {
    ctx.resetTransform();
    ctx.scale(SCALE, SCALE);

    drawBorders(data);
    drawGrid();
  };

  const drawBorders = ({ worldSize }: StateDTO) => {
    ctx.lineWidth = 0.1;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeRect(0, 0, worldSize, worldSize);
  };

  const drawGrid = () => {
    ctx.lineWidth = 0.01;
    ctx.beginPath();

    for (let x = 0; x < width; x += GRID_P) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }

    for (let y = 0; y < height; y += GRID_P) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  };

  return { update, setSize };
};
