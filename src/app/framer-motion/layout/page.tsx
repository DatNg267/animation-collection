"use client";

import { motion } from "framer-motion";
import { useState } from "react";

function Page() {
  function getRandomInt(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }
  const [items, setItems] = useState(() => {
    return Array.from({ length: 10 }, (_, i) => getRandomInt(1, 100));
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const shuffleItems = () => {
    setItems([...items].sort((a, b) => getRandomInt(-1, 1)));
  };

  const [isSecond, setIsSecond] = useState(false);

  return (
    <div>
      <button onClick={shuffleItems}>Shuffle</button>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <motion.div
            key={item}
            layout
            className="p-4 bg-blue-500 text-white rounded"
          >
            {item}
          </motion.div>
        ))}
      </div>

      <motion.div
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 bg-green-500 text-white rounded"
        style={{
          width: isExpanded ? 300 : 100,
          height: isExpanded ? 200 : 100,
        }}
      >
        Click Me
      </motion.div>
      <div onClick={() => setIsSecond(!isSecond)}>
        {!isSecond ? (
          <motion.div layoutId="box" className="w-16 h-16 bg-red-500" />
        ) : (
          <motion.div layoutId="box" className="w-32 h-32 bg-blue-500" />
        )}
      </div>
    </div>
  );
}

export default Page;
