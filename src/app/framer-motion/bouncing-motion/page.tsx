"use client";
import { motion, useTime, useTransform } from "framer-motion";
import React, { useRef } from "react";

type Props = {};
const duration = 4000;
const Page = (props: Props) => {
  const boundRef = useRef<HTMLDivElement>(null);
  const time = useTime();
  const loopTime = useTransform(time, (latest) => latest % duration); // Reset time sau 2000ms
  const rotate = useTransform(time, [0, duration], [0, 360], {
    clamp: false,
  });

  const scale = useTransform(loopTime, [0, 2000, duration], [0.9, 1.1, 0.9], {
    clamp: true,
  });
  const y = useTransform(time, (latest) => Math.sin(latest / 1000) * 100);
  return (
    <div className="size-full flex items-center justify-center">
      <motion.div
        ref={boundRef}
        className="size-40 rounded-3xl bg-orange-500"
        style={{
          y,
          rotate,
          scale,
        }}
      ></motion.div>
    </div>
  );
};

export default Page;
