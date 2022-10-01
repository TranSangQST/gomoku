import Square from "../Square";

import "./Board.css";

function Board({
	squares,
	rowSize,
	colSize,
	winnerPositions,
	curPos,
	onClick,
}) {
	const handleClick = (i) => {
		return () => onClick(i);
	};

	const render = () => {
		// let size = Math.sqrt(squares.length);

		let elements = [];
		for (let i = 0; i < rowSize; i++) {
			let row = [];
			for (let k = 0; k < colSize; k++) {
				let idx = i * colSize + k;

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
