import { useDraggable } from "@dnd-kit/core";
import React, { PropsWithChildren } from "react";
import { CSS } from "@dnd-kit/utilities";

const Draggable = (props: PropsWithChildren) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="w-20 h-10 bg-red-700 text-black"
    >
      {props.children}
    </button>
  );
};

export default Draggable;
