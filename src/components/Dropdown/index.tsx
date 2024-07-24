import React, { RefObject, useEffect, useRef } from "react";
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
  const [position, setPosition] = React.useState<{
    top: number;
    left: number;
    width: number;
    scale: number;
  }>({
    top: 0,
    left: 0,
    width: 0,
    scale: 1,
  });

  const cacheViewport = useRef<string>();
  const scrollbarWidth = useRef(0);
  const handleOnChange = (value: boolean) => {
    console.log(value);
    setIsOpen(value);
  };

  const handleCalculatePosition = () => {
    if (triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();

      const scale = window.innerWidth / window.outerWidth;
      console.log({
        windInnerWith: window.innerWidth,
        docElemClientWidth: document.documentElement.clientWidth,
      });
      console.log({ scale });
      console.log({ triggerRect });
      const top = triggerRect.bottom;
      const left = triggerRect.left;
      const width = triggerRect?.width || 0;

      setPosition({ top, left, width, scale });
    }
  };

  const handleResetBodyStyle = () => {
    document.body.style.pointerEvents = "auto";
    document.body.style.overflow = "auto";
    document.body.style.marginRight = "0px";

    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      if (cacheViewport.current) {
        viewportMeta.setAttribute("content", cacheViewport.current);
      } else {
        viewportMeta.setAttribute(
          "content",
          "width=device-width, initial-scale=1"
        );
      }
    }
  };

  const handleOpenDropdown = () => {
    scrollbarWidth.current =
      window.innerWidth - document.documentElement.clientWidth;
    // Select the meta tag with the name attribute 'viewport'
    const viewportMeta = document.querySelector(
      'meta[name="viewport"]'
    ) as HTMLMetaElement;
    if (viewportMeta) {
      console.log({
        viewportMeta,
      });
      cacheViewport.current = viewportMeta.content ?? "";
      console.log({
        viewportMetaContent: viewportMeta.content,
      });
      viewportMeta.setAttribute(
        "content",
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      );
    } else {
      const newViewportMeta = document.createElement("meta");
      newViewportMeta.name = "viewport";
      newViewportMeta.content =
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
      document.head.appendChild(newViewportMeta);
    }

    document.body.style.marginRight = `${scrollbarWidth.current}px`;
    document.body.style.pointerEvents = "none";
    document.body.style.overflow = "hidden";

    handleCalculatePosition();
  };

  const handleWindowResize = (e: Event) => {
    console.log({ e });
    handleCalculatePosition();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      event.stopPropagation();
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
          handleResetBodyStyle();
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
              handleResetBodyStyle();
              setIsOpen(false);
            }
          });
          console.log("inside");
        }
      }
    };
    if (isOpen) {
      window.addEventListener("resize", handleWindowResize);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
              handleOpenDropdown();
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
                y: position.top,
                x: position.left,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                y: position.top,
                x: position.left,
                scale: 1,
              }}
              transition={{}}
              exit={{ opacity: 0 }}
              style={{
                transform: `translate(${position.left}px, ${position.top}px) scale(${position.scale})`,
                width: `${position.width}px`,
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
