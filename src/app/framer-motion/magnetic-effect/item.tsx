import { motion } from "framer-motion";
import React, { useRef, useState } from "react";

const Item = () => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const item = elementRef.current;
    if (!item) return;

    const { clientX, clientY } = e;
    const itemRect = item.getBoundingClientRect();
    const suggestX = clientX - (itemRect.left + itemRect.width / 2);
    const suggestY = clientY - (itemRect.top + itemRect.height / 2);

    setPosition({ x: suggestX, y: suggestY });
  };

  const mouseleave = (e: React.MouseEvent<HTMLDivElement>) => {
    setPosition({ x: 0, y: 0 });
  };
  const { x, y } = position;

  return (
    <motion.div
      ref={elementRef}
      onMouseMove={mouseMove}
      onMouseLeave={mouseleave}
      animate={{ x, y }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      className="w-20 h-20 m-20 bg-white"
    ></motion.div>
  );
};

export default Item;
