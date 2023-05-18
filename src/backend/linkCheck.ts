import { Mangasee123 } from "./m-see/m-see";

export const internalErrorMessage = (setError: React.Dispatch<React.SetStateAction<string>>) => {
  setError(`Internal error. \nPlease take a screenshot of this error and the text bar and submit at \n<a href='https://github.com/1Hira0/Shita/issues/new'>Project's issue page</a>`)
}

export const forwardMessage = (setError: React.Dispatch<React.SetStateAction<string>>, message: string) => {
  setError(message)
  /*new Promise<void> ((resolve) => {
      const interval = setInterval(() => {
          eroor.innerHTML += '.'
          if (message=='') {
              resolve()
              clearInterval(interval)
          } else 
          if (eroor.innerHTML.endsWith("...")) { 
              interval.refresh()
              eroor.innerHTML = eroor.innerHTML.slice(0,-3)
          } 
      }, 3000)
  })
  */
}

export async function formatLink(rawInput: HTMLInputElement, setError: React.Dispatch<React.SetStateAction<string>>) {
  const supported = ["https://mangasee123.com"]
  const link = rawInput!.value.match(/^(?<hostname>[^:\/?#]+:\/{2}[^\/?#]*)\/?(?<MangaPath>.*)/)?.groups
  //                                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^     ^^^^^^^^^^^
  //                                     site from http-.com/                  after sitename  (eg. /manga/chapters/1) till the end of string
  //                                     access .hostname                      same as b4
  if (rawInput.value.length == 0) {
    setError(`Nothing was provided`);
    console.log(`rawInput is empty: ${rawInput!.value}`);
    return
  } else
    if (!rawInput.checkValidity()) {
      setError(`Not a valid url: ${rawInput.value}`);
      console.log(`rawInput is not a valid url: ${rawInput!.value}`);
      console.error(rawInput!.value);
      return
    } else
      if (!supported.includes(link!.hostname)) {
        setError(`This site is not supported: ${link!.hostname}`);
        console.log(`site not supported: ${rawInput!.value}`)
        console.error(link, rawInput!.value);
        return
      } else
        if (!link?.MangaPath) {
          setError(`Identifier for the manga was not provided in the link: ${rawInput!.value}~`);
          console.log(`Manga path is empty: ${rawInput!.value}`)
          return
        } else {
          setError('')
          await callSite(link!.hostname, link?.MangaPath, setError);
          console.log(`formatting link success: ${rawInput!.value}`)
        }
}

async function callSite(site: string, mangaPath: string, setError: React.Dispatch<React.SetStateAction<string>>) {
  forwardMessage(setError, `Matching ${site}`);
  switch (site) {
    case "https://mangasee123.com": {
      forwardMessage(setError, `Match found`);
      console.log(`Site is mangansee`);
      await Mangasee123(mangaPath, setError);
      break
    }
    default: console.log(`${site} passed link format but not matching`); internalErrorMessage(setError)
  }
}
