"use client";

import { useState, useEffect, useRef } from "react";

interface UseTypewriterOptions {
  lines: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseBetween?: number;
  loop?: boolean;
  startDelay?: number;
}

export function useTypewriter({
  lines,
  typingSpeed = 45,
  deletingSpeed = 25,
  pauseBetween = 1200,
  loop = false,
  startDelay = 0,
}: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStarted, setIsStarted] = useState(startDelay === 0);
  const [isDone, setIsDone] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (startDelay > 0) {
      const t = setTimeout(() => setIsStarted(true), startDelay);
      return () => clearTimeout(t);
    }
  }, [startDelay]);

  useEffect(() => {
    if (!isStarted || isDone) return;

    const currentLine = lines[lineIndex];

    const tick = () => {
      if (!isDeleting) {
        if (charIndex < currentLine.length) {
          setDisplayedText(currentLine.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
          timeoutRef.current = setTimeout(tick, typingSpeed);
        } else {
          if (lineIndex === lines.length - 1 && !loop) {
            setIsDone(true);
            return;
          }
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseBetween);
        }
      } else {
        if (charIndex > 0) {
          setDisplayedText(currentLine.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
          timeoutRef.current = setTimeout(tick, deletingSpeed);
        } else {
          setIsDeleting(false);
          setLineIndex((i) => (i + 1) % lines.length);
          timeoutRef.current = setTimeout(tick, typingSpeed);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, typingSpeed);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, isDeleting, isStarted, lineIndex, isDone]);

  return { displayedText, isDone, lineIndex };
}

/** Simple sequential typewriter — types each line one after another, never deletes */
export function useSequentialTypewriter(
  lines: string[],
  speedPerChar = 30,
  delayBetweenLines = 400
) {
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let lineIdx = 0;
    let charIdx = 0;

    const step = () => {
      if (cancelled) return;
      if (lineIdx >= lines.length) {
        setDone(true);
        return;
      }
      const line = lines[lineIdx];
      if (charIdx <= line.length) {
        setCurrentLine(line.slice(0, charIdx));
        charIdx++;
        setTimeout(step, speedPerChar);
      } else {
        setCompletedLines((prev) => [...prev, line]);
        setCurrentLine("");
        lineIdx++;
        charIdx = 0;
        setTimeout(step, delayBetweenLines);
      }
    };

    step();
    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { completedLines, currentLine, done };
}
