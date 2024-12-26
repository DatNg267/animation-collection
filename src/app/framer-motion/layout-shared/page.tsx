"use client";
import { motion } from "framer-motion";
import React from "react";

type Props = {};

const Loading = () => {
  return <div>Loading...</div>;
};

const Page = (props: Props) => {
  const [focused, setFocused] = React.useState<number | null>(null);
  const [selected, setSelected] = React.useState<number>(0);
  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      onMouseLeave={() => setFocused(null)}
    >
      <div className="flex flex-row p-4 rounded-lg border gap-4">
        {new Array(4).fill(0).map((_, index) => (
          <div
            key={index}
            className="rounded-lg px-4 py-2 relative cursor-pointer"
            onFocus={() => setFocused(index)}
            onMouseEnter={() => setFocused(index)}
            onClick={() => setSelected(index)}
          >
            {focused === index && (
              <motion.div
                layoutId="backdrop"
                className="absolute inset-0 z-1 bg-gray-800 rounded-sm"
                transition={{ duration: 0.4, ease: "backOut" }}
              />
            )}
            <p className="relative z-50">Item {index}</p>
            {selected === index && (
              <motion.div
                layoutId="underline"
                className="h-[4px] w-full bg-red-900 z-100 relative"
              ></motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
