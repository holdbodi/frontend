import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  durationMs?: number;
}

export function AnimatedNumber({ value, durationMs = 1200 }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const from = 0;

    function tick(now: number) {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [value, durationMs]);

  return <>{new Intl.NumberFormat("en-NG").format(display)}</>;
}
