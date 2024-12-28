"use client";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { set } from "react-hook-form";

type Props = {};
const chars =
  "!<>-_\\/[]{}—=+*^?#________abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

const defaultString = [
  "Welcome to Framer Motion Page",
  "Text Scramble Effect",
  "React",
];
const randomString = (targetLength: number) => {
  // random string min length 20 , max length 40
  const str = Array.from({ length: targetLength })
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");

  return str;
};
const ANIMATION_FRAME = 20;
const TextScramble = () => {
  const [text, setText] = React.useState("");
  const nextTextRef = React.useRef(defaultString[1]);
  const currentTextRef = React.useRef(defaultString[0]);
  const [startRandom, setStartRandom] = React.useState(true);
  useEffect(() => {
    let interval: any;
    let timeout: any;
    if (!startRandom) {
      return;
    }

    timeout = setTimeout(() => {
      clearInterval(interval);
      setText(nextTextRef.current);
      currentTextRef.current = nextTextRef.current;
      nextTextRef.current =
        defaultString[
          (defaultString.indexOf(nextTextRef.current) + 1) %
            defaultString.length
        ];
      setStartRandom(false);
    }, 400);

    const spaceLength =
      currentTextRef.current.length - nextTextRef.current.length;

    const perTextOneAnimationFrame = 1 * (spaceLength > 0 ? -1 : 1);
    console.log(
      `######################################
      ${currentTextRef.current.length} - ${nextTextRef.current.length} = ${spaceLength}`
    );
    interval = setInterval(() => {
      setText((prev) => {
        console.log({
          prev,
          isEnd:
            prev.length + perTextOneAnimationFrame - nextTextRef.current.length,
        });
        let resLength = 0;
        if (prev.length === nextTextRef.current.length) {
          resLength = nextTextRef.current.length;
        } else if (prev.length === currentTextRef.current.length) {
          resLength = currentTextRef.current.length + perTextOneAnimationFrame;
        } else {
          if (
            prev.length +
              perTextOneAnimationFrame -
              nextTextRef.current.length ===
            0
          ) {
            console.log({
              res:
                prev.length +
                perTextOneAnimationFrame -
                nextTextRef.current.length,
            });
            resLength = nextTextRef.current.length;
          } else {
            resLength = prev.length + perTextOneAnimationFrame;
          }
        }
        // console.log({ resLength });
        return randomString(resLength);
      });
    }, ANIMATION_FRAME);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [startRandom]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStartRandom(true);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <motion.div>{text}</motion.div>;
};
const Page = (props: Props) => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <TextScramble />
    </div>
  );
};

export default Page;
