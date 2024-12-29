"use client";
import { useEffect, useRef, useState } from "react";
import "./styles.css";

type Props = {};
const phrases = [
  "Neo,",
  "sooner or later",
  "you're going to realize",
  "just as I did",
  "that there's a difference",
  "between knowing the path",
  "and walking the path",
];
const chars = "!<>-_\\/[]{}—=+*^?#________";

function randomChar(): string {
  return chars[Math.floor(Math.random() * chars.length)];
}
type QueueItem = {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
};

function initQueueItem(
  oldText: string,
  nextText: string
): {
  queue: QueueItem[];
  frame: number;
} {
  let queue = [];
  const length = Math.max(oldText.length, nextText.length);
  for (let i = 0; i < length; i++) {
    const from = oldText[i] || "";
    const to = nextText[i] || "";
    const start = Math.floor(Math.random() * 30);
    const duration = 20 + Math.floor(Math.random() * 20);
    const end = start + duration;
    queue.push({ from, to, start, end });
  }

  return { queue, frame: 0 };
}

function Page({}: Props) {
  const [output, setOutput] = useState("");
  const currentTextRef = useRef("");
  const currentFrameRef = useRef(0);
  const currentFrameRequestRef = useRef<any>(null);
  const nextTextRef = useRef(phrases[0]);
  const currentQueueRef = useRef<QueueItem[]>([]);
  const completedRef = useRef(0);

  const update = () => {
    let complete: number = 0;
    let resStr = "";
    console.log({
      length: currentQueueRef.current.length,
    });
    for (let i = 0; i < currentQueueRef.current.length; i++) {
      const { from, to, start, end, char } = currentQueueRef.current[i];

      if (currentFrameRef.current >= end) {
        resStr += to;
        complete++;
      } else if (currentFrameRef.current >= start) {
        if (!char || Math.random() < 0.28) {
          currentQueueRef.current[i].char = randomChar();
        }
        resStr += `<span class="dud">${char}</span>`;
      } else {
        resStr += from;
      }
    }

    setOutput(resStr);
    currentTextRef.current = resStr;
    currentFrameRef.current++;

    if (currentQueueRef.current.length === complete) {
      setTimeout(next, 800);
    } else {
      currentFrameRequestRef.current = requestAnimationFrame(update);
    }
  };

  const next = () => {
    console.log({
      currentText: currentTextRef.current,
      nextText: nextTextRef.current,
    });
    const initData = initQueueItem(
      currentTextRef.current.replace(/<[^>]*>/g, ""),
      nextTextRef.current
    );

    currentQueueRef.current = initData.queue;
    currentFrameRef.current = initData.frame;
    completedRef.current = 0;

    if (currentFrameRequestRef.current) {
      cancelAnimationFrame(currentFrameRequestRef.current);
    }
    currentFrameRequestRef.current = requestAnimationFrame(update);

    nextTextRef.current =
      phrases[(phrases.indexOf(nextTextRef.current) + 1) % phrases.length];
  };
  useEffect(() => {
    next();
    return () => {
      if (currentFrameRequestRef.current) {
        cancelAnimationFrame(currentFrameRequestRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="text-3xl text-yellow-400"
        dangerouslySetInnerHTML={{ __html: output }}
      />
    </div>
  );
}

export default Page;
