"use client";
import { useId, useRef, useState } from "react";
import EndItem from "../components/EndItem";
import Item from "../components/Item";
import List from "../components/List";
import { TODO_LIST } from "../constant";
import { motion } from "framer-motion";

export type Task = {
  id: number;
  name: string;
  status: "open" | "done" | "in-progress";
};

function moveItemInArray(arr: any[], fromIndex: number, toIndex: number) {
  const itemToMove = arr.splice(fromIndex, 1)[0];
  arr.splice(toIndex, 0, itemToMove);

  return arr;
}

const Page = () => {
  const endTaskInProgressId = useId();
  const endTaskDoneId = useId();
  const endTaskOpenId = useId();

  const listEndTaskId = [endTaskInProgressId, endTaskDoneId, endTaskOpenId];

  const [todoList, setTodo] = useState<Task[]>(TODO_LIST);

  const doneList: Task[] = todoList.filter((task) => task.status === "done");
  const openList: Task[] = todoList.filter((task) => task.status === "open");
  const inProgressList: Task[] = todoList.filter(
    (task) => task.status === "in-progress"
  );

  const [dragOverTask, setDragOverTask] = useState<string | null>(null);
  const [dragItemTask, setDragItemTask] = useState<string | null>(null);

  const onDragStart = (
    event: React.DragEvent<HTMLLIElement>,
    taskName: string
  ) => {
    setDragItemTask(taskName);
  };
  const onDragEnd = (event: React.DragEvent<HTMLLIElement>) => {
    if (dragOverTask === dragItemTask) return;
    if (!dragOverTask) return;

    let newStatus =
      todoList.find((task) => task.name === dragOverTask)?.status ?? "open";
    if (listEndTaskId.includes(dragOverTask)) {
      switch (dragOverTask) {
        case endTaskInProgressId:
          newStatus = "in-progress";
          break;
        case endTaskDoneId:
          newStatus = "done";
          break;
        case endTaskOpenId:
          newStatus = "open";
          break;
        default:
          newStatus = "open";
          break;
      }
      const newTaskList = todoList.map((task) => {
        if (task.name === dragItemTask) {
          return {
            ...task,
            status: newStatus,
          };
        }
        return task;
      });
      const fromIndex = newTaskList.findIndex(
        (task) => task.name === dragItemTask
      );

      const toIndex =
        dragOverTask === endTaskOpenId
          ? openList.length
          : dragOverTask === endTaskInProgressId
          ? openList.length + inProgressList.length - 1
          : todoList.length;
      if (fromIndex > toIndex) {
        const newList = moveItemInArray(newTaskList, fromIndex, toIndex);
        setTodo([...newList]);
      } else {
        const newList = moveItemInArray(newTaskList, fromIndex, toIndex - 1);
        setTodo([...newList]);
      }
      setDragOverTask(null);
      setDragItemTask(null);
    }

    const newTaskList = todoList.map((task) => {
      if (task.name === dragItemTask) {
        return {
          ...task,
          status: newStatus,
        };
      }
      return task;
    });

    const fromIndex = newTaskList.findIndex(
      (task) => task.name === dragItemTask
    );

    const toIndex = newTaskList.findIndex((task) => task.name === dragOverTask);

    if (fromIndex > toIndex) {
      const newList = moveItemInArray(newTaskList, fromIndex, toIndex);
      setTodo([...newList]);
    } else {
      const newList = moveItemInArray(newTaskList, fromIndex, toIndex - 1);
      setTodo([...newList]);
    }

    setDragOverTask(null);
    setDragItemTask(null);
  };

  const onDragOver = (
    event: React.DragEvent<HTMLLIElement>,
    taskName: string
  ) => {
    setDragOverTask(taskName);
  };
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef}>
      <h1>Drag and Drop without Library</h1>
      <div className="container mt-20">
        <div className="grid grid-cols-3 gap-5">
          <List>
            {openList.map((task, index) => (
              <Item
                isActive={dragItemTask === task.name}
                isActiveDragOver={dragOverTask === task.name}
                key={task.name}
                task={task}
                onDragEnd={onDragEnd}
                onDragOver={(e) => onDragOver(e, task.name)}
                onDragStart={(event) => onDragStart(event, task.name)}
              ></Item>
            ))}
            <EndItem
              isActiveDragOver={dragOverTask === endTaskOpenId}
              onDragOver={(e) => onDragOver(e, endTaskOpenId)}
            ></EndItem>
          </List>
          <List>
            {inProgressList.map((task, index) => (
              <Item
                isActive={dragItemTask === task.name}
                isActiveDragOver={dragOverTask === task.name}
                key={task.name}
                task={task}
                onDragEnd={onDragEnd}
                onDragOver={(e) => onDragOver(e, task.name)}
                onDragStart={(event) => onDragStart(event, task.name)}
              ></Item>
            ))}

            <EndItem
              isActiveDragOver={dragOverTask === endTaskInProgressId}
              onDragOver={(e) => onDragOver(e, endTaskInProgressId)}
            ></EndItem>
          </List>
          <List>
            {doneList.map((task, index) => (
              <Item
                isActive={dragItemTask === task.name}
                isActiveDragOver={dragOverTask === task.name}
                key={task.name}
                task={task}
                onDragEnd={onDragEnd}
                onDragOver={(e) => onDragOver(e, task.name)}
                onDragStart={(event) => onDragStart(event, task.name)}
              ></Item>
            ))}

            <EndItem
              isActiveDragOver={dragOverTask === endTaskDoneId}
              onDragOver={(e) => onDragOver(e, endTaskDoneId)}
            ></EndItem>
          </List>
        </div>
      </div>
    </div>
  );
};

export default Page;
