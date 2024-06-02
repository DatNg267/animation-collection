"use client";
import { motion, MotionValue } from "framer-motion";
import React from "react";
import SettingAnimateExample from "./components/animate";
import MotionValueExample from "./components/motion-value";

type Props = {};

const DemoAnimation = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-dvh space-y-4">
      <motion.div
        animate={{ x: [null, 100, 0, 100] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="w-20 h-20 bg-yellow-300"
      >
        test
      </motion.div>

      <motion.div
        whileHover={{ scale: [null, 1.5, 2] }}
        transition={{ duration: 0.3, ease: "linear" }}
        className="w-20 h-20 bg-yellow-300"
      >
        test
      </motion.div>

      <motion.circle
        className={" w-20 h-20  stroke-white stroke-1"}
        cx={500}
        animate={{ cx: [null, 100, 200] }}
        transition={{ duration: 3, times: [0, 0.2, 1] }}
      />

      <SettingAnimateExample></SettingAnimateExample>

      <MotionValueExample></MotionValueExample>
    </div>
  );
};

export default DemoAnimation;
