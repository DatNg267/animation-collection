"use client";
import { motion, Variant } from "framer-motion";
import { init } from "next/dist/compiled/webpack/webpack";
import React from "react";

type Props = {};

const textVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const letterVariants = {
  initial: {
    y: "100px",
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
      initial="initial"
      animate="animate"
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={letterVariants}
          key={letter + index}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const lineVariants = {
  initial: {
    x: "0%",
  },
  animate: {
    x: "-100%",
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "easeOut",
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};
const Page = (props: Props) => {
  return (
    <div className="size-full flex items-center justify-center">
      <div className="w-full flex flex-row whitespace-nowrap">
        <motion.div
          className="flex flex-row bg-red-500 "
          variants={lineVariants}
          initial="initial"
          animate="animate"
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
          variants={lineVariants}
          initial="initial"
          animate="animate"
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
