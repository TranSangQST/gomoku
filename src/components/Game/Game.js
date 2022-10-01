import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faSortAsc, faSortDesc } from "@fortawesome/free-solid-svg-icons";

import Board from "../Board";

import "./Game.css";
import { calculateWinner } from "../../utils";

function Game({ winSize }) {
	const defaultXisNext = true;
	const defaultSortAscending = true;
	const defaultSize = 5;
	const defaultIsStart = false;

	const [history, setHistory] = useState([
		{
			squares: Array(defaultSize).fill(Array(defaultSize).fill(null)),
			curPos: { row: null, col: null },
			countEmpty: defaultSize * defaultSize,
		},
	]);

	const [stepNumber, setStepNumber] = useState(0);
	const [xIsNext, setXIsNext] = useState(defaultXisNext); // true
	const [isAscending, setIsAscending] = useState(defaultSortAscending); // true

	const [isStart, setIsStart] = useState(defaultIsStart); // false
	const [rowSize, setRowSize] = useState(defaultSize); // 0
	const [colSize, setColSize] = useState(defaultSize); // 0

	const handleSquareClick = (row, col) => {
		if (!isStart) {
			return;
		}

		// console.group("handleSquareClick");

		// console.log(`Click at: ${row} ${col}`);

		const currentHistory = history.slice(0, stepNumber + 1);
		const current = currentHistory[currentHistory.length - 1];
		const squares = current.squares.slice();

		// console.log("History: ", history);
		// console.log("currentHistory: ", currentHistory);
		// console.log("current: ", current);
		// console.log("squares: ", squares);
		// console.log("squares[0]: ", squares[0]);
		// console.log("squares[0][0]: ", squares[0][0]);

		const countEmpty = current.countEmpty;
		// console.log("old curPos: ", curPos);
		// console.log("old countEmpty: ", countEmpty);

		if (
			calculateWinner(
				current.squares,
				rowSize,
				colSize,
				current.curPos.row,
				current.curPos.col,
				winSize
			) ||
			squares[row][col]
		) {
			return;
		}

		// newSquares[row][col] = xIsNext ? "X" : "O"; // KO ĐÚNG
		// FIX:
		let newSquares = squares.map((rows, index1) => {
			return rows.map((cell, index2) => {
				if (index1 === row && index2 === col) {
					return xIsNext ? "X" : "O";
				}
				return cell;
			});
		});

		setHistory((history) =>
			history.concat([
				{
					squares: newSquares,
					curPos: { row, col },
					countEmpty: countEmpty - 1,
				},
			])
		);
		setStepNumber(history.length);
		setXIsNext((xIsNext) => !xIsNext);

		// console.groupEnd();
	};

	const jumpTo = (step) => {
		setStepNumber(step);
		setXIsNext(step % 2 === 0);
	};

	const handleSort = () => {
		setIsAscending((isAscending) => !isAscending);
	};

	const handleInputRowSizeChange = (e) => {
		let value = e.target.value;
		setRowSize(value);
	};

	const handleInputColSizeChange = (e) => {
		let value = e.target.value;
		setColSize(value);
	};

	const handleStartGame = () => {
		// console.group(`handle Start/Setting Game`);
		if (isStart) {
			setHistory([
				{
					squares: Array(defaultSize).fill(
						Array(defaultSize).fill(null)
					),
					curPos: { row: null, col: null },
					countEmpty: defaultSize * defaultSize,
				},
			]);
		} else {
			let customRowSize = parseInt(rowSize) || 0;
			customRowSize = customRowSize >= 0 ? customRowSize : 0;
			setRowSize(customRowSize);

			let customColSize = parseInt(colSize) || 0;
			customColSize = customColSize >= 0 ? customColSize : 0;

			setColSize(customColSize);

			setHistory([
				{
					squares: Array(customRowSize).fill(
						Array(customColSize).fill(null)
					),
					curPos: { row: null, col: null },
					countEmpty: customRowSize * customColSize,
				},
			]);
		}

		// console.groupEnd();

		setXIsNext(defaultXisNext);
		setStepNumber(0);
		setIsStart(!isStart);
	};

	const render = () => {
		console.group("Render GAME");
		console.log("history: ", history);
		const current = history[stepNumber];

		console.log("current: ", current);
		console.log("current.squares: ", current.squares);
		console.log("rowSize: ", rowSize);
		console.log("colSize: ", colSize);
		console.log("current.curPos.row: ", current.curPos.row);
		console.log("current.curPos.col: ", current.curPos.col);

		const checkWinner = calculateWinner(
			current.squares,
			rowSize,
			colSize,
			current.curPos.row,
			current.curPos.col,
			winSize
		);

		const moves = history.map((step, move) => {
			const { row, col } = step.curPos;
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
				if (!isStart) {
					status = "";
				}
			} else {
				status = "Next player: " + (xIsNext ? "X" : "O");
			}
		}

		console.groupEnd();
		return (
			<div className="game">
				<div className="game-setting">
					<div className="game-setting-size">
						<span>Row size: </span>
						<input
							readOnly={isStart}
							name="row"
							type="number"
							pattern="[0-9]*"
							inputMode="numeric"
							onChange={handleInputRowSizeChange}
							value={rowSize}
						/>
					</div>
					<div className="game-setting-size">
						<span>Col size: </span>
						<input
							readOnly={isStart}
							name="row"
							type="number"
							pattern="[0-9]*"
							inputMode="numeric"
							onChange={handleInputColSizeChange}
							value={colSize}
						/>
					</div>
					<div className="game-setting-col">
						<button
							className="game-setting-start-btn"
							onClick={handleStartGame}>
							{isStart ? "Setting" : "Start"}
						</button>
					</div>
				</div>
				<div className="game-guide">
					Press
					<span className="game-guide-highlight">
						{isStart ? " Setting " : " Start "}
					</span>
					Button to{" "}
					<span className="game-guide-highlight">
						{isStart ? " Change Size " : " Play "}
					</span>
				</div>
				<div className="game-area">
					<div className="game-board">
						<Board
							squares={current.squares}
							rowSize={rowSize}
							colSize={colSize}
							winnerPositions={winnerPositions}
							curPos={current.curPos}
							onClick={(row, col) => {
								handleSquareClick(row, col);
							}}
						/>
					</div>
					{isStart && (
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
							<div className="status">{status}</div>
							<ol>{isAscending ? moves : moves.reverse()}</ol>
						</div>
					)}
				</div>
			</div>
		);
	};

	return render();
}

export default Game;
