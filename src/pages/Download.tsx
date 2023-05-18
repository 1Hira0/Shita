import { Link } from "react-router-dom";
import SwitchTheme from "../components/Theme";
import { animeTestData } from "../data/test/someAnime";
import { localTheme, useTheme } from "../hooks/useTheme";

function Download(): JSX.Element {
  const { theme, setTheme } = useTheme(localTheme)
  return (
    <>
      <div className={`flex items-center justify-center flex-col py-3 ${theme === 'dark' ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
        <h1 className="font-bold text-3xl text-gray-800">{animeTestData.title}</h1>
        <img className="w-20 h-20 rounded-full" src={animeTestData.icon_url as string} />
        <div className="w-[50vw]">
          {animeTestData.chapters?.map(c => (
            <div key={Math.random() * 5} className="flex flex-row items-center justify-between w-full p-3 bg-gray-800 rounded-xl m-3">
              <h1 className="text-white font-semibold">{c.name}</h1>
              <a className="text-blue-400 font-medium cursor-pointer">{c.link}</a>
            </div>
          ))}
        </div>
        <Link to={"/"}>Go back</Link>
      </div>
      <SwitchTheme theme={theme} setTheme={setTheme} position="left" />
    </>
  )
}

export default Download
