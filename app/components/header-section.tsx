export function HeaderSection() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src="/header.webp"
        alt="logo"
        className="w-full grayscale"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      <div className="flex flex-row items-end justify-start space-x-4 sm:space-x-6 -mt-2 w-full">
        <div
          className="relative group shrink-0"
          style={{ perspective: "800px", transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute inset-0 rounded-md"
            style={{
              transform:
                "rotateY(-12deg) rotateX(6deg) translateZ(-8px) translateX(6px) translateY(6px)",
              background: "rgba(0,0,0,0.8)",
              filter: "blur(12px)",
            }}
          />
          {/* Main image */}
          <img
            src="/profile.jpg"
            alt="logo"
            className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-md transition-transform duration-300 ease-out group-hover:scale-105"
            style={{
              transform: "rotateY(-12deg) rotateX(6deg)",
              boxShadow: `
                0 0 0 1px rgba(255,255,255,0.1),
                4px 4px 8px rgba(0,0,0,0.6),
                8px 8px 16px rgba(0,0,0,0.4),
                16px 16px 32px rgba(0,0,0,0.3),
                inset 0 1px 0 rgba(255,255,255,0.15)
              `,
            }}
          />
          <div
            className="absolute top-0 left-0 w-full h-full rounded-md pointer-events-none"
            style={{
              transform: "rotateY(-12deg) rotateX(6deg)",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%)",
              borderTop: "1px solid rgba(255,255,255,0.15)",
              borderLeft: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        </div>
        <div className="flex flex-col items-start justify-start min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold truncate w-full">
            Anuj Chhikara
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Software Engineer
          </p>
        </div>
      </div>
    </div>
  );
}
