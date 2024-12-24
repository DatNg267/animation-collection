"use client";
import React, { HTMLAttributes, PropsWithChildren } from "react";

const List = ({
  children,
  ...props
}: PropsWithChildren & HTMLAttributes<HTMLUListElement>) => {
  return (
    <ul {...props} className="flex flex-col gap-4">
      {children}
    </ul>
  );
};

export default List;
