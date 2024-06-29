"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import useMousePosition from "./useMousePosition";
import { motion } from "framer-motion";

const MaskCursor = () => {
  const { x, y } = useMousePosition();
  const [isHovered, setIsHovered] = useState(false);

  const size = isHovered ? 400 : 40;

  return (
    <div className={styles.main}>
      <motion.div
        className={styles.mask}
        animate={{
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <p
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        </p>
      </motion.div>
      <div className={styles.body}>
        <p>
          Lorem ipsum dolor sit, <span>amet consectetur</span> adipisicing elit.
          Voluptate
        </p>
      </div>
    </div>
  );
};

export default MaskCursor;
