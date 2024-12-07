"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useMouse } from "@uidotdev/usehooks";
import { motion } from "framer-motion";

const MaskCursor = () => {
  const [mouse] = useMouse();
  const [isHovered, setIsHovered] = useState(false);

  const size = isHovered ? 400 : 40;

  return (
    <div className={styles.main}>
      <motion.div
        className={styles.mask}
        animate={{
          WebkitMaskPosition: `${mouse.x - size / 2}px ${mouse.y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut" }}
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
