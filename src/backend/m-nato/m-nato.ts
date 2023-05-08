import { Manga } from "../../types/mangaType.ts";

export async function Manganato(MangaPath:string) {
    if (!(await isAvailable(MangaPath))) {console.log('Not found');return false}
    console.log("Found");
    return (await getManga(MangaPath))
}

async function isAvailable(MangaPath:string) {
    const response = await fetch("https://raw.githubusercontent.com/MALSync/MAL-Sync-Backup/master/data/pages/MangaNato/_index.json")
    const mangaList = await response.json()
    if (mangaList.includes(MangaPath)) {
        return true
    } return false
}

async function getManga(id: string) {
    const response = await fetch(`http://localhost:3000/fetch/?url=https://manganato.com/${id}`);
    const rawManga = await response.text();
    const chaptersList = [...rawManga.matchAll(/"chapter-name text-nowrap" href="(?<chapForward>.+?)" title=".+?">(?<chapName>.+?)<\/a>/gm)!]
    const chapters = []
    for(let i=0;i<chaptersList.length;i++) {
        chapters.push({link:await getChapter(chaptersList[i][1]), name:chaptersList[i][2]})
    }
    const manga :Manga = {
        title:rawManga.match(/"story-info-right">\n<h1>(?<title>.+?)<\/h1>/)!.groups!['title'],
        icon_url:new URL (rawManga.match(/"img-loading" src="(?<icon_url>.+?)" alt="/)!.groups!['icon_url']),
        chapters:chapters
    }
    console.log(manga)
    return manga
} 


async function getChapter(chapter:string) {
    const response = await fetch(`http://localhost:3000/fetch/?url=${chapter}`);
    const rawChapter = await response.text();
    return rawChapter;

}
