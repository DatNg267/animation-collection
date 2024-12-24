"use client";
import React from "react";
import { DndContext } from "@dnd-kit/core";

import Draggable from "./Draggable";
import Droppable from "./Droppable";

type Props = {};
const ARR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const page = (props: Props) => {
  return (
    <div>
      <DndContext>
        <Draggable />
        <Droppable />
      </DndContext>
    </div>
  );
};

export default page;
