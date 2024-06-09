"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import FrozenRouter from "./components/frozend";

const Layout = (props: PropsWithChildren) => {
  const pathname = usePathname();
  return (
    <>
      <main className="h-full bg-slate-400">
        <AnimatePresence>
          <motion.div key={pathname}>
            <FrozenRouter>{props.children}</FrozenRouter>
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
};

export default Layout;
