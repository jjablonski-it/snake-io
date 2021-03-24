import { StateDTO } from "../../types";
import { SCALE } from "../../utils/constants";

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
  };

  const drawBorders = ({ worldSize }: StateDTO) => {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeRect(0, 0, worldSize, worldSize);
  };

  return { update, setSize };
};
