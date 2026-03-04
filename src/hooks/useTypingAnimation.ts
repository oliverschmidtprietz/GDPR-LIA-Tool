import { useState, useEffect, useRef } from 'react';

const LINE1 = 'Legitimate Interest';
const LINE2 = 'Assessment';
const CHAR_INTERVAL = 55;
const PAUSE_MS = 300;
const LINGER_MS = 1500;

type Phase = 'line1' | 'pause' | 'line2' | 'linger' | 'done';

export function useTypingAnimation() {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [phase, setPhase] = useState<Phase>(prefersReducedMotion ? 'done' : 'line1');
  const [charIndex, setCharIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const cleanup = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    if (phase === 'line1') {
      setCharIndex(0);
      intervalRef.current = setInterval(() => {
        setCharIndex((prev) => {
          if (prev >= LINE1.length) {
            cleanup();
            setPhase('pause');
            return prev;
          }
          return prev + 1;
        });
      }, CHAR_INTERVAL);
    } else if (phase === 'pause') {
      timeoutRef.current = setTimeout(() => {
        setPhase('line2');
      }, PAUSE_MS);
    } else if (phase === 'line2') {
      setCharIndex(0);
      intervalRef.current = setInterval(() => {
        setCharIndex((prev) => {
          if (prev >= LINE2.length) {
            cleanup();
            setPhase('linger');
            return prev;
          }
          return prev + 1;
        });
      }, CHAR_INTERVAL);
    } else if (phase === 'linger') {
      timeoutRef.current = setTimeout(() => {
        setPhase('done');
      }, LINGER_MS);
    }

    return cleanup;
  }, [phase, prefersReducedMotion]);

  const done = phase === 'done';

  return {
    line1: done ? LINE1 : phase === 'line1' ? LINE1.slice(0, charIndex) : LINE1,
    line2: done
      ? LINE2
      : phase === 'line2'
        ? LINE2.slice(0, charIndex)
        : phase === 'linger' || phase === 'done'
          ? LINE2
          : '',
    showCursor: !done,
    showUnderline: phase === 'linger' || phase === 'done',
    done,
    phase,
  };
}
