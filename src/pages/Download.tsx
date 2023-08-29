import { animeTestData } from "../data/test/someAnime";
import { useParams } from "react-router-dom";
import { Mangasee123 } from "../backend/mangasee/m-see"
import { useState, useEffect } from "react";

let chapFunc: (chapter:string) => Promise<void>

function Download(): JSX.Element { //cant be async
	let [manga, updateManga] = useState(animeTestData)
	let params = useParams()
	console.log(params)
	useEffect(() => {
		getMedia()
			.then(media => {
				if (!media) return;
				updateManga(media.manga)
				chapFunc = media.chapFunc
			})
	})
	const getMedia = async () => {
		let m
		switch (params.site) {
			case "mangasee" : m = await Mangasee123(params.id!); 
		}
		console.log("THIS IS THE RESPONSE"+m)
		return m!
	}
	
  	return (
		<>
  	  	<div  style={{backgroundColor: '#000000', justifyContent:"center", display:'flex', height:"100%"}}>
			<p id="status">hmmm</p>
  	  	    <div style={{overflow:"auto", margin: '3rem 5rem',  width: '69em', backgroundColor:'#121212'}}>
  	  	    	<img src={manga.icon_url as string} style={{width:50+'px',height:'auto'}}/>
					<h1>{manga.title}</h1>
  	  	    	<table className='chapters-table' style={{width:100+"%"}}>
						<thead><tr><th>Title</th><th>Download as PDF</th></tr></thead>
  	  	    	    <tbody style={{width:"100%"}}>
  	  	    	         {manga.chapters?.map(c => (
  	  	    	        <tr className="chapter" key={c.name}>
  	  	    	            <td className="chapter-title"><a href={c.link}>{c.name}</a></td>
  	  	    	            <td className="ch-download"><button onClick={() => {
								chapFunc(c.link)
							}}>Download</button></td>
  	  	    	        </tr>))}
  	  	    	    </tbody>
  	  	    	</table>        
  	  	  </div>
  	  	</div>
		</>
  	)
}

export default Download
