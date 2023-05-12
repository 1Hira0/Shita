import { Mangasee123 } from "./m-see/m-see";

export const internalErrorMessage = (eroor:HTMLParagraphElement) => {
    eroor.className = `text-red-400`
    eroor.innerHTML = `Internal error. \nPlease take a screenshot of this error and the text bar and submit at \n<a href='https://github.com/1Hira0/Shita/issues/new'>Project's issue page</a>`
}

export const forwardMessage = (er:string, eroor:HTMLParagraphElement, message:string) => {
    eroor.className = er==`r` ?`text-red-400`:`text-white-400`;
    eroor.innerHTML = message 
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
    console.log(eroor.innerHTML)
}

export async function formatLink(rawInput:HTMLInputElement, eroor:HTMLParagraphElement) {
    const supported = ["https://mangasee123.com"]
    const link = rawInput!.value.match(/^(?<hostname>[^:\/?#]+:\/{2}[^\/?#]*)\/?(?<MangaPath>.*)/)?.groups
    //                                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^     ^^^^^^^^^^^
    //                                     site from http-.com/                  after sitename  (eg. /manga/chapters/1) till the end of string
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
    if (!supported.includes(link!.hostname)) {
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
        eroor.innerHTML = ``
        await callSite(link!.hostname, link?.MangaPath, eroor);
        console.log(`formatting link success: ${rawInput!.value}`)
    }
}

async function callSite(site:string, mangaPath:string, eroor:HTMLParagraphElement){
    forwardMessage('w', eroor, `Matching ${site}`);
    switch(site) {
        case "https://mangasee123.com":{
            forwardMessage('w', eroor, `Match found`);
            console.log(`Site is mangansee`);
            await  Mangasee123(mangaPath, eroor);
            break
        }
        default: console.log(`${site} passed link format but not matching`);internalErrorMessage(eroor)
    }
}