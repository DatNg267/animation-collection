import React from "react";

type Props = {};

const Text = (props: Props) => {
  return (
    <div className="absolute inset-0 size-full bg-white flex flex-col text-lg justify-center uppercase items-start leading-tight">
      <div className=" font-[5rem] text-black">
        <p>DAT NGUYEN</p>
        <p className="self-end">DAT NGUYEN</p>
        <p>DAT NGUYEN</p>
        <p className="self-end">DAT NGUYEN</p>
      </div>
    </div>
  );
};

export default Text;
