import Game from "./components/Game";
import GlobalStyles from "./components/GlobalStyles";


function App() {
	return (
		<GlobalStyles>
			<div className="App">
				<Game size={10} winSize={5}></Game>
			</div>
		</GlobalStyles>
	);
}

export default App;
