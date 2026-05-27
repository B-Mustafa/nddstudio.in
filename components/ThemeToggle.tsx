"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle, isSystem, useSystem } = useTheme();

  return (
    <div className="flex items-center gap-1.5">
      {/* System reset — only shown when user has overridden */}
      {!isSystem && (
        <button
          onClick={useSystem}
          title="Use system preference"
          className="text-[9px] font-medium tracking-[0.1em] uppercase px-2 py-1 rounded-md transition-all duration-200"
          style={{
            color: "var(--fg-faint)",
            border: "1px solid var(--border)",
          }}
        >
          Auto
        </button>
      )}

      {/* Toggle pill */}
      <button
        onClick={toggle}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className="relative flex items-center rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          width: "52px",
          height: "28px",
          background:
            theme === "dark"
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,0,0,0.08)",
          border: "1px solid var(--border-md)",
          padding: "3px",
        }}
      >
        {/* Track icons */}
        <span
          className="absolute left-2 text-[11px] transition-opacity duration-200"
          style={{ opacity: theme === "light" ? 1 : 0.25 }}
        >
          ☀️
        </span>
        <span
          className="absolute right-1.5 text-[11px] transition-opacity duration-200"
          style={{ opacity: theme === "dark" ? 1 : 0.25 }}
        >
          🌙
        </span>

        {/* Thumb */}
        <div
          className="absolute rounded-full transition-all duration-300 shadow-sm"
          style={{
            width: "20px",
            height: "20px",
            background: "var(--orange)",
            left: theme === "light" ? "4px" : "calc(100% - 24px)",
            top: "3px",
          }}
        />
      </button>
    </div>
  );
}
