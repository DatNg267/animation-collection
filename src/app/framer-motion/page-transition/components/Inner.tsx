"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { PropsWithChildren } from "react";
const Inner = (props: PropsWithChildren) => {
  return (
    <>
      <header className="bg-pink-400">
        <nav>
          <ul className="flex flex-row justify-between items-center">
            <Link href={"/framer-motion/page-transition/home"}>Home</Link>
            <Link href={"/framer-motion/page-transition/about"}>About</Link>
            <Link href={"/framer-motion/page-transition/contact"}>Contact</Link>
          </ul>
        </nav>
      </header>
      <motion.div
        key={"slide"}
        initial={{
          top: "100%",
        }}
        animate={{
          top: "100%",
        }}
        exit={{
          top: 0,
          transition: {
            duration: 1.5,
          },
        }}
        className="bg-red-500 fixed top-0 left-0 w-dvw h-dvh"
      ></motion.div>
      <motion.div
        key={"content"}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1,
          },
        }}
        exit={{}}
      >
        {props.children}
      </motion.div>
    </>
  );
};

export default Inner;
