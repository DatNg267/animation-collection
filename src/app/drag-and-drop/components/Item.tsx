"use client";
import React, { HTMLAttributes } from "react";
import { Task } from "../without-library/page";

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
    <>
      {!isActive && (
        <div
          className="h-2 bg-white w-full"
          style={{
            display: isActiveDragOver ? "block" : "none",
          }}
        ></div>
      )}
      <li
        className="min-h-20 border border-red-500 cursor-pointer"
        {...props}
        draggable
      >
        <p>{task.name}</p>
        <p>{task.status}</p>
      </li>
    </>
  );
};

export default Item;
