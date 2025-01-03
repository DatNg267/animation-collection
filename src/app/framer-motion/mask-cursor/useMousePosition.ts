// import React from "react";

// const useMousePosition = ({ includeTouch }: { includeTouch: boolean }) => {
//   const [mousePosition, setMousePosition] = React.useState({
//     x: null,
//     y: null,
//   });

//   React.useEffect(() => {
//     const updateMousePosition = (ev: MouseEvent | TouchEvent) => {
//       let x, y;

//       if ("touches" in ev) {
//         const touch = ev.touches[0];
//         [x, y] = [touch.clientX, touch.clientY];
//       } else {
//         [x, y] = [ev.clientX, ev.clientY];
//       }

//       setMousePosition({ x, y });
//     };

//     window.addEventListener("mousemove", updateMousePosition);

//     if (includeTouch) {
//       window.addEventListener("touchmove", updateMousePosition);
//     }

//     return () => {
//       window.removeEventListener("mousemove", updateMousePosition);

//       if (includeTouch) {
//         window.removeEventListener("touchmove", updateMousePosition);
//       }
//     };
//   }, [includeTouch]);

//   return mousePosition;
// };

// export default useMousePosition;
