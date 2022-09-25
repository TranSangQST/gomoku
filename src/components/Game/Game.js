import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSortAsc, faSortDesc} from "@fortawesome/free-solid-svg-icons";


import Board from "../Board";

import "./Game.css";


function calculateWinner(squares) {
	const lines = [
	  [0, 1, 2],
	  [3, 4, 5],
	  [6, 7, 8],
	  [0, 3, 6],
	  [1, 4, 7],
	  [2, 5, 8],
	  [0, 4, 8],
	  [2, 4, 6]
	];
	for (let i = 0; i < lines.length; i++) {
	  const [a, b, c] = lines[i];
	  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
		return squares[a];
	  }
	}
	return null;
  }

function Game({size}){

	const [history, setHistory] = useState([
		{
		  squares: Array(size*size).fill(null)
		}
	  ],);

	const [stepNumber, setStepNumber] = useState(0);
	const [xIsNext, setXIsNext] = useState(true);
	const [isAscending, setIsAscending] = useState(true);

	console.log("history: ", history);

  
	const handleClick = (i) => {
	  const currentHistory = history.slice(0, stepNumber + 1);
	  const current = currentHistory[currentHistory.length - 1];
	  const squares = current.squares.slice();
	  if (calculateWinner(squares) || squares[i]) {
		return;
	  }
	  squares[i] = xIsNext ? "X" : "O";


	//   this.setState({
	// 	// history: history.concat([
	// 	//   {
	// 	// 	squares: squares
	// 	//   }
	// 	// ]),
	// 	// stepNumber: history.length,
	// 	// xIsNext: !xIsNext
	//   });

	setHistory((history) => history.concat([
		{
			squares: squares
		}
	]));

	setStepNumber(history.length);

	setXIsNext((xIsNext) => !xIsNext);


	}
  
	const jumpTo = (step) => {
		// this.setState({
		// stepNumber: step,
		// xIsNext: (step % 2) === 0
		// });
		setStepNumber(step);
		setXIsNext((step % 2) === 0);
	}
  
	const handleSort = () => {
		setIsAscending((isAscending) => !isAscending);
	}

	const render = () => {
		//   const history = this.state.history;
		const current = history[stepNumber];
		const winner = calculateWinner(current.squares);
	
		const moves = history.map((step, move) => {
			const desc = move ?
				'Go to move #' + move :
				'Go to game start';
			return (
				<li key={move}>
					<button className={stepNumber === move ? "bold" : ""} onClick={() => jumpTo(move)}>{desc}</button>
				</li>
			);
		});
	
		let status;
		if (winner) {
			status = "Winner: " + winner;
		} else {
			status = "Next player: " + (xIsNext ? "X" : "O");
		}
  
		return (
			<div className="game">
				<div className="game-board">
					<Board
					squares={current.squares}
					onClick={i => {handleClick(i)}}
					/>
				</div>
				<div className="game-info">
					<div>
						<button className={"btn"} onClick={handleSort}>
							Sort
							{isAscending ? <FontAwesomeIcon className="icon-up" icon={faSortAsc} /> : <FontAwesomeIcon className="icon-down" icon={faSortDesc} />}

						</button>
					</div>
					<div>{status}</div>
					<ol>
						{ isAscending ? moves : moves.reverse() }
					</ol>
				</div>
			</div>
		);
	}	

	return render();
}

export default Game;