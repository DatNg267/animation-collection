"use client";
import React, { useState, useRef, use, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useDragControls,
} from "framer-motion";

interface DraggableItemProps {
  id: number;
  content: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, content }) => {
  const dragControls = useDragControls();
  const [isDragging, setIsDragging] = useState(false);

  // Use useMotionValue to track the position of the item
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform to create the "lift" effect when dragging

  useEffect(() => {
    console.log({ x, y });
  }, [x, y]);

  useEffect(() => {
    console.log("isDragging");
  });
  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);

  return (
    <div
      className="h-dvh"
      onDragOver={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <motion.div
        draggable={true}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ x, y }}
      >
        {content}
      </motion.div>

      {isDragging && (
        <motion.div
          style={{
            position: "fixed",
            pointerEvents: "none",
            x,
            y,
            zIndex: 1000,
            opacity: 0.7,
          }}
        >
          {content}
        </motion.div>
      )}
    </div>
  );
};

const DragDropList: React.FC = () => {
  const items = [
    { id: 1, content: "Item 1" },
    { id: 2, content: "Item 2" },
    { id: 3, content: "Item 3" },
  ];

  return (
    <div>
      {items.map((item) => (
        <DraggableItem key={item.id} id={item.id} content={item.content} />
      ))}
    </div>
  );
};

export default DragDropList;
