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

function Game({ winSize }) {
	const defaultXisNext = true;
	const defaultSortAscending = true;
	const defaultSize = 0;

	const [history, setHistory] = useState([
		{
			squares: Array(defaultSize * defaultSize).fill(null),
			curPos: null,
			countEmpty: defaultSize * defaultSize,
		},
	]);

	const [stepNumber, setStepNumber] = useState(0);
	const [xIsNext, setXIsNext] = useState(defaultXisNext);
	const [isAscending, setIsAscending] = useState(defaultSortAscending);

	const [isStart, setIsStart] = useState(false);
	const [size, setSize] = useState(defaultSize);

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

	const handleInputSizeChange = (e) => {
		let value = e.target.value;
		setSize(value);
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
			let customSize = size || 0;
			customSize = customSize >= 0 ? customSize : 0;
			setSize(customSize);

			setHistory([
				{
					squares: Array(customSize * customSize).fill(null),
					curPos: null,
					countEmpty: customSize * customSize,
				},
			]);
		}

		setXIsNext(defaultXisNext);
		setStepNumber(0);
		setIsStart(!isStart);
	};

	const render = () => {
		console.log("stepNumber ", stepNumber);
		console.log("history ", history);
		console.log("xIsNext ", xIsNext);
		const current = history[stepNumber];

		console.log("current: ", current);
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
					<div className="game-setting-size">
						<span>Row size: </span>
						<input
							readOnly={isStart}
							name="row"
							type="number"
							pattern="[0-9]*"
							inputMode="numeric"
							onChange={handleInputSizeChange}
							value={size}
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
					Press Setting Button to change size
				</div>
				<div className="game-area">
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
			</div>
		);
	};

	return render();
}

export default Game;
