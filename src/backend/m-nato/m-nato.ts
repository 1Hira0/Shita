export function Manganato(MangaPath:string) {
    getManga(MangaPath)
}
async function getManga(id: string) {
    const response = await fetch(`https://manganato.com/${id}`) 
    console.log(response);
}

function getChapters(manga:URL, num_chapters:number) {
    const chapters = [];
    for (let chapter= 0;chapter<num_chapters;chapter++) {
        getChapter(manga, chapter)
    }
}

function getChapter(manga:URL, chapter:number) {
    const response = fetch(manga+`chapter-${chapter}`)
}

function manganato_ChapterLinks(id:string) {
    return ["ch1", "ch2", "ch3", "ch4"] 

}