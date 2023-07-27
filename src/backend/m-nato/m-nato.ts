import { Manga } from "../../types/mangaType.ts";
/*
        Manganato uses Cloudflare bot-protection to prevent scraping.
        Therefore development for Manganato will pasued till further notice

        SORRY TO DISAPPOINT YOU BUT BYPASSING CLOUDFLARE IS HARD(OR EXPENSIVE)
*/
export async function Manganato(MangaPath:string) {
    const id = MangaPath.split('/')[0]
    if (!(await isAvailable(id))) {
        console.log('Not found');
        return 'notFound'
    }
    console.log("Found");
    return (await getManga(id))
}

async function isAvailable(id:string) {
    const response = await fetch("https://raw.githubusercontent.com/MALSync/MAL-Sync-Backup/master/data/pages/MangaNato/_index.json")
    const mangaList = await response.json()
    if (mangaList.includes(id)) {
        return true
    } return false
}

async function getManga(id: string) {
    const response = await fetch(`http://localhost:3000/fetch/?url=https://manganato.com/${id}`);
    const rawManga = await response.text();
    const chaptersList = [...rawManga.matchAll(/"chapter-name text-nowrap" href="(?<chapForward>.+?)" title=".+?">(?<chapName>.+?)<\/a>/gm)!]
    const chapters = []
    for(let i=0;i<chaptersList.length;i++) {
        chapters.push({link:chaptersList[i][1], name:chaptersList[i][2]})
    }
    const manga :Manga = {
        title:rawManga.match(/"story-info-right">\n<h1>(?<title>.+?)<\/h1>/)!.groups!['title'],
        icon_url:new URL (rawManga.match(/"img-loading" src="(?<icon_url>.+?)" alt="/)!.groups!['icon_url']),
        chapters:chapters
    }
    getChapter(chapters[0].link)
    console.log(manga)
    return manga
} 


async function getChapter(chapter:string) {
    const response = await fetch(`http://localhost:3000/fetch/?url=${chapter}`);
    const rawChapter = await response.text();
    const panelsList = rawChapter.match(/<div class="container-chapter-reader">[a-zA-Z0-9-.\n\s\S]+\/> <\/div>/)![0]
    const panels = [...panelsList.matchAll(/<img src="(?<src>\S*?)".+?alt="(?<alt>[\s\S]+?)"/g)]
    return panels;

}
