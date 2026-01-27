import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Theme toggle switch component
 * Allows users to switch between light and dark themes
 * Persists preference in localStorage
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme as "light" | "dark");
    applyTheme(savedTheme as "light" | "dark");
  }, []);

  const applyTheme = (newTheme: "light" | "dark") => {
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <label className="relative inline-flex items-center cursor-pointer gap-2">
        <div className="w-11 h-6 bg-neutral-300 rounded-full relative">
          <div className="absolute top-[2px] left-[2px] bg-white border border-neutral-300 rounded-full h-5 w-5 transition-all"></div>
        </div>
        <Sun className="w-4 h-4 text-neutral-700" />
      </label>
    );
  }

  return (
    <label className="relative inline-flex items-center cursor-pointer gap-2">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
        className="sr-only peer"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      />
      <div className="w-11 h-6 bg-neutral-300 dark:bg-neutral-600 rounded-full relative transition-colors duration-300 peer-checked:bg-neutral-500 dark:peer-checked:bg-neutral-500">
        <div
          className={`absolute top-[2px] bg-white border border-neutral-300 dark:border-neutral-500 rounded-full h-5 w-5 transition-all duration-300 ${
            theme === "dark" ? "translate-x-5" : "translate-x-0"
          }`}
        ></div>
      </div>
      {theme === "light" ? (
        <Moon className="w-4 h-4 text-neutral-700 dark:text-neutral-300 transition-transform duration-300" />
      ) : (
        <Sun className="w-4 h-4 text-neutral-700 dark:text-neutral-300 transition-transform duration-300" />
      )}
    </label>
  );
}
