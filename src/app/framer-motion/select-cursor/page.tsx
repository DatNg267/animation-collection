"use client";
import { useRef, useState } from "react";
import styles from "./styles.module.scss";
import useMousePosition from "./useMousePosition";

const MaskCursor = () => {
  const { x, y } = useMousePosition();
  const [isHovered, setIsHovered] = useState(false);

  const [mouseDownPosition, setMouseDownPosition] = useState({ x: 0, y: 0 } as {
    x: number;
    y: number;
  });

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const mouseTargetRef = useRef(false);
  return (
    <div
      className={styles.main}
      onMouseDown={(e) => {
        setSize({ width: 0, height: 0 });
        setMouseDownPosition({ x: e.clientX, y: e.clientY });
        mouseTargetRef.current = true;
      }}
      onMouseMove={(e) => {
        if (!mouseTargetRef.current) return;
        const width = Math.abs(e.clientX - mouseDownPosition.x);
        const height = Math.abs(e.clientY - mouseDownPosition.y);
        setSize({ width, height });
      }}
      onMouseUp={() => {
        mouseTargetRef.current = false;
      }}
    >
      <div
        className={styles.mask}
        style={{
          WebkitMaskPosition: `${mouseDownPosition.x}px ${mouseDownPosition.y}px`,
          WebkitMaskSize: `${size.width}px ${size.height}px`,
        }}
      >
        <p
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        </p>
      </div>
      <div className={styles.body}>
        <p>
          Lorem ipsum dolor sit, <span>amet consectetur</span> adipisicing elit.
          Voluptate
        </p>
      </div>
    </div>
  );
};

export default MaskCursor;
