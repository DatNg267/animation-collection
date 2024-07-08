// import {
//   Profiler as ReactProfiler,
//   ProfilerOnRenderCallback,
//   ProfilerProps,
// } from "react";

// const onRenderCallback: ProfilerOnRenderCallback = (
//   id: any,
//   phase: any,
//   actualDuration: any,
//   baseDuration: any,
//   startTime: any,
//   commitTime: any,
//   interactions: any,
//   root: any,
//   lanes: any
// ) => {
//   // Log performance data
//   console.log(`Component ${id} took ${actualDuration}ms to render`);
// };

// export const Profiler: React.FC<Omit<ProfilerProps, "onRender">> = ({
//   children,
//   ...props
// }) => {
//   <ReactProfiler onRender={onRenderCallback as any} {...props}>
//     {children}
//   </ReactProfiler>;
// };
