import { useEffect, useRef, useState } from "react";
import { BACKEND_STATS } from "~/lib/constants";

function useCountUp(target: string, duration = 1400, start = false) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!start) return;
    const numericMatch = target.match(/[\d.]+/);
    if (!numericMatch) { setDisplay(target); return; }

    const numericValue = parseFloat(numericMatch[0]);
    const prefix = target.slice(0, target.indexOf(numericMatch[0]));
    const suffix = target.slice(target.indexOf(numericMatch[0]) + numericMatch[0].length);
    const hasDecimal = numericMatch[0].includes(".");
    const steps = 36;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      const value = (numericValue * current) / steps;
      setDisplay(`${prefix}${hasDecimal ? value.toFixed(1) : Math.floor(value)}${suffix}`);
      if (current >= steps) { clearInterval(timer); setDisplay(target); }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [start, target, duration]);

  return display;
}

function Stat({
  stat,
  index,
  visible,
}: {
  stat: (typeof BACKEND_STATS)[number];
  index: number;
  visible: boolean;
}) {
  const display = useCountUp(stat.value, 1200 + index * 150, visible);

  return (
    <div
      className="flex flex-col gap-1"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: `opacity 0.45s ease ${index * 80}ms, transform 0.45s ease ${index * 80}ms`,
      }}
    >
      <span className="text-3xl sm:text-4xl font-bold tabular-nums tracking-tight text-neutral-900 dark:text-neutral-100 leading-none">
        {display}
      </span>
      <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 leading-tight mt-1">
        {stat.label}
      </span>
      <span className="text-xs text-neutral-400 dark:text-neutral-500 leading-tight">
        {stat.sublabel}
      </span>
    </div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full" aria-label="Scale metrics">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-8">
        {BACKEND_STATS.map((stat, i) => (
          <Stat key={stat.label} stat={stat} index={i} visible={visible} />
        ))}
      </div>
    </section>
  );
}
