import { parse } from "./backend/linkCheck"
import { useNavigate } from "react-router-dom";

function App() {
			const navigate = useNavigate();
			const handleKeyUp = async (e:any) => {
					if (e.key !== 'Enter') return; // early return here for readability
					const parsedValue = await parse();
					navigate(`/download/${parsedValue}`);
			}
			const handleButtPress = async () => {
				const parsedValue = await parse();
				navigate(`/download/${parsedValue}`);
			}
		return (		
    <>
	<div id="main">
		<section>
			<div className="header-wrapper">
				<h1>SHITA</h1>
				<h2>Fun Facts!</h2>
			</div>
			<div className="search-wrapper">
				<div className="search-box">
					<input type="url" id="search" name="rawInput" placeholder="MangaSee123 manga link..." onKeyUp={handleKeyUp}/>
					<button id="search-button" onClick={handleButtPress}></button>
				</div>
				<p id="status">hmmm</p>
			</div>
		</section>
	</div>
    </>
  )
}

export default App