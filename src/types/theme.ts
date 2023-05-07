import { Theme } from "../hooks/useTheme"

export interface ThemeProp {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}
