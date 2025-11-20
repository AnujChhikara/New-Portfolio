"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HighlightConfig {
  [word: string]: string; // word: className
}

export const TextReveal = ({
  text,
  className,
  delay = 0,
  highlightWords = [],
  highlightConfig = {},
}: {
  text: string;
  className?: string;
  delay?: number;
  highlightWords?: string[];
  highlightConfig?: HighlightConfig;
}) => {
  const words = text.split(" ");
  const highlightSet = new Set(
    highlightWords.map((word) => word.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={cn("gap-x-1.5", className)}
    >
      {words.map((word, index) => {
        const cleaned = word.replace(/[.,!?]/g, "").toLowerCase();
        const isHighlighted = highlightSet.has(cleaned);
        const customStyle = highlightConfig[cleaned];

        return (
          <motion.span
            variants={child}
            key={index}
            className={cn(
              "inline-block",
              isHighlighted && !customStyle && "text-primary font-semibold",
              customStyle
            )}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
};
