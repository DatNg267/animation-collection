import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect } from "react";

type Props = {};

const MotionValueExample = (props: Props) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 10,
      ease: "easeInOut",
    });

    return () => controls.stop();
  }, []);

  return <motion.div>{rounded}</motion.div>;
};

export default MotionValueExample;
