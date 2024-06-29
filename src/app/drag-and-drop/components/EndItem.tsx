"use client";
import { HTMLAttributes } from "react";

type Props = {
  isActiveDragOver: boolean;
};

const EndItem = ({
  isActiveDragOver,
  ...props
}: Props & HTMLAttributes<HTMLLIElement>) => {
  return (
    <>
      <div
        className="h-2 bg-white w-full"
        style={{
          display: isActiveDragOver ? "block" : "none",
        }}
      ></div>
      <li
        className="min-h-20 border border-blue-500 cursor-pointer"
        {...props}
        draggable={false}
      ></li>
    </>
  );
};

export default EndItem;
