"use client";

import { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return <div className="w-dvw h-dvh bg-black">{children}</div>;
}

export default Layout;
