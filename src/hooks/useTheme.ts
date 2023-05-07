import { useState } from "react";
import { ThemeProp } from "../types/theme";

export type Theme = "dark" | "light"
export function useTheme(): ThemeProp {
  const [theme, setTheme] = useState<Theme>("dark")
  return { theme, setTheme }
}
