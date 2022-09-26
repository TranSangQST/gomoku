import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faL, faSortAsc, faSortDesc} from "@fortawesome/free-solid-svg-icons";


import Board from "../Board";

import "./Game.css";


// function calculateWinner(squares, winSize) {
// 	const lines = [
// 	  [0, 1, 2],
// 	  [3, 4, 5],
// 	  [6, 7, 8],
// 	  [0, 3, 6],
// 	  [1, 4, 7],
// 	  [2, 5, 8],
// 	  [0, 4, 8],
// 	  [2, 4, 6]
// 	];
// 	for (let i = 0; i < lines.length; i++) {
// 	  const [a, b, c] = lines[i];
// 	  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
// 		return squares[a];
// 	  }
// 	}
// 	return null;
//   }


function find2DPosition(pos, size) {
	const x = Math.floor(pos/size);
	const y = pos % size;
	return {x, y};
}


// Row
function calculateWinnerRow(squares, curPos, winSize) {
	const size = Math.sqrt(squares.length);
	const minColPos = curPos - curPos % size;
	const maxColPos = minColPos + size - 1;
	
	let count = 1;
	
//	console.group("Row");
//	console.group(curPos);

//	console.log("minColPos: ", minColPos);
//	console.log("maxColPos: ", maxColPos);	
	
	// left
	let pos = curPos;
	while (pos > minColPos) {
		let leftPos = pos - 1;
//		console.log("pos: ", pos);
//		console.log("squares[pos]: ", squares[pos]);
//		console.log("leftPos: ", leftPos);
//		console.log("squares[leftPos]: ", squares[leftPos]);

		if(squares[leftPos] === squares[pos])
		{
			count++;
//			console.log("count=", count);
		}
		else
			break;
		pos=leftPos;
	}

	//right
	pos = curPos;
	while (pos < maxColPos) {
		let rightPos = pos + 1;
//		console.log("pos: ", pos);
//		console.log("squares[pos]: ", squares[pos]);
//		console.log("rightPos: ", rightPos);
//		console.log("squares[rightPos]: ", squares[rightPos]);

		if(squares[rightPos] === squares[pos])
		{
			count++;
//			console.log("count=", count);
		}
		else
			break;
		pos=rightPos;
	}

//	console.log("count=", count);
//	console.log("winSize=", winSize);


//	console.groupEnd();
//	console.groupEnd();

	if (count === winSize)
		return true;
	
	return false;

}

// Col
function calculateWinnerCol(squares, curPos, winSize) {
	const size = Math.sqrt(squares.length);
	const minRowPos = curPos % size;
	const maxRowPos = minRowPos + (size - 1)*size;
	
	let count = 1;
	
//	console.group("Col");
//	console.group(curPos);

//	console.log("minRowPos: ", minRowPos);
//	console.log("maxRowPos: ", maxRowPos);
	
	// left
	let pos = curPos;
	while (pos > minRowPos) {
		let upPos = pos - size;
//		console.log("pos: ", pos);
//		console.log("squares[pos]: ", squares[pos]);
//		console.log("upPos: ", upPos);
//		console.log("squares[upPos]: ", squares[upPos]);

		if(squares[upPos] === squares[pos])
		{
			count++;
//			console.log("count=", count);
		}
		else
			break;
		pos=upPos;
	}

	//right
	pos = curPos;
	while (pos < maxRowPos) {
		let downPos = pos + size;
//		console.log("pos: ", pos);
//		console.log("squares[pos]: ", squares[pos]);
//		console.log("downPos: ", downPos);
//		console.log("squares[downPos]: ", squares[downPos]);

		if(squares[downPos] === squares[pos])
		{
			count++;
//			console.log("count=", count);
		}
		else
			break;
		pos=downPos;
	}

//	console.log("count=", count);
//	console.log("winSize=", winSize);


//	console.groupEnd();
//	console.groupEnd();

	if (count === winSize)
		return true;
	
	return false;

}

function calculateWinner(squares, curPos, winSize) {
	
	let res = calculateWinnerRow(squares, curPos, winSize) || calculateWinnerCol(squares, curPos, winSize); 

	return res;
}


function Game({size, winSize}){

	const [history, setHistory] = useState([
		{
			squares: Array(size*size).fill(null),
			curPos: null,
			countEmpty: size*size
		}
	  ],);

	const [stepNumber, setStepNumber] = useState(0);
	const [xIsNext, setXIsNext] = useState(true);
	const [isAscending, setIsAscending] = useState(true);

	console.log("history: ", history);

  
	const handleClick = (i) => {

//	//   console.log("click tai: ", find2DPosition(i, size));


	  const currentHistory = history.slice(0, stepNumber + 1);
	  const current = currentHistory[currentHistory.length - 1];
	  const squares = current.squares.slice();
	  const curPos = current.curPos;
	  const countEmpty = current.countEmpty;
//	//   console.log("calculateWinner(squares): ", calculateWinner(squares, curPos, winSize))
//	//   console.log("squares[i]: ", squares[i])

	  // nếu calculateWinner(squares) (==> win) =>> stop (ko hiển thị nút vừa đánh)
	  // hoạc nếu như squares[i] true (tức đánh lại vào vị trí đã đánh) => stop (ko hiển thị đè lên nút vừa đánh)
	  if (calculateWinner(squares, curPos, winSize) || squares[i]) {
//		// console.log("return")
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
			squares: squares,
			curPos: i,
			countEmpty: countEmpty - 1
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
//		// console.log("current.curPos: ", current.curPos);
		const winner = calculateWinner(current.squares, current.curPos, winSize)
	
		const moves = history.map((step, move) => {
			const {x, y} = find2DPosition(current.curPos, size);
			const desc = move ?
				`Go to move #${move} (col, row) = (${y+1}, ${x+1})` :
				'Go to game start';
			return (
				<li key={move}>
					<button className={stepNumber === move ? "bold" : ""} onClick={() => jumpTo(move)}>{desc}</button>
				</li>
			);
		});
	
		let status;
		if (winner) {
			console.log("WIN");
			status = "Winner: " + winner;
		} else {

			console.log("current count empty:", current.countEmpty);
			if(current.countEmpty === 0) {
				console.log("HOA");
				status = "A draw";
			}
			else {
				status = "Next player: " + (xIsNext ? "X" : "O");
			}
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