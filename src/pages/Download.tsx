import { animeTestData } from "../data/test/someAnime";

function Download(): JSX.Element {
  return (
    <div className="flex items-center justify-center flex-col py-3">
      <h1 className="font-bold text-3xl text-gray-800">{animeTestData.title}</h1>
      <img className="w-20 h-20 rounded-full" src={animeTestData.icon_url as string} />
      <div className="w-[50vw]">
        {animeTestData.chapters?.map(c => (
          <div className="flex flex-row items-center justify-between w-full p-3 bg-gray-800 rounded-xl m-3">
            <h1 className="text-white font-semibold">{c.name}</h1>
            <a className="text-blue-400 font-medium cursor-pointer">{c.link}</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Download
