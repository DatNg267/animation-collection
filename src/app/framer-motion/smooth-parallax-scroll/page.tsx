/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { images } from "@/assets/image";
import { useSmoothScroll } from "@/hooks/smooth-scroll";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  m,
  motion,
  MotionValue,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { use, useRef } from "react";

type Props = {};
const listImages = [
  images.image1,
  images.image2,
  images.image3,
  images.image14,
  images.image13,
];
const SmoothParallaxScroll = (props: Props) => {
  useSmoothScroll();

  const containerScrollRef = useRef<HTMLDivElement>(null);
  const { height } = useWindowSize();
  console.log({ height });
  const { scrollYProgress } = useScroll({
    target: containerScrollRef,
    offset: ["start end", "end start"],
  });

  scrollYProgress.on("change", (v) => {
    console.log({ v });
  });

  return (
    <div className="">
      <section className="h-screen"></section>
      <section
        className="h-[175vh] bg-blue-500  overflow-hidden"
        ref={containerScrollRef}
      >
        <div className="flex flex-row gap-3 overflow-hidden">
          <Column
            srcs={listImages}
            scrollYProgress={scrollYProgress}
            acceleration={2}
          />
          <Column
            srcs={listImages}
            scrollYProgress={scrollYProgress}
            acceleration={3.3}
          />
          <Column
            srcs={listImages}
            scrollYProgress={scrollYProgress}
            acceleration={1.25}
          />
          <Column
            srcs={listImages}
            scrollYProgress={scrollYProgress}
            acceleration={3}
          />
        </div>
      </section>
      <section className="h-screen"></section>
    </div>
  );
};

const Column = ({
  srcs = [],
  scrollYProgress = useMotionValue(0),
  acceleration = 1,
  direction = "up",
}: {
  srcs: string[];
  scrollYProgress?: MotionValue<number>;
  acceleration?: number;
  direction?: "up" | "down";
}) => {
  const { height } = useWindowSize();
  const windowHeight = height || 900;

  const initTransformY = useMotionValue(windowHeight * 2 * -1);
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, windowHeight * acceleration]
  );

  return (
    <motion.div className="flex-1 flex flex-col h-full " style={{ y: y }}>
      <motion.div
        className="flex-1 flex flex-col items-center justify-center h-full gap-4"
        style={{
          y: initTransformY,
        }}
      >
        {[...srcs, ...srcs].map((src, i) => (
          <Item key={i} src={src} />
        ))}
      </motion.div>
    </motion.div>
  );
};

const Item = ({ src }: { src: string }) => {
  return (
    <motion.div className="w-full h-[360px] relative rounded-md overflow-hidden">
      <Image fill src={src} alt={src} objectFit="true" />
    </motion.div>
  );
};

export default SmoothParallaxScroll;
