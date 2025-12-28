"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingSkills = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    svg?: React.ReactNode;
    icon?: any;
    name: string;
    title?: string;
    description?: string;
    color?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    function addAnimation() {
      if (containerRef.current && scrollerRef.current) {
        const scrollerContent = Array.from(scrollerRef.current.children);

        if (scrollerRef.current.getAttribute("data-cloned") === "true") return;

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });

        if (scrollerContent.length > 0) {
          scrollerRef.current.setAttribute("data-cloned", "true");
        }

        getDirection();
        getSpeed();
        setStart(true);
      }
    }

    const getDirection = () => {
      if (containerRef.current) {
        if (direction === "left") {
          containerRef.current.style.setProperty(
            "--animation-direction",
            "forwards"
          );
        } else {
          containerRef.current.style.setProperty(
            "--animation-direction",
            "reverse"
          );
        }
      }
    };

    const getSpeed = () => {
      if (containerRef.current) {
        if (speed === "fast") {
          containerRef.current.style.setProperty("--animation-duration", "20s");
        } else if (speed === "normal") {
          containerRef.current.style.setProperty("--animation-duration", "40s");
        } else {
          containerRef.current.style.setProperty("--animation-duration", "80s");
        }
      }
    };

    addAnimation();
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((skill, idx) => (
          <li
            key={(skill.name || skill.title || `skill-${idx}`) + idx}
            className="flex flex-shrink-0 flex-row items-center justify-center gap-2 px-4"
          >
            {/* Icon */}
            {skill.svg ? (
              <div className="flex h-8 w-8 items-center justify-center">
                {skill.svg}
              </div>
            ) : skill.icon ? (
              <skill.icon
                className="text-foreground h-8 w-8"
                strokeWidth={1.5}
              />
            ) : null}

            {/* Name */}
            <h3 className="text-foreground text-sm font-medium whitespace-nowrap">
              {skill.name || skill.title}
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
};
