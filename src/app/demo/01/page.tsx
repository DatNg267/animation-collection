"use client";
import { motion, Variant } from "framer-motion";
import React from "react";

type Props = {};

const textVariants = {
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.2,
    },
  },
};

const letterVariants = {
  hidden: {
    y: "200px",
  },
  animate: {
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};
const Text = ({ children }: { children: string }) => {
  const letters = children.split("");
  return (
    <motion.span
      className="text-4xl font-medium"
      variants={textVariants}
      animate="animate"
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={letterVariants}
          initial="hidden"
          animate="animate"
          transition={{
            duration: 1,
          }}
          key={index}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
};
const Page = (props: Props) => {
  return (
    <div className="size-full flex items-center justify-center">
      <div className="w-full flex flex-row whitespace-nowrap">
        <motion.div
          className="flex flex-row bg-red-500 "
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Text>Đoạn text 1</Text>
          <Text>Đoạn text 2</Text>
          <Text>Đoạn text 3</Text>
          <Text>Đoạn text 4</Text>
          <Text>Đoạn text 1</Text>
          <Text>Đoạn text 2</Text>
          <Text>Đoạn text 3</Text>
          <Text>Đoạn text 4</Text>
        </motion.div>
        <motion.div
          className="flex flex-row bg-blue-500 "
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Text>Đoạn text 1</Text>
          <Text>Đoạn text 2</Text>
          <Text>Đoạn text 3</Text>
          <Text>Đoạn text 4</Text>
          <Text>Đoạn text 1</Text>
          <Text>Đoạn text 2</Text>
          <Text>Đoạn text 3</Text>
          <Text>Đoạn text 4</Text>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
