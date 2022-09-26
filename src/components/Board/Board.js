
import Square from "../Square";

import "./Board.css";

function Board({squares, winnerPositions, onClick}) {


	if(winnerPositions) {
		console.log("winnerPositions in board: ", winnerPositions);
	}
	

	// console.log("squares: ", squares);

	const handleClick = (i) => {
		return () => onClick(i);
	}
  

	const render = () => {
		let size = Math.sqrt(squares.length);
		// console.log("size=", size);
		let elements = [];
		for (let i = 0; i < size; i++) {
			// console.group(i);
			let row = [];
			for (let k = 0; k < size; k++) {
				// console.log("k=", k);
				let idx = i*size+k;
				// console.log("idx=", idx);

				let isWinSquare;
				if(winnerPositions) {
					isWinSquare = winnerPositions.includes(idx);
				}

				row.push(<Square key={k} value={squares[idx]} isWinSquare={isWinSquare} onClick={handleClick(idx)}/>);
			}
			elements.push(<div key={i} className="board-row">{row}</div>);
			// console.groupEnd();
		}
		return elements;
	}

	return (
		<div>
			{render()}
			{/* <div className="board-row">
			{<Square value={squares[6]} onClick={handleClick(6)}/>}
			{<Square value={squares[7]} onClick={handleClick(7)}/>}
			{<Square value={squares[8]} onClick={handleClick(8)}/>}
			</div> */}
		</div>
	);
	
  }

export default Board;
