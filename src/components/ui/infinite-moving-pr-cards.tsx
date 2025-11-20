"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { GithubPR } from "@/lib/github";
import { GitMerge, GitPullRequest } from "lucide-react";

export const InfiniteMovingPRCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: GithubPR[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, [items]);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      
      // Only clone if we haven't already cloned (simple check: if children count > items.length)
      // Or better, just clear and re-append if we want to be safe, but React manages the original list.
      // The issue with "Array.from(scrollerRef.current.children)" is it includes previously cloned items if we don't be careful.
      // But here, we are in a useEffect that runs on 'items' change.
      // We should ensure we are working with the fresh state. 
      // Actually, the simplest way for this specific component pattern is to check a data attribute or just relying on the fact that
      // we only want to clone ONCE per set of items. 
      
      // However, since items load async, the first render has 0 items. second has N.
      // The scrollerContent will be empty first time.
      // Second time it will have N items. We want to clone them.
      
      // Let's prevent multiple clonings by checking if we already have enough copies or a flag.
      // But since we're just appending, if we run this twice on same items, we get double clones.
      
      // A robust way: remove all nodes that are clones before adding new ones? 
      // Or just rely on the fact that `items` changes reference only once when data loads.
      
      // Let's filter to only original items before cloning to avoid cloning clones if useEffect runs again.
      // But scrollerRef.current.children contains DOM nodes.
      
      // Actually, the standard implementation of this component usually duplicates content once.
      // We should check if we already have duplicated content.
      
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

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => {
          const isMerged = item.pull_request?.merged_at || item.state === 'closed'; // Ideally check merged_at specifically, but search API is a bit different. Actually search API returns `pull_request` obj.
          // Simpler check:
          const status = item.pull_request.merged_at ? 'merged' : item.state;
          
          // Extract repo name from URL if possible, or just show title
          // repository_url: "https://api.github.com/repos/owner/repo"
          const repoName = item.repository_url.split('/').slice(-2).join('/');

          return (
            <li
              className="w-[350px] max-w-full relative rounded-xl border border-border bg-card px-8 py-6 flex-shrink-0"
              key={item.id}
            >
              <a href={item.html_url} target="_blank" rel="noopener noreferrer" className="block h-full">
                <div className="flex flex-col h-full justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground font-mono">
                        {repoName}
                      </span>
                      <div className={cn("flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium", 
                        status === 'merged' 
                          ? "bg-purple-500/10 text-purple-500" 
                          : status === 'open' 
                            ? "bg-green-500/10 text-green-500" 
                            : "bg-red-500/10 text-red-500"
                      )}>
                        {status === 'merged' ? <GitMerge className="w-3 h-3" /> : <GitPullRequest className="w-3 h-3" />}
                        <span className="capitalize">{status === 'merged' ? 'Merged' : status}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-relaxed">
                      {item.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                    <span>#{item.id}</span>
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

