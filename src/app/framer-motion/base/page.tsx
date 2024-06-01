"use client";
import { motion } from "framer-motion";
import React from "react";

type Props = {};

const DemoAnimation = (props: Props) => {
  return (
    <div>
      <motion.div
        animate={{ x: [0, 100, 0, 100] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="w-20 h-20 bg-yellow-300"
      >
        test
      </motion.div>
    </div>
  );
};

export default DemoAnimation;
