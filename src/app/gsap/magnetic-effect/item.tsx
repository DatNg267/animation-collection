import gsap from "gsap";
import React, { useEffect, useRef } from "react";

const Item = () => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      const item = elementRef.current;
      if (!item) return;

      const { clientX, clientY } = e;
      const itemRect = item.getBoundingClientRect();
      const suggestX = clientX - itemRect.left - itemRect.width / 2;
      const suggestY = clientY - itemRect.top - itemRect.height / 2;

      gsap.to(item, { x: suggestX, y: suggestY });
    };

    const mouseleave = (e: MouseEvent) => {
      gsap.to(elementRef.current, { x: 0, y: 0 });
    };
    if (elementRef.current) {
      elementRef.current.addEventListener("mousemove", mouseMove);
      elementRef.current.addEventListener("mouseleave", mouseleave);
    }

    return () => {
      if (elementRef.current) {
        elementRef.current.removeEventListener("mousemove", mouseMove);
        elementRef.current.removeEventListener("mouseleave", mouseleave);
      }
    };
  }, [elementRef]);

  return (
    <div className=" m-20">
      <div ref={elementRef} className="w-20 h-20 p-10 bg-white">
        ITEM
      </div>
    </div>
  );
};

export default Item;
