import { Manga } from "../../types/mangaType.ts";
import { forwardMessage } from "../linkCheck.ts";
import { toPDF } from "../toPDF.ts";

export async function Mangasee123(id:string) {
    return {manga:(await getManga(id))!, chapFunc:getChapter}
}

async function getManga(id: string) {
    //forwardMessage(`Fetching manga. This may take some time`, 2)
    const response = await fetch(`http://localhost:3000/bypass/?url=https://mangasee123.com/manga/${id}&method=mangasee123`);
    if (response.status !== 200) {
        //forwardMessage(`Some internal error has occured`, 1);
        return
    }
    const manga:Manga = await response.json();
    console.log("GOT Manga", manga)
    return manga
} 

const getChapter = async (chapter:string) => {
    console.log("Fetching chapter")
    const response = await fetch(`http://localhost:3000/bypass?method=chapter&url=https://mangasee123.com${chapter}`)
    const panels = await response.json()
    console.log('fetched chapter',panels['panels'], 'converting to pdf')
    await toPDF(panels.panels)
}