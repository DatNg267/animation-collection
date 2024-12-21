import Lenis from "lenis";
import { useEffect } from "react";

export const useSmoothScroll = () => {
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
};
