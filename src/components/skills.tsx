"use client";

import { InfiniteMovingSkills } from "@/components/ui/infinite-moving-skills";
import { tech } from "@/components/Tech";

export function Skills() {
  return (
    <section className="space-y-2">
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
    </section>
  );
}
