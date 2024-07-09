"use client";
import {
  motion,
  PanInfo,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { MouseEvent, useRef } from "react";

const DraggableItem = ({ content }: { content: string }) => {
  // Sử dụng useMotionValue để theo dõi vị trí chuột
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Sử dụng useAnimation để kiểm soát animation
  const controls = useAnimation();

  // Transform để tạo hiệu ứng "bám theo" chuột
  const x = useTransform(mouseX, (latest) => latest * 0.1);
  const y = useTransform(mouseY, (latest) => latest * 0.1);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    var img = new Image();
    img.src = ""; // Đặt src thành một hình ảnh trống
    event.dataTransfer.setDragImage(img, 0, 0);
    controls.start({ width: 200, height: 50 });
  };

  const handleDrag = (event: any) => {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
  };

  const handleDragEnd = () => {
    console.log("drag end");
    controls.start({
      x: 0,
      y: 0,
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

      <motion.div
        className="absolute h-10 w-10 bg-red-400"
        animate={controls}
        style={{ x: mouseX, y: mouseY }}
      ></motion.div>
    </div>
  );
};

type Props = {};
const page = (props: Props) => {
  return <DraggableItem content="Drag me!" />;
};

export default page;
