"use client";

import { AnimatePresence } from "framer-motion";
import React, { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return <div className="w-dvw h-dvh bg-black">{children}</div>;
}

export default Layout;
