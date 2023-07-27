export type Manga = {
  title: string
  icon_url: URL | string | undefined
  chapters: chapter[] | undefined //to be changed into pdf instead of an url(as string rn)
}

export type chapter = {
  link: string
  name: string
}
