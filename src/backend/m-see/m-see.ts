import { Manga } from "../../types/mangaType.ts";
import { internalErrorMessage, forwardMessage } from "../linkCheck.ts";
import { toPDF } from "../toPDF.ts";

export async function Mangasee123(MangaPath:string, eroor:HTMLParagraphElement) {
    const id = MangaPath.split('/')[1]
    forwardMessage("w", eroor, `Checking if manga is available on MangaSee123`)
    if (!(await isAvailable(id))) {
        forwardMessage("r", eroor, `Please check if the manga is available on MangaSee123: https://mangasee123.com/${MangaPath}`)
        console.log('Not found');return
    }
    forwardMessage("w", eroor, `Manga is available`)
    console.log("Found");
    await getManga(id, eroor)
}

async function isAvailable(id:string) {
    const response = await fetch("https://raw.githubusercontent.com/MALSync/MAL-Sync-Backup/master/data/pages/MangaSee/_index.json")
    const mangaList = await response.json()
    if (mangaList.includes(id.toLowerCase())) {
        return true
    } return false
}

async function getManga(id: string, eroor:HTMLParagraphElement) {
    forwardMessage('w', eroor, `Fetching manga. This may take some time`)
    console.log(id)
    const response = await fetch(`http://localhost:3000/bypass/?url=https://mangasee123.com/manga/${id}&method=mangasee123`);
    const manga:Manga = await response.json();
    console.log("GOT Manga", manga)
    console.log('getting chapter')
    await getChapter(manga.chapters![0].link)
    console.log("Got chapter")
    return manga
}

const getChapter = async (chapter:string) => {
    console.log("Fetching chapter")
    const response = await fetch(`http://localhost:3000/bypass?method=chapter&url=https://mangasee123.com${chapter}`)
    const panels = await response.json()
    console.log('fetched chapter',panels['panels'], 'converting to pdf')
    await toPDF(panels.panels)
}