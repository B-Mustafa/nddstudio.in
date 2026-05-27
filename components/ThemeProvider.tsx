"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  isSystem: boolean;
  useSystem: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
  isSystem: true,
  useSystem: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyTheme(theme: Theme) {
  const html = document.documentElement;
  html.setAttribute("data-theme", theme);
  // Briefly add transition class, then remove so it doesn't interfere with hover states
  html.classList.add("theme-transition");
  setTimeout(() => html.classList.remove("theme-transition"), 400);
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [isSystem, setIsSystem] = useState(true);

  // On mount: read saved preference or fall back to system
  useEffect(() => {
    const saved = localStorage.getItem("ndd-theme") as Theme | null;
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      setIsSystem(false);
      applyTheme(saved);
    } else {
      const sys = getSystemTheme();
      setTheme(sys);
      setIsSystem(true);
      applyTheme(sys);
    }

    // Watch system preference changes
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      // Only auto-update if user hasn't manually picked
      if (!localStorage.getItem("ndd-theme")) {
        const sys: Theme = e.matches ? "light" : "dark";
        setTheme(sys);
        applyTheme(sys);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("ndd-theme", next);
      setIsSystem(false);
      applyTheme(next);
      return next;
    });
  }, []);

  const useSystem = useCallback(() => {
    localStorage.removeItem("ndd-theme");
    const sys = getSystemTheme();
    setTheme(sys);
    setIsSystem(true);
    applyTheme(sys);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle, isSystem, useSystem }}>
      {children}
    </ThemeContext.Provider>
  );
}
