import { useState } from "react"
import Theme from "./components/Theme"
import { useTheme } from "./hooks/useTheme"
import { formatLink } from "./backend/linkCheck"

function App() {
  const { theme, setTheme } = useTheme()
  const [url, setUrl] = useState<string>('')
  return (
    <>
      <div className={`${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} w-screen h-screen transition-all duration-300 ease-in-out flex items-center justify-center flex-col`}>
        <h1 className="text-3xl font-bold">Shita</h1>
        <input
          placeholder="Manga URL"
          type="url"
          className={`p-4 my-2 w-[50vw] text-blue-500 rounded-full ${theme === 'dark' ? "bg-gray-100 placeholder:text-gray-900" : "bg-gray-900 placeholder:text-gray-100"}`}
          onChange={(e) => setUrl(e.target.value)} 
          id="rawLink"/>
        <p id="eroor" className={`${"color:red"}`}></p> //idk how to change color
        <button
          className={`${url.length == 0 ? 'cursor-not-allowed' : 'cursor-pointer'} transition-all duration-300 ease-in-out p-2 px-3 my-2 text-xl rounded-full border-2 ${theme === 'dark' ? "bg-gray-100 text-gray-900 hover:bg-gray-900 hover:border-gray-100 hover:text-gray-100" : "bg-gray-900 text-gray-100 hover:bg-gray-100 hover:border-gray-900 hover:text-gray-900"}`}
          onClick={() => { console.log("clicked");formatLink(document.querySelector<HTMLInputElement>('#rawLink')!, document.querySelector<HTMLParagraphElement>('#eroor')!)}}>Download Manga</button>
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
let i: number | undefined
let placeholders = [
      'https://manganato.com/manga-ka960183', 
      'https://mangadex.org/title/d8a959f7-648e-4c8d-8f23-f1f3f8e129f3', 
      'https://fanfox.net/manga/onepunch_man/', 
      'https://mangasee123.com/manga/Onepunch-Man', 
      'https://mangareader.to/onepunch-man-40'
  ]
setInterval(() => {
    const input = document.querySelector<HTMLInputElement>('#rawLink')!
    if (i === placeholders.length || i==undefined) {i=0;}
      input.placeholder = placeholders[i];
      i++;
      }, 3000)




export default App
