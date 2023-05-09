import { Manganato } from "./m-nato/m-nato";

export async function formatLink(rawInput:HTMLInputElement, eroor:HTMLParagraphElement) {
    const supportedSites = ["https://manganato.com"]
    const link = rawInput!.value.match(/^(?<hostname>[^:\/?#]+:\/{2}[^\/?#]*)\/?(?<MangaPath>.*)/)?.groups
    //                                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^     ^^^^^^^^^^^
    //                                     site from http-.com/                  after sitename  /manga/chapters/1 till the end of string
    //                                     access .hostname                      same as b4
    if (rawInput.value.length==0) {
        eroor.innerHTML = `Nothing was provided`;
        console.log(`rawInput is empty: ${rawInput!.value}`);
        return
    } else 
    if (!rawInput.checkValidity()) {
        eroor.innerHTML = `Not a valid url: ${rawInput.value}`;
        console.log(`rawInput is not a valid url: ${rawInput!.value}`);
        console.error(rawInput!.value);
        return
    } else 
    if (!supportedSites.includes(link!.hostname)) {
        eroor.innerHTML = `This site is not supported: ${link!.hostname}`;
        console.log(`site not supported: ${rawInput!.value}`)
        console.error(link, rawInput!.value);
        return
    } else 
    if (!link?.MangaPath) {
        eroor.innerHTML = `Identifier for the manga was not provided in the link: ${rawInput!.value}~`;
        console.log(`Manga path is empty: ${rawInput!.value}`)
        return
    } else{
        eroor.innerHTML = ``;
        const ifFound = await callSite(link!.hostname, link?.MangaPath);
        console.log(`formatting link success: ${rawInput!.value}`)
        if (ifFound==="notFound") {
            eroor.innerHTML = `No such manga found`
        } else
        if (ifFound===undefined) {
            eroor.innerHTML = `Internal error. Please take a screenshot of this error and the text bar and submit at <a href='https://github.com/1Hira0/Shita/issues/new'>Project's issue page</a>`
        }
    }
}

async function callSite(site:string, mangaPath:string){
    switch(site) {
        case "https://manganato.com":{
            console.log(`Site is manganato`);
            return (await  Manganato(mangaPath));
        }
        default: console.log(`${site} passed link format but not matching`)
    }
}