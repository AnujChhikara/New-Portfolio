"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

export const StarField = ({
  className,
  count = 100,
}: {
  className?: string;
  count?: number;
}) => {
  const [stars, setStars] = useState<Star[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < count; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100, // percentage
          y: Math.random() * 100, // percentage
          size: Math.random() * 2 + 1, // 1px to 3px
          opacity: Math.random() * 0.5 + 0.3,
          duration: Math.random() * 3 + 2, // 2s to 5s twinkle
          delay: Math.random() * 5,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, [count]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 -z-10 overflow-hidden bg-background transition-colors duration-500",
        className
      )}
    >
      {/* Gradient overlay for depth - dark mode only */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent dark:from-black/20 dark:via-transparent dark:to-black/40 pointer-events-none" />

      {/* Subtle nebula effects - more subtle in light mode */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/5 dark:bg-purple-900/10 blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 dark:bg-blue-900/10 blur-[120px] animate-pulse-slow delay-1000" />

      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-gray-300/40 dark:bg-slate-200"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [star.opacity * 0.3, 0.05, star.opacity * 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
