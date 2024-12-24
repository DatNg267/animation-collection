"use client";
import React, { HTMLAttributes } from "react";
import { Task } from "../without-library/page";
import { motion } from "framer-motion";

type Props = {
  task: Task;
  isActiveDragOver: boolean;

  isActive: boolean;
};

const Item = ({
  task,
  isActiveDragOver,
  isActive,
  ...props
}: Props & HTMLAttributes<HTMLLIElement>) => {
  return (
    <div>
      <div
        className="h-2 bg-white w-full"
        style={{
          visibility: isActiveDragOver ? "visible" : "hidden",
        }}
      ></div>
      <motion.li
        layout
        layoutId={task.name}
        className="min-h-20 border border-red-500 cursor-pointer"
        draggable
        {...props}
      >
        <p>{task.name}</p>
        <p>{task.status}</p>
      </motion.li>
    </div>
  );
};

export default Item;
