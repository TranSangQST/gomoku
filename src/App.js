import Game from "./components/Game";
import Board from "./components/Board";
import Square from "./components/Square";


function App() {
	return (
		<div className="App">
			<Game size={3} winSize={3}></Game>
		</div>
	);
}

export default App;
