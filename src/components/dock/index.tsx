"use client";
import { Code, FileText, FolderOpen, Home, Mail } from "lucide-react";
import { useEffect, useRef } from "react";

export function MacOSDock() {
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const items = dock.querySelectorAll(".dock-item");
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!dock) return;

      const rect = dock.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (
        mouseX < 0 ||
        mouseX > rect.width ||
        mouseY < 0 ||
        mouseY > rect.height
      ) {
        if (isHovering) {
          items.forEach((item) => {
            (item as HTMLElement).style.width = "40px";
            (item as HTMLElement).style.height = "40px";
          });
          isHovering = false;
        }
        return;
      }

      isHovering = true;

      let closestItem: Element | null = null;
      let minDistance = Infinity;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterX = itemRect.left + itemRect.width / 2 - rect.left;
        const itemCenterY = itemRect.top + itemRect.height / 2 - rect.top;

        const distance = Math.sqrt(
          Math.pow(mouseX - itemCenterX, 2) + Math.pow(mouseY - itemCenterY, 2)
        );

        if (distance < minDistance && distance < 120) {
          minDistance = distance;
          closestItem = item;
        }
      });

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterX = itemRect.left + itemRect.width / 2 - rect.left;
        const itemCenterY = itemRect.top + itemRect.height / 2 - rect.top;

        const distance = Math.sqrt(
          Math.pow(mouseX - itemCenterX, 2) + Math.pow(mouseY - itemCenterY, 2)
        );

        if (distance < 120) {
          const progress = 1 - distance / 120;
          const scale = 1 + progress;
          const size = 40 * scale;

          (item as HTMLElement).style.width = `${size}px`;
          (item as HTMLElement).style.height = `${size}px`;
        } else {
          (item as HTMLElement).style.width = "40px";
          (item as HTMLElement).style.height = "40px";
        }
      });
    };

    const handleMouseLeave = () => {
      items.forEach((item) => {
        (item as HTMLElement).style.width = "40px";
        (item as HTMLElement).style.height = "40px";
      });
      isHovering = false;
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleItemClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href.startsWith("mailto:")) {
      window.location.href = href;
    } else if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      // For resume, you can update this link
      console.log("Resume link clicked - update the href in the component");
    }
  };

  return (
    <div className="fixed bottom-8 bg-white/10 backdrop-blur-xl rounded-full px-6 py-1 shadow-2xl border border-white/20 left-1/2 transform -translate-x-1/2 z-50">
      <div ref={dockRef} className="macos-dock">
        <div className="dock-items space-x-1">
          <div
            className="dock-item"
            data-tooltip="Home"
            onClick={() => handleItemClick("#home")}
          >
            <Home className="w-6 h-6" />
          </div>

          <div
            className="dock-item"
            data-tooltip="Projects"
            onClick={() => handleItemClick("#projects")}
          >
            <FolderOpen className="w-6 h-6" />
          </div>

          <div
            className="dock-item"
            data-tooltip="TechStack"
            onClick={() => handleItemClick("#skills")}
          >
            <Code className="w-6 h-6" />
          </div>

          <div
            className="dock-item"
            data-tooltip="Contact"
            onClick={() => handleItemClick("mailto:anuj.dev.in@gmail.com")}
          >
            <Mail className="w-6 h-6" />
          </div>

          <div
            className="dock-item"
            data-tooltip="Resume"
            onClick={() =>
              handleItemClick(
                "https://drive.google.com/file/d/157TB_orhQk3NefRRg_vY_Fmdf6nryCvU/view?usp=sharing"
              )
            }
          >
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
