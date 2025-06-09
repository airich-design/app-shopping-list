"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-50"
        >
          <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cn(
            "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
            "data-[side=bottom]:animate-in data-[side=bottom]:slide-in-from-top-2",
            "data-[side=left]:animate-in data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:animate-in data-[side=right]:slide-in-from-left-2",
            "data-[side=top]:animate-in data-[side=top]:slide-in-from-bottom-2"
          )}
        >
          <DropdownMenu.Item
            className={cn(
              "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
              "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
              { "bg-accent": theme === "light" }
            )}
            onClick={() => setTheme("light")}
          >
            <Sun className="mr-2 size-4" />
            Light
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={cn(
              "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
              "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
              { "bg-accent": theme === "dark" }
            )}
            onClick={() => setTheme("dark")}
          >
            <Moon className="mr-2 size-4" />
            Dark
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={cn(
              "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
              "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
              { "bg-accent": theme === "system" }
            )}
            onClick={() => setTheme("system")}
          >
            <Laptop className="mr-2 size-4" />
            System
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
