import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faSortAsc, faSortDesc } from "@fortawesome/free-solid-svg-icons";

import Board from "../Board";

import "./Game.css";

function conver1DTo2DPosition(pos, size) {
	if (pos !== 0 && !pos) {
		return { row: isNaN, col: isNaN };
	}

	const row = Math.floor(pos / size);
	const col = pos % size;

	return { row, col };
}

function conver2DTo1DPosition({ row, col }, size) {
	return row * size + col;
}

// https://stackoverflow.com/questions/22464605/convert-a-1d-array-to-2d-array
function convert1DTo2DArray(arr) {
	const size = Math.sqrt(arr.length);
	const arr1D = [...arr];
	const arr2D = [];
	while (arr1D.length) arr2D.push(arr1D.splice(0, size));
	return arr2D;
}

function checkWinRow(squares2D, winSize, row, col) {
	const positions = [{ row, col }];
	let size = squares2D.length;

	let count = 1;

	// Row: Left
	let curCol = col;
	while (curCol > 0) {
		let leftCol = curCol - 1;

		if (squares2D[row][col] === squares2D[row][leftCol]) {
			positions.push({ row: row, col: leftCol });
			count++;
		} else break;
		curCol = leftCol;
	}

	// Row: Right
	curCol = col;
	while (curCol < size - 1) {
		let rightCol = curCol + 1;

		if (squares2D[row][col] === squares2D[row][rightCol]) {
			positions.push({ row: row, col: rightCol });
			count++;
		} else break;

		curCol = rightCol;
	}

	if (count === winSize) return positions;

	return false;
}

function checkWinCol(squares2D, winSize, row, col) {
	const positions = [{ row, col }];
	let size = squares2D.length;

	let count = 1;

	// Col: Up
	let curRow = row;
	while (curRow > 0) {
		let upRow = curRow - 1;

		if (squares2D[row][col] === squares2D[upRow][col]) {
			positions.push({ row: upRow, col: col });
			count++;
		} else break;

		curRow = upRow;
	}

	// Row: Down
	curRow = row;
	while (curRow < size - 1) {
		let downRow = curRow + 1;

		if (squares2D[row][col] === squares2D[downRow][col]) {
			positions.push({ row: downRow, col: col });
			count++;
		} else break;

		curRow = downRow;
	}

	if (count === winSize) return positions;

	return false;
}

function checkWinTopLeftToBottomRightCross(squares2D, winSize, row, col) {
	const positions = [{ row, col }];
	let size = squares2D.length;
	let count = 1;

	//  TopLeft
	let curRow = row;
	let curCol = col;

	while (curRow > 0 && curCol > 0) {
		let upRow = curRow - 1;
		let leftCol = curCol - 1;

		if (squares2D[row][col] === squares2D[upRow][leftCol]) {
			positions.push({ row: upRow, col: leftCol });
			count++;
		} else break;

		curRow = upRow;
		curCol = leftCol;
	}

	// Bottom Right
	curRow = row;
	curCol = col;

	while (curRow < size - 1 && curCol < size - 1) {
		let downRow = curRow + 1;
		let rightCol = curCol + 1;

		if (squares2D[row][col] === squares2D[downRow][rightCol]) {
			positions.push({ row: downRow, col: rightCol });
			count++;
		} else break;

		curRow = downRow;
		curCol = rightCol;
	}

	if (count === winSize) return positions;

	return false;
}

function checkWinTopRightToBottomLeftCross(squares2D, winSize, row, col) {
	const positions = [{ row, col }];
	let size = squares2D.length;
	let count = 1;

	// Top Right
	let curRow = row;
	let curCol = col;

	while (curRow > 0 && curCol < size - 1) {
		let upRow = curRow - 1;
		let rightCol = curCol + 1;

		if (squares2D[row][col] === squares2D[upRow][rightCol]) {
			positions.push({ row: upRow, col: rightCol });
			count++;
		} else break;

		curRow = upRow;
		curCol = rightCol;
	}

	// Bottom Left
	curRow = row;
	curCol = col;
	while (curRow < size - 1 && curCol > 0) {
		let downRow = curRow + 1;
		let leftCol = curCol - 1;

		if (squares2D[row][col] === squares2D[downRow][leftCol]) {
			positions.push({ row: downRow, col: leftCol });
			count++;
		} else break;

		curRow = downRow;
		curCol = leftCol;
	}

	if (count === winSize) return positions;

	return false;
}

function calculateWinner(squares1D, curPos, winSize) {
	const size = Math.sqrt(squares1D.length);
	let squares2D = convert1DTo2DArray(squares1D);
	const { row, col } = conver1DTo2DPosition(curPos, size);

	if (isNaN(row) || isNaN(col)) {
		return false;
	}

	const positions2D =
		checkWinRow(squares2D, winSize, row, col) ||
		checkWinCol(squares2D, winSize, row, col) ||
		checkWinTopLeftToBottomRightCross(squares2D, winSize, row, col) ||
		checkWinTopRightToBottomLeftCross(squares2D, winSize, row, col);

	if (positions2D) {
		const positions = positions2D.map(function (pos) {
			return conver2DTo1DPosition(pos, size);
		});
		const winner = squares1D[positions[0]];

		return {
			positions,
			winner,
		};
	}

	return false;
}

function Game({ size, winSize }) {
	const [history, setHistory] = useState([
		{
			squares: Array(size * size).fill(null),
			curPos: null,
			countEmpty: size * size,
		},
	]);

	const [stepNumber, setStepNumber] = useState(0);
	const [xIsNext, setXIsNext] = useState(true);
	const [isAscending, setIsAscending] = useState(true);

	const handleClick = (i) => {
		const currentHistory = history.slice(0, stepNumber + 1);
		const current = currentHistory[currentHistory.length - 1];
		const squares = current.squares.slice();
		const curPos = current.curPos;
		const countEmpty = current.countEmpty;

		if (calculateWinner(squares, curPos, winSize) || squares[i]) {
			return;
		}
		squares[i] = xIsNext ? "X" : "O";

		setHistory((history) =>
			history.concat([
				{
					squares: squares,
					curPos: i,
					countEmpty: countEmpty - 1,
				},
			])
		);

		setStepNumber(history.length);

		setXIsNext((xIsNext) => !xIsNext);
	};

	const jumpTo = (step) => {
		setStepNumber(step);
		setXIsNext(step % 2 === 0);
	};

	const handleSort = () => {
		setIsAscending((isAscending) => !isAscending);
	};

	const render = () => {
		const current = history[stepNumber];
		const checkWinner = calculateWinner(
			current.squares,
			current.curPos,
			winSize
		);

		const moves = history.map((step, move) => {
			const { row, col } = conver1DTo2DPosition(step.curPos, size);
			let postMessage = `${col + 1}, ${row + 1}`;

			const desc = move
				? `Go to move #${move} (col, row) = (${postMessage})`
				: "Go to game start";
			return (
				<li key={move}>
					<button
						className={stepNumber === move ? "bold" : ""}
						onClick={() => jumpTo(move)}>
						{desc}
					</button>
				</li>
			);
		});

		let winnerPositions = undefined;

		let status;
		if (checkWinner) {
			winnerPositions = checkWinner.positions;
			status = "Winner: " + checkWinner.winner;
		} else {
			if (current.countEmpty === 0) {
				status = "A draw";
			} else {
				status = "Next player: " + (xIsNext ? "X" : "O");
			}
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						winnerPositions={winnerPositions}
						curPos={current.curPos}
						onClick={(i) => {
							handleClick(i);
						}}
					/>
				</div>
				<div className="game-info">
					<div>
						<button className={"btn"} onClick={handleSort}>
							Sort
							{isAscending ? (
								<FontAwesomeIcon
									className="icon-up"
									icon={faSortAsc}
								/>
							) : (
								<FontAwesomeIcon
									className="icon-down"
									icon={faSortDesc}
								/>
							)}
						</button>
					</div>
					<div>{status}</div>
					<ol>{isAscending ? moves : moves.reverse()}</ol>
				</div>
			</div>
		);
	};

	return render();
}

export default Game;
