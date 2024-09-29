"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { randomInt } from "crypto";
import { AnimatePresence, m, motion } from "framer-motion";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface Item {
  id: number;
  name: string;
  age: number;
}

const data: Item[] = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Smith", age: 25 },
  { id: 3, name: "Bob Johnson", age: 35 },
  { id: 4, name: "Alice Brown", age: 28 },
  { id: 5, name: "Charlie Davis", age: 32 },
];

const Table: React.FC = () => {
  const [items, setItems] = useState<Item[]>(data);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // This is the state of sub key
  const [lastItemSelected, setLastItemSelected] = useState<number>(0);

  // This is the state that determines if we are selecting or not
  const [isSelecting, setIsSelecting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseDownSelectedItem, setIsMouseDownSelectedItem] = useState(false);

  // This is the starting point of the selection
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });

  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // window.addEventListener("dragover", updateMousePosition);
    window.addEventListener("mouseup", () => {
      setIsDragging(false);
    });
    // return () => window.removeEventListener("dragover", updateMousePosition);
  }, []);

  const updateSelectedList = useCallback(
    ({
      startPoint,
      endPoint,
      type,
    }: {
      startPoint: { x: number; y: number };
      endPoint: { x: number; y: number };
      type: "renew" | "ctrl" | "shift";
    }) => {
      const selectionRect = {
        left: Math.min(startPoint.x, endPoint.x),
        top: Math.min(startPoint.y, endPoint.y),
        right: Math.max(startPoint.x, endPoint.x),
        bottom: Math.max(startPoint.y, endPoint.y),
      };

      const findItems = items
        .filter((item) => {
          const element = document.getElementById(`item-${item.id}`);
          if (!element || !tableRef.current) return false;

          const rect = element.getBoundingClientRect();
          const tableRect = tableRef.current.getBoundingClientRect();

          return (
            rect.left < selectionRect.right &&
            rect.right > selectionRect.left &&
            rect.top < selectionRect.bottom &&
            rect.bottom > selectionRect.top &&
            rect.top >= tableRect.top &&
            rect.bottom <= tableRect.bottom
          );
        })
        .map((item) => item.id);

      if (type === "renew") {
        setSelectedItems(findItems);
        setLastItemSelected(findItems[findItems.length - 1]);
      }
      // In-case of ctrl or shift, only one item is selected
      else if (type === "ctrl") {
        const isExist = findItems.every((item) => selectedItems.includes(item));
        if (isExist) {
          setSelectedItems((prev) =>
            prev.filter((item) => !findItems.includes(item))
          );
          setLastItemSelected(findItems[findItems.length - 1]);
        } else {
          setSelectedItems((prev) => [...prev, ...findItems]);
          setLastItemSelected(findItems[findItems.length - 1]);
        }
      } else if (type === "shift") {
        const currentIndex = items.findIndex(
          (item) => item.id === findItems[0]
        )!;
        const lastItemSelectedIndex = items.findIndex(
          (item) => item.id === lastItemSelected
        )!;
        console.log({ lastItemSelected });
        console.log({ currentIndex });

        const start = Math.min(lastItemSelectedIndex, currentIndex);
        const end = Math.max(lastItemSelectedIndex, currentIndex);

        console.log({ start, end });
        const newList = items.slice(start, end + 1).map((item) => item.id);
        setSelectedItems([...newList]);
        setLastItemSelected(newList[newList.length - 1]);
      }
    },
    [items, lastItemSelected, selectedItems]
  );

  useEffect(() => {
    if (!isSelecting) return;

    updateSelectedList({ startPoint, endPoint, type: "renew" });
  }, [isSelecting, startPoint, endPoint, items]);

  const checkMouseDownOnSelectedItem = useCallback(
    (e: React.MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      const selectionRect = {
        left: clientX,
        top: clientY,
        right: clientX,
        bottom: clientY,
      };

      const indexOfItem = selectedItems.findIndex((item) => {
        const element = document.getElementById(`item-${item}`);
        if (!element || !tableRef.current) return false;

        const rect = element.getBoundingClientRect();
        const tableRect = tableRef.current.getBoundingClientRect();

        return (
          rect.left < selectionRect.right &&
          rect.right > selectionRect.left &&
          rect.top < selectionRect.bottom &&
          rect.bottom > selectionRect.top &&
          rect.top >= tableRect.top &&
          rect.bottom <= tableRect.bottom
        );
      });

      console.log({ indexOfItem });
      if (indexOfItem !== -1) {
        setIsMouseDownSelectedItem(true);
        return true;
      } // No item is selected

      setIsMouseDownSelectedItem(false);
      return false;
    },
    [selectedItems]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.ctrlKey) {
        updateSelectedList({
          startPoint: { x: e.clientX, y: e.clientY },
          endPoint: { x: e.clientX, y: e.clientY },
          type: "ctrl",
        });
        return;
      }

      if (e.shiftKey) {
        updateSelectedList({
          startPoint: { x: e.clientX, y: e.clientY },
          endPoint: { x: e.clientX, y: e.clientY },
          type: "shift",
        });
        return;
      }

      if (checkMouseDownOnSelectedItem(e)) {
        setIsSelecting(false);

        return;
      }

      if (e.target instanceof HTMLTableCellElement) {
        if (e.target.draggable) {
          setIsSelecting(false);
        } else {
          setIsSelecting(true);
        }
      } else {
        setIsSelecting(true);
      }
      setStartPoint({ x: e.clientX, y: e.clientY });
      setEndPoint({ x: e.clientX, y: e.clientY });
    },
    [checkMouseDownOnSelectedItem, updateSelectedList]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isSelecting) {
        setEndPoint({ x: e.clientX, y: e.clientY });
      }
    },
    [isSelecting]
  );

  const handleMouseUp = useCallback(
    (e: { clientX: any; clientY: any }) => {
      console.log("handleMouseUp");
      if (isSelecting) {
        setIsSelecting(false);
        setIsDragging(false);
        setIsMouseDownSelectedItem(false);
      } else {
        updateSelectedList({
          startPoint: { x: e.clientX, y: e.clientY },
          endPoint: { x: e.clientX, y: e.clientY },
          type: "renew",
        });
      }
    },
    [isSelecting, updateSelectedList]
  );

  const handleDragStart = useCallback(
    (e: React.DragEvent, itemId: number) => {
      e.dataTransfer.setData("text/plain", selectedItems.toString());
      setIsDragging(true);
      if (isSelecting) {
        setIsSelecting(false);
      }
    },
    [isSelecting, selectedItems]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetId: number) => {
      console.log("handleDrop");
      e.preventDefault();
      setIsMouseDownSelectedItem(false);
      setIsDragging(false);
      const draggedId = parseInt(e.dataTransfer.getData("text/plain"), 10);
      const draggedIndex = items.findIndex((item) => item.id === draggedId);
      const targetIndex = items.findIndex((item) => item.id === targetId);

      if (draggedIndex === targetIndex) return;

      const newItems = [...items];
      const [reorderedItem] = newItems.splice(draggedIndex, 1);
      newItems.splice(targetIndex, 0, reorderedItem);

      setItems(newItems);

      setSelectedItems([]);
    },
    [items]
  );

  return (
    <div
      ref={tableRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDrop={() => {
        console.log("drop");
        setIsDragging(false);
      }}
      onDragOver={handleDragOver}
      className="h-full p-20"
      style={{ userSelect: "none" }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const [initial, setInitial] = useState({ x: 0, y: 0 });
            const isSelecting = selectedItems.includes(item.id);
            useLayoutEffect(() => {
              if (!isSelecting) return;
              const element = document.getElementById(`item-${item.id}`)!;
              console.log({
                x: element?.getBoundingClientRect().x,
                y: element?.getBoundingClientRect().y,
              });
              setInitial({
                x: element?.getBoundingClientRect().x,
                y: element?.getBoundingClientRect().y,
              });
            }, [isSelecting, item.id]);

            return (
              <tr
                onClick={() => {
                  console.log("clicked");
                }}
                onDoubleClick={() => {
                  console.log("double clicked");
                }}
                key={item.id}
                onDragOver={handleDragOver}
                id={`item-${item.id}`}
                style={{
                  backgroundColor: selectedItems.includes(item.id)
                    ? "green"
                    : "transparent",
                }}
              >
                <td
                  className=" border border-white"
                  draggable={
                    selectedItems.includes(item.id) &&
                    (!isSelecting || isMouseDownSelectedItem)
                  }
                  onDragStart={(e) => handleDragStart(e, item.id)}
                >
                  {item.id}
                </td>
                <td
                  onDrop={(e) => handleDrop(e, item.id)}
                  draggable={selectedItems.includes(item.id)}
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  className=" border border-white w-40"
                >
                  {item.name}
                </td>
                <td
                  className=" border border-white"
                  draggable={
                    selectedItems.includes(item.id) &&
                    (!isSelecting || isMouseDownSelectedItem)
                  }
                  onDragStart={(e) => handleDragStart(e, item.id)}
                >
                  {item.age}
                </td>
                <AnimatePresence>
                  {isDragging && selectedItems.includes(item.id) && (
                    <motion.td
                      layout
                      layoutId={item.id.toString()}
                      key={item.id}
                      initial={{
                        width: "100%",
                        left: initial.x,
                        top: initial.y,
                      }}
                      animate={{
                        width: 100,
                        left: mousePosition.x,
                        top: mousePosition.y,
                      }}
                      exit={{ width: "100%", left: initial.x, top: initial.y }}
                      transition={{ duration: 0.2 }}
                      style={{
                        backgroundColor: "red",
                        opacity: 0.2,
                        zIndex: 100,
                        pointerEvents: "none",
                      }}
                      className={"h-[27px] fixed  bg-red-500 opacity-50"}
                    >
                      {item.name}
                    </motion.td>
                  )}
                </AnimatePresence>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isSelecting && (
        <div
          style={{
            position: "absolute",
            border: "1px solid blue",
            backgroundColor: "rgba(0, 0, 255, 0.1)",
            left: Math.min(startPoint.x, endPoint.x),
            top: Math.min(startPoint.y, endPoint.y),
            width: Math.abs(endPoint.x - startPoint.x),
            height: Math.abs(endPoint.y - startPoint.y),
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};

export default Table;
