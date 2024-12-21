"use client";

import { motion, useScroll } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";
import React, { useState } from "react";

const Scroll = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrollDirection, setScrollDirection] = useState("down");

  console.log([scrollY, scrollYProgress]);

  useMotionValueEvent(scrollY, "change", (current) => {
    console.log("current", current);
    const previous = scrollY.getPrevious();
    if (!previous) return;
    const diff = current - previous;
    setScrollDirection(diff > 0 ? "down" : "up");
  });
  return (
    <div className="block overflow-auto size-full">
      <motion.div
        className="progress-bar fixed top-0 left-0 w-full h-1 bg-black"
        style={{ scaleX: scrollYProgress }}
      />
      <h1>
        <code>useScroll</code> demo
      </h1>

      <h1 className="fixed top-0 left-0 w-full text-center">
        Scroll Direction: {scrollDirection}
      </h1>
      <section className="w-dvw h-screen bg-red-500"></section>
      <section className="w-dvw h-screen bg-blue-500"></section>
      <section className="w-dvw h-screen bg-green-500"></section>
    </div>
  );
};

export default Scroll;
