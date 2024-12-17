"use client";
import React, { use, useEffect } from "react";

type Props = {};

const Page = (props: Props) => {
  const animationFrameId = React.useRef<number | null>(null);
  const handleScroll = () => {
    console.log({ window });
    const targetPosition = 1000;
    let currentPosition = window.scrollY;

    function step() {
      currentPosition += (targetPosition - currentPosition) * 0.05; // Hiệu ứng easing
      window.scrollTo(0, currentPosition);
      console.log({
        currentPosition,
        targetPosition,
      });
      if (Math.abs(currentPosition - targetPosition) > 0.5) {
        animationFrameId.current = requestAnimationFrame(step); // Tiếp tục cuộn
      } else {
        console.log("Cancel animation frame");
        cancelAnimationFrame(animationFrameId.current!);
      }
    }

    animationFrameId.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);
  return (
    <div>
      <button onClick={handleScroll}>scroll to 5000px</button>
      <section className="h-screen bg-blue-500"></section>
      <section className="h-screen bg-red-500"></section>
      <section className="h-screen bg-yellow-500"></section>
      <section className="h-screen bg-green-500"></section>
      <section className="h-screen"></section>
      <section className="h-screen"></section>
      <section className="h-screen"></section>
    </div>
  );
};

export default Page;
