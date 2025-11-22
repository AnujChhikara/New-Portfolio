"use client";

import { motion } from "framer-motion";
import { InfiniteMovingSkills } from "@/components/ui/infinite-moving-skills";
import { tech } from "@/components/Tech";

export function Skills() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-2"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h3 className="text-sm font-medium text-foreground uppercase tracking-wider">
          Skills
        </h3>
      </div>

      {/* Infinite Moving Cards */}
      <div className=" md:-mx-0">
        <InfiniteMovingSkills items={tech} direction="left" speed="normal" />
      </div>
    </motion.section>
  );
}
