import { useState } from "react";
import { ThemeProp } from "../types/theme";

export type Theme = "dark" | "light"
export const localTheme = localStorage.getItem("theme") != null ? localStorage.getItem("theme") as Theme : "dark"
export function useTheme(defaultTheme: Theme): ThemeProp {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  return { theme, setTheme }
}
