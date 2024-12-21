"use client";
import { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return <div className="w-full h-dvh bg-black ">{children}</div>;
}

export default Layout;
