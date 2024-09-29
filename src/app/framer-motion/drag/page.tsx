"use client";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, { useState } from "react";

const DraggableItem = ({ content }: { content: string }) => {
  const [isDragging, setIsDragging] = useState(false);

  // Sử dụng useMotionValue để theo dõi vị trí chuột
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Sử dụng useAnimation để kiểm soát animation
  const controls = useAnimation();

  // Transform để tạo hiệu ứng "bám theo" chuột
  const top = useTransform(mouseY, (latest) => `${latest}px`);
  const left = useTransform(mouseX, (latest) => `${latest}px`);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    var img = new Image();
    img.src = ""; // Đặt src thành một hình ảnh trống
    event.dataTransfer.setDragImage(img, 0, 0);
    controls.start({ width: 200, height: 50 });
  };

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    controls.start({
      top: 0,
      left: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
      width: 100,
      height: 20,
    });
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="w-full h-full overflow-hidden"
      onClick={(e) =>
        console.log({
          clientX: e.clientX,
          clientY: e.clientY,
        })
      }
      onDragOver={handleDrag}
    >
      <div
        draggable={true}
        className="w-10"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{
          MozWindowDragging: "no-drag",
        }}
      >
        {content}
      </div>

      {isDragging && (
        <motion.div
          className="h-10 w-10 fixed bg-red-400"
          animate={controls}
          style={{ top, left }}
        ></motion.div>
      )}
    </div>
  );
};

const Page = () => {
  return <DraggableItem content="Drag me!" />;
};

export default Page;
