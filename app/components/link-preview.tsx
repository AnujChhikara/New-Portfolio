import React, { useState, useEffect } from "react";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
  children,
  url,
  className = "",
  width = 100,
  height = 65,
  quality = 50,
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const openTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Build Microlink API URL
  let src: string;
  if (!isStatic) {
    const params = new URLSearchParams({
      url,
      screenshot: "true",
      meta: "false",
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": "true",
      "viewport.deviceScaleFactor": "1",
      "viewport.width": String(width * 3),
      "viewport.height": String(height * 3),
    });
    src = `https://api.microlink.io/?${params.toString()}`;
  } else {
    src = imageSrc;
  }

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    openTimeoutRef.current = setTimeout(() => {
      setOpen(true);
    }, 50);
  };

  const handleMouseLeave = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 100);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    setMouseX(offsetFromCenter);
  };

  return (
    <>
      {isMounted ? (
        <div className="hidden">
          <img src={src} width={width} height={height} alt="hidden image" />
        </div>
      ) : null}

      <div className="relative inline-block">
        <a
          href={url}
          className={`text-black dark:text-white ${className}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {children}
        </a>

        <div
          className={`absolute bottom-full left-1/2 mb-2 pointer-events-none z-50 ${
            isOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-75 pointer-events-none"
          }`}
          style={{
            transform: `translateX(calc(-50% + ${mouseX}px)) translateY(${
              isOpen ? 0 : 20
            }px) scale(${isOpen ? 1 : 0.6})`,
            transition:
              "opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <a
            href={url}
            className="block p-1 bg-white border-2 border-transparent shadow-xl rounded-xl hover:border-neutral-200 dark:bg-neutral-900 dark:hover:border-neutral-800"
            style={{ fontSize: 0 }}
          >
            <img
              src={isStatic ? imageSrc : src}
              width={width}
              height={height}
              className="rounded-lg"
              style={{
                width: `${width}px`,
                height: `${height}px`,
                maxWidth: "none",
              }}
              alt="preview image"
            />
          </a>
        </div>
      </div>
    </>
  );
};
