import { useState } from "react";
import { ThemeProp } from "../types/theme";

export type Theme = "dark" | "light"
export function useTheme(): ThemeProp {
  const [theme, setTheme] = useState<Theme>(localStorage.getItem("theme") != null ? localStorage.getItem("theme") as Theme : "dark")
  return { theme, setTheme }
}
