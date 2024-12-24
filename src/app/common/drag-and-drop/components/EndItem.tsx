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
    <div>
      <div
        className="h-2 bg-white w-full"
        style={{
          visibility: isActiveDragOver ? "visible" : "hidden",
        }}
      ></div>
      <li
        className="min-h-20  cursor-pointer"
        {...props}
        draggable={false}
      ></li>
    </div>
  );
};

export default EndItem;
