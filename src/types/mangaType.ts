export type Manga = {
    title:string
    icon_url:URL|undefined
    chapters:{img:{src:string, alt:string},name:string}[]|undefined //to be changed into pdf instead of an url(as string rn)
}

