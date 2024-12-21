"use client";

import { randomImage } from "@/utils";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ParallaxSectionTransitionPage = () => {
  const [images] = useState<string[]>(() =>
    [...Array(2)].map(() => randomImage())
  );

  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    let fameId = 0;
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    fameId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(fameId);
    };
  }, []);

  const Section1 = ({ scrollYProgress }: { scrollYProgress: MotionValue }) => {
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
    return (
      <motion.section
        style={{
          scale: scale,
          rotate: rotate,
        }}
        className="sticky top-0 h-screen bg-blue-400 flex items-center justify-center flex-col"
      >
        <h1>Section 01</h1>
        <Image
          width={200}
          height={100}
          src={images[0]}
          alt="Random Image"
        ></Image>
      </motion.section>
    );
  };

  const Section2 = () => {
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [-10, 0]);
    return (
      <motion.section
        style={{
          scale: scale,
          rotate: rotate,
        }}
        className="sticky top-0 h-screen bg-red-400 flex items-center justify-center flex-col"
      >
        <h1>Section 02</h1>
        <Image
          width={200}
          height={100}
          src={images[1]}
          alt="Random Image"
        ></Image>
      </motion.section>
    );
  };

  return (
    <div className="h-[200vh]" ref={container}>
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 />
    </div>
  );
};

export default ParallaxSectionTransitionPage;
