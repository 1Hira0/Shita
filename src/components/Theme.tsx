import { ThemeProp } from "../types/theme";
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

interface ExtendedThemeProps extends ThemeProp {
  position: "right" | "left"
}
export default function Theme({ theme, setTheme, position }: ExtendedThemeProps): JSX.Element {
  return (
    <div className={`text-2xl ${theme === 'dark' ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'} absolute bottom-0 ${position}-0 m-4 p-2 rounded-full cursor-pointer`}>
      {theme === 'dark' ? (
        <div onClick={() => setTheme('light')}><BsFillSunFill /></div>
      ) : (
        <div onClick={() => setTheme('dark')}><BsFillMoonFill /></div>
      )}
    </div>
  )
}
