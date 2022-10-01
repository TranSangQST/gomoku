import Square from "../Square";

import "./Board.css";

function Board({ squares, winnerPositions, curPos, onClick }) {
	const handleClick = (i) => {
		return () => onClick(i);
	};

	const render = () => {
		console.log("square in board: ", squares);
		let size = Math.sqrt(squares.length);
		console.log("size in board: ", size);
		let elements = [];
		for (let i = 0; i < size; i++) {
			let row = [];
			for (let k = 0; k < size; k++) {
				let idx = i * size + k;

				let isWinSquare;
				if (winnerPositions) {
					isWinSquare = winnerPositions.includes(idx);
				}

				row.push(
					<Square
						isCurPos={curPos === idx}
						key={k}
						value={squares[idx]}
						isWinSquare={isWinSquare}
						onClick={handleClick(idx)}
					/>
				);
			}
			elements.push(
				<div key={i} className="board-row">
					{row}
				</div>
			);
		}
		return elements;
	};

	return <div>{render()}</div>;
}

export default Board;
