import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faSortAsc, faSortDesc } from "@fortawesome/free-solid-svg-icons";

import Board from "../Board";

import "./Game.css";

import {
	conver1DTo2DPosition,
	conver2DTo1DPosition,
	convert1DTo2DArray,
	calculateWinner,
} from "../../utils";

function Game({ size, winSize }) {
	const [history, setHistory] = useState([
		{
			squares: Array(5 * 5).fill(null),
			curPos: null,
			countEmpty: 5 * 5,
		},
	]);

	const [isStart, setIsStart] = useState(false);

	const [stepNumber, setStepNumber] = useState(0);
	const [xIsNext, setXIsNext] = useState(true);
	const [isAscending, setIsAscending] = useState(true);

	const [boardSize, setBoardSize] = useState({
		row: 5,
		col: 5,
	});

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

	const handleStartGame = () => {
		if (isStart) {
			setHistory([
				{
					squares: Array(0 * 0).fill(null),
					curPos: null,
					countEmpty: 0 * 0,
				},
			]);
		} else {
			const rowSize = boardSize.row || 0;
			const colSize = boardSize.col || 0;
			console.log("row: ", rowSize);
			console.log("col: ", colSize);
			setHistory([
				{
					squares: Array(rowSize * colSize).fill(null),
					curPos: null,
					countEmpty: rowSize * colSize,
				},
			]);
		}
		setIsStart(!isStart);
	};

	const handleInputSizeRowChange = (e) => {
		let value = e.target.value;
		setBoardSize((prev) => ({
			col: prev.col,
			row: value,
		}));
	};
	const handleInputSizeColChange = (e) => {
		let value = e.target.value;
		if (!value) {
			return;
		}
		setBoardSize((prev) => ({
			row: prev.row,
			col: value,
		}));
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
				<div className="game-setting">
					<div className="game-setting-row">
						<span>Row size: </span>
						<input
							readOnly={isStart}
							name="row"
							type="number"
							pattern="[0-9]*"
							inputMode="numeric"
							onChange={(e) => handleInputSizeRowChange(e)}
							value={boardSize.row}
						/>
					</div>
					<div className="game-setting-col">
						<span>Col size: </span>
						<input
							readOnly={isStart}
							name="col"
							type="number"
							pattern="[0-9]*"
							inputMode="numeric"
							onChange={(e) => handleInputSizeColChange(e)}
							value={boardSize.col}
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
				<div className="game-area">
					<div className="game-board">
						<Board
							squares={current.squares}
							rowSize={parseInt(boardSize.row || 0)}
							colSize={parseInt(boardSize.col || 0)}
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
						<div className="status">{status}</div>
						<ol>{isAscending ? moves : moves.reverse()}</ol>
					</div>
				</div>
			</div>
		);
	};

	return render();
}

export default Game;
