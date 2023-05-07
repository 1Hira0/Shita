import { useState } from "react"
import Theme from "./components/Theme"
import { useTheme } from "./hooks/useTheme"

function App() {
  const { theme, setTheme } = useTheme()
  const [url, setUrl] = useState<string>('')
  return (
    <>
      <div className={`${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} w-screen h-screen transition-all duration-300 ease-in-out flex items-center justify-center flex-col`}>
        <h1 className="text-3xl font-bold">M-NaTo</h1>
        <input
          placeholder="Manga URL"
          type="url"
          className={`p-4 my-2 w-[50vw] text-blue-500 rounded-full ${theme === 'dark' ? "bg-gray-100 placeholder:text-gray-900" : "bg-gray-900 placeholder:text-gray-100"}`}
          onChange={(e) => setUrl(e.target.value)} />
        <button
          className={`${url.length == 0 ? 'cursor-not-allowed' : 'cursor-pointer'} transition-all duration-300 ease-in-out p-2 px-3 my-2 text-xl rounded-full border-2 ${theme === 'dark' ? "bg-gray-100 text-gray-900 hover:bg-gray-900 hover:border-gray-100 hover:text-gray-100" : "bg-gray-900 text-gray-100 hover:bg-gray-100 hover:border-gray-900 hover:text-gray-900"}`}
          onClick={() => { url.length === 0 ? alert("Provide a valid URL") : makePdf(url) }}>Download Manga</button>
      </div>
      <Theme setTheme={setTheme} theme={theme} position="left" />
    </>
  )
}

function makePdf(url: string) {
  let _url;
  try { _url = new URL(url).hostname } catch (e) { alert(`ERROR: ${url} is not a valid url`) }
  console.log(_url)
}

export default App
