import React, { PropsWithChildren } from "react";
import { useDroppable } from "@dnd-kit/core";

const Droppable = (props: PropsWithChildren) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const style = {
    backgroundColor: isOver ? "green" : undefined,
  };
  console.log({ isOver });
  return (
    <div ref={setNodeRef} style={style} className="w-40 h-10 bg-yellow-600">
      {props.children}
    </div>
  );
};

export default Droppable;
