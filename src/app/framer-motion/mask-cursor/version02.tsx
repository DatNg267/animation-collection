"use client";

import { cn } from "@/lib/utils";
import { useMouse } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import React, { useState } from "react";
const Text = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { className, ...rest } = props;
  return (
    <p className={cn("text-4xl max-w-[500px]", className)} {...rest}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      <span className="text-red-500">adipisicing elit.</span>
    </p>
  );
};

const Page = () => {
  const [mouse] = useMouse();
  const [isHover, setIsHover] = useState(false);
  const size = isHover ? 300 : 100;
  return (
    <div className="size-full flex flex-col justify-center items-center">
      <motion.div
        animate={{
          WebkitMaskPosition: `${mouse.x - size / 2}px ${mouse.y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.5,
        }}
        id="mark"
        className="absolute inset-0 text-4xl flex justify-center items-center"
        style={{
          maskImage: "url('/circle.svg')",
          background: "orange",
          maskSize: `${size}px`,
          maskRepeat: "no-repeat",
        }}
      >
        <Text
          className="text-black"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        />
      </motion.div>

      <Text />
    </div>
  );
};

export default Page;
