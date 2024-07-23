import React, { RefObject, useEffect } from "react";
import DropdownContent from "./DropdownContent";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";

type Props = {};

export const DropdownContext = React.createContext({
  isOpen: false,
  handleOnChange: (value: boolean) => {},
});

const ARR = [1, 2, 3, 4, 5];
const DropdownCustom = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const listItemRef = React.useRef<Map<number, HTMLElement>>(new Map());
  const handleOnChange = (value: boolean) => {
    console.log(value);
    setIsOpen(value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      event.stopPropagation();
      console.log({ event: event.target });
      console.log({ contentRef: contentRef.current });
      if (contentRef && contentRef.current) {
        const mousePos = {
          x: event.clientX,
          y: event.clientY,
        };

        const contentRect = contentRef.current.getBoundingClientRect();

        if (
          mousePos.x < contentRect.left ||
          mousePos.x > contentRect.right ||
          mousePos.y < contentRect.top ||
          mousePos.y > contentRect.bottom
        ) {
          setIsOpen(false);
        } else {
          console.log({ mousePos });
          listItemRef.current.forEach((ref, key) => {
            const itemRect = ref?.getBoundingClientRect();
            if (!itemRect) {
              return;
            }
            if (
              mousePos.x < itemRect.left ||
              mousePos.x > itemRect.right ||
              mousePos.y < itemRect.top ||
              mousePos.y > itemRect.bottom
            ) {
            } else {
              ref.click();
              setIsOpen(false);
            }
          });
          console.log("inside");
        }
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.pointerEvents = "none";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.pointerEvents = "auto";
      document.body.style.overflow = "auto";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const positionRef = React.useRef<{
    top: number;
    left: number;
    width: number;
  }>({
    top: 0,
    left: 0,
    width: 0,
  });

  const handleCalculatePosition = () => {
    if (triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();

      const top = triggerRect.bottom;
      const left = triggerRect.left;
      const width = triggerRect?.width || 0;
      console.log({
        top,
        left,
        width,
      });
      positionRef.current = { top, left, width };
    }
  };

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        handleOnChange,
      }}
    >
      <div className="flex items-center justify-center">
        <button
          ref={triggerRef}
          onClick={() => {
            if (!isOpen) {
              handleCalculatePosition();
            }
            setIsOpen(!isOpen);
          }}
          className="bg-red-500 text-white cursor-pointer p-10"
        >
          button trigger dropdown
        </button>
        {isOpen &&
          createPortal(
            <DropdownContent
              ref={contentRef}
              className="fixed top-0  pointer-events-auto left-0 bg-white z-50 rounded-sm text-black"
              initial={{
                opacity: 0,
                y: positionRef.current.top,
                x: positionRef.current.left,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                y: positionRef.current.top,
                x: positionRef.current.left,
                scale: 1,
              }}
              exit={{ opacity: 0 }}
              style={{
                transform: `translate(${positionRef.current.left}px, ${positionRef.current.top}px)`,
                width: `${positionRef.current.width}px`,
              }}
            >
              <div className="flex flex-col p-2">
                {ARR.map((item) => (
                  <div
                    key={item}
                    className="p-2 hover:bg-slate-400 cursor-pointer"
                    onClick={() => {
                      console.log("clicked", item);
                    }}
                    ref={(el) => {
                      if (el) {
                        listItemRef.current.set(item, el);
                      }
                    }}
                  >
                    Dropdown item
                  </div>
                ))}
              </div>
            </DropdownContent>,
            document.body
          )}
      </div>
    </DropdownContext.Provider>
  );
};

export default DropdownCustom;
