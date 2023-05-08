import { Manga } from "../mangaOut";
import {RKEY} from "./env.ts"

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
    const response = await fetch('https://http-cors-proxy.p.rapidapi.com/', {
            method: 'POST',
            headers: { 
                'content-type': 'application/json',
                Origin: 'www.example.com',
                'X-Requested-With': 'www.example.com',
                'X-RapidAPI-Key': RKEY,
                'X-RapidAPI-Host': 'http-cors-proxy.p.rapidapi.com'
            },
            body: JSON.stringify({
                url: `https://manganato.com/${id}`
            })
        });
    	const result = await response.text();
        const chaptersList = [...result.matchAll(/"chapter-name text-nowrap" href="(?<chapForward>.+?)" title=".+?">(?<chapName>.+?)<\/a>/gm)!]
        const chapters = []
        for(let i=0;i<chaptersList.length;i++) {
            chapters.push({link:chaptersList[i][1], name:chaptersList[i][2]})
        }
        const manga :Manga = {
            title:result.match(/"story-info-right">\n<h1>(?<title>.+?)<\/h1>/)!.groups!['title'],
            icon_url:new URL (result.match(/"img-loading" src="(?<icon_url>.+?)" alt="/)!.groups!['icon_url']),
            chapters:chapters
        }
        return manga
} 


async function getChapters(chapters:Manga['chapters']) {
    for (let i = 0; i < chapters.length; i++) {
        await fetch(chapters[i].link) //to be completed and used in above function
    }
}
