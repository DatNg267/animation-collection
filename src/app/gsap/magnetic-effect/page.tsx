"use client";
import React from "react";
import Item from "./item";

type Props = {};

const ITEM_LENGTH = 5;
const MagneticEffect = (props: Props) => {
  return (
    <div>
      {new Array(ITEM_LENGTH).fill(0).map((_, index) => (
        <Item key={index}></Item>
      ))}
    </div>
  );
};

export default MagneticEffect;
