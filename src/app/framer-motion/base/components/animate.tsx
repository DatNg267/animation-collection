/**
 * https://www.framer.com/motion/animation/#variants
 * Setting animate as an object is useful for simple, single-component animations.
 * But sometimes we want to create animations that propagate throughout the DOM,
 * and orchestrate those animations in a declarative way. We can do so with variants.
 */
import { motion, Variants } from "framer-motion";
import React, { useState } from "react";

const ulVariants: Variants = {
  open: {
    clipPath: "inset(0% 0% 0% 0% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: "inset(10% 50% 90% 50% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3,
    },
  },
};
const liVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const SettingAnimateExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="menu"
    >
      <motion.button
        className="flex flex-row justify-between items-center space-x-4"
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>Menu</p>
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 20 20"
            className="fill-white"
          >
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </motion.div>
      </motion.button>
      <motion.ul
        variants={ulVariants}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <motion.li variants={liVariants}>Item 1 </motion.li>
        <motion.li variants={liVariants}>Item 2 </motion.li>
        <motion.li variants={liVariants}>Item 3 </motion.li>
        <motion.li variants={liVariants}>Item 4 </motion.li>
        <motion.li variants={liVariants}>Item 5 </motion.li>
      </motion.ul>
    </motion.nav>
  );
};

export default SettingAnimateExample;
