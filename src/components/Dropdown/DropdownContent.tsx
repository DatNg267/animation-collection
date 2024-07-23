/* eslint-disable react/display-name */
import { motion } from "framer-motion";
import { forwardRef, HTMLAttributes, RefObject } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {};

const DropdownContent = forwardRef<HTMLDivElement, Props>(
  (props: Props, ref) => {
    return (
      <motion.div ref={ref} {...props}>
        {props.children}
      </motion.div>
    );
  }
);

export default DropdownContent;
