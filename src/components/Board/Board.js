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
	const handleClick = (i, k) => {
		return () => onClick(i, k);
	};

	console.log("winner positions in board: ", winnerPositions);
	console.log("squares=", squares);
	const render = () => {
		let elements = [];
		for (let row = 0; row < rowSize; row++) {
			let rowEles = [];
			for (let col = 0; col < colSize; col++) {
				let isWinSquare;

				if (winnerPositions) {
					isWinSquare = winnerPositions.some((pos, idx) => {
						return pos.row === row && pos.col === col;
					});
				}

				console.log("row=", row);
				console.log("col=", col);
				rowEles.push(
					<Square
						isCurPos={curPos.row === row && curPos.col === col}
						key={col}
						value={squares[row][col]}
						isWinSquare={isWinSquare}
						onClick={handleClick(row, col)}
					/>
				);
			}
			elements.push(
				<div key={row} className="board-row">
					{rowEles}
				</div>
			);
		}
		return elements;
	};

	return <>{render()}</>;
}

export default Board;
