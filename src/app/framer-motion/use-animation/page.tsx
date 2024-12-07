"use client";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";

type Props = {};

const Page = (props: Props) => {
  const controls = useAnimation();

  const startAnimation = async () => {
    await controls.start({ x: 100 });
    await controls.start({ y: 100 });
    await controls.start({ rotate: 180 });
  };

  useEffect(() => {
    console.log({ controls });
  }, [controls]);

  return (
    <>
      <motion.div animate={controls} className="w-96 h-48 bg-yellow-500" />
      <button onClick={startAnimation}>Animate</button>
    </>
  );
};

export default Page;
