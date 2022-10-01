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
	// console.group("Re-render Board");
	// console.group("squares", squares);
	// console.log("rowSize = ", rowSize);
	// console.log("colSize = ", colSize);

	// console.groupEnd();

	const handleClick = (i, k) => {
		return () => onClick(i, k);
	};

	const render = () => {
		// console.group("render Board");
		let elements = [];
		for (let row = 0; row < rowSize; row++) {
			let rowEles = [];
			for (let col = 0; col < colSize; col++) {
				let isWinSquare;
				// if (winnerPositions) {
				// 	isWinSquare = winnerPositions.includes(idx);
				// }

				// console.log("curPos: ", curPos);
				// console.log("row = ", row);
				// console.log("col = ", col);

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
		// console.groupEnd();
		return elements;
	};

	return <>{render()}</>;
}

export default Board;
