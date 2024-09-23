"use client";
import useWindow from "@/hooks/useWindow";
import { useEffect, useRef } from "react";

const DRAW_RADIUS = 50;
const Scene = () => {
  const windowSize = useWindow();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prevPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (windowSize.width > 0) {
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const init = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, windowSize.width, windowSize.height);
    ctx.globalCompositeOperation = "destination-out";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { clientX, clientY, movementX, movementY } = e;
    const rect = canvasRef.current?.getBoundingClientRect()!;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const nbOfCircles = Math.max(Math.abs(movementX), Math.abs(movementY));

    console.log({ nbOfCircles });
    if (prevPosition.current != null) {
      const { x, y } = prevPosition.current;
      console.log({
        aX: 1 / nbOfCircles,
        aY: 1 / nbOfCircles,
      });

      for (let i = 0; i < nbOfCircles; i++) {
        const targetX = lerp(x, clientX, (1 / nbOfCircles) * i);

        const targetY = lerp(y, clientY, (1 / nbOfCircles) * i);
        console.log({ targetX, targetY });
        draw(targetX, targetY, DRAW_RADIUS);
      }
    }

    draw(x, y, DRAW_RADIUS);
    prevPosition.current = { x, y };
  };

  const draw = (x: number, y: number, radius: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  };

  return (
    <div className="relative size-full">
      {windowSize.width === 0 && (
        <div className="absolute size-full bg-black"></div>
      )}
      <canvas
        onMouseMove={handleMouseMove}
        ref={canvasRef}
        height={windowSize.height}
        width={windowSize.width}
      ></canvas>
    </div>
  );
};

export default Scene;
