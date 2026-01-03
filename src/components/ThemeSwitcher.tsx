import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type Theme = "default" | "aws" | "azure" | "gcp";

interface ThemeOption {
  id: Theme;
  name: string;
  colors: string[];
  description: string;
}

const themes: ThemeOption[] = [
  {
    id: "default",
    name: "Default",
    colors: ["#00d1b2", "#0ea5e9"],
    description: "Teal & Cyan",
  },
  {
    id: "aws",
    name: "AWS",
    colors: ["#ff9900", "#ffb84d"],
    description: "Orange",
  },
  {
    id: "azure",
    name: "Azure",
    colors: ["#0080ff", "#00bfff"],
    description: "Blue",
  },
  {
    id: "gcp",
    name: "GCP",
    colors: ["#4285f4", "#34a853", "#ea4335", "#fbbc05"],
    description: "Multi-color",
  },
];

interface ThemeSwitcherProps {
  onThemeChange?: (theme: Theme) => void;
}

const ThemeSwitcher = ({ onThemeChange }: ThemeSwitcherProps) => {
  const [activeTheme, setActiveTheme] = useState<Theme>("default");

  useEffect(() => {
    // Remove all theme classes and apply new one
    document.documentElement.classList.remove(
      "theme-default",
      "theme-aws",
      "theme-azure",
      "theme-gcp"
    );
    document.documentElement.classList.add(`theme-${activeTheme}`);
    onThemeChange?.(activeTheme);
  }, [activeTheme, onThemeChange]);

  return (
    <div className="flex items-center gap-2 p-1 rounded-full bg-secondary/50 backdrop-blur-sm border border-border/50">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => setActiveTheme(theme.id)}
          className={cn(
            "relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300",
            activeTheme === theme.id
              ? "bg-card shadow-lg"
              : "hover:bg-card/50"
          )}
          title={`${theme.name} - ${theme.description}`}
        >
          {/* Color dots */}
          <div className="flex -space-x-1">
            {theme.colors.slice(0, 2).map((color, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full border border-background/50"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          
          {/* Label - visible when active */}
          <span
            className={cn(
              "text-xs font-medium transition-all duration-300 whitespace-nowrap",
              activeTheme === theme.id
                ? "opacity-100 w-auto text-foreground"
                : "opacity-0 w-0 overflow-hidden"
            )}
          >
            {theme.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
