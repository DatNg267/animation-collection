"use client";
import "./styles.css";
import React, { useEffect, useRef, useState } from "react";
interface QueueItem {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
}

interface ScrambleState {
  queue: QueueItem[];
  frame: number;
}
class TextScrambleLogic {
  private readonly chars: string;

  constructor() {
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
  }

  setText(
    element: HTMLElement | null,
    newText: string,
    oldText: string
  ): ScrambleState {
    const length: number = Math.max(oldText.length, newText.length);
    const queue: QueueItem[] = [];

    for (let i = 0; i < length; i++) {
      const from: string = oldText[i] || "";
      const to: string = newText[i] || "";
      const start = Math.floor(Math.random() * 30);
      const duration = 20 + Math.floor(Math.random() * 20);
      const end = start + duration;
      queue.push({ from, to, start, end });
    }

    return { queue, frame: 0 };
  }

  randomChar(): string {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

interface TextScrambleProps {
  phrases?: string[];
  className?: string;
}

const TextScramble: React.FC<TextScrambleProps> = ({
  phrases = [
    "Neo,",
    "sooner or later",
    "you're going to realize",
    "just as I did",
    "that there's a difference",
    "between knowing the path",
    "and walking the path",
  ],
  className = "text font-mono",
}) => {
  const [output, setOutput] = useState<string>("");
  const frameRequest = useRef<number>();
  const textScramble = useRef<TextScrambleLogic>(new TextScrambleLogic());
  const queueRef = useRef<QueueItem[]>([]);
  const frameRef = useRef<number>(0);
  const counterRef = useRef<number>(0);
  const previousTextRef = useRef<string>("");

  const update = (): void => {
    let currentOutput: string = "";
    let complete: number = 0;

    for (let i = 0; i < queueRef.current.length; i++) {
      let { from, to, start, end, char } = queueRef.current[i];

      if (frameRef.current >= end) {
        complete++;
        currentOutput += to;
      } else if (frameRef.current >= start) {
        if (!char || Math.random() < 0.28) {
          char = textScramble.current.randomChar();
          queueRef.current[i].char = char;
        }
        currentOutput += `<span class="dud">${char}</span>`;
      } else {
        currentOutput += from;
      }
    }

    setOutput(currentOutput);
    previousTextRef.current = currentOutput;
    frameRef.current++;

    if (complete === queueRef.current.length) {
      console.log({
        currentOutput,
        complete,
        queue: queueRef.current,
        frame: frameRef.current,
      });

      setTimeout(next, 800);
    } else {
      frameRequest.current = requestAnimationFrame(update);
    }
  };

  const next = (): void => {
    const oldText: string = previousTextRef.current.replace(/<[^>]*>/g, "");
    const nextPhrase: string = phrases[counterRef.current];
    const { queue, frame } = textScramble.current.setText(
      null,
      nextPhrase,
      oldText
    );
    queueRef.current = queue;
    frameRef.current = frame;

    if (frameRequest.current) {
      cancelAnimationFrame(frameRequest.current);
    }
    frameRequest.current = requestAnimationFrame(update);

    counterRef.current = (counterRef.current + 1) % phrases.length;
  };

  useEffect(() => {
    next();
    return () => {
      if (frameRequest.current) {
        cancelAnimationFrame(frameRequest.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className={className} dangerouslySetInnerHTML={{ __html: output }} />
    </div>
  );
};

export default TextScramble;
