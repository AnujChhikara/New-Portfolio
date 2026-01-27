import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Theme toggle component
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
      <button
        className="fixed top-4 right-4 z-50 p-2.5 rounded-lg border-2 border-dotted border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300 touch-manipulation"
        aria-label="Toggle theme"
      >
        <Sun className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-2.5 rounded-lg border-2 border-dotted border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300 touch-manipulation active:scale-95"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-neutral-700 dark:text-neutral-300 transition-transform duration-300" />
      ) : (
        <Sun className="w-5 h-5 text-neutral-700 dark:text-neutral-300 transition-transform duration-300" />
      )}
    </button>
  );
}
