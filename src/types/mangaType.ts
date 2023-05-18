export type Manga = {
  title: string
  icon_url: URL | string | undefined
  chapters: chapters | undefined //to be changed into pdf instead of an url(as string rn)
}

export type chapters = {
  link: string
  name: string
}[]
