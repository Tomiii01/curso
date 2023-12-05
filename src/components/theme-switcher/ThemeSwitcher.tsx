"use client";

import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export interface Props {}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Toggle
        onPressedChange={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label="Toggle italic"
      >
        <Sun className="h-4 w-4 hidden dark:block" />
        <Moon className="h-4 w-4 dark:hidden" />
      </Toggle>
    </>
  );
}
