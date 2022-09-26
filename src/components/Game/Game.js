import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faL, faSortAsc, faSortDesc} from "@fortawesome/free-solid-svg-icons";


import Board from "../Board";

import "./Game.css";


function conver1DTo2DPosition(pos, size) {

	// console.log("pos: ", pos)
	if(pos !== 0 && !pos){
		return {row: isNaN, col: isNaN}
	}

	// console.log("pos: ", pos); 
	const row = Math.floor(pos/size);
	const col = pos % size;

	return {row, col};
}


function conver2DTo1DPosition({row, col}, size) {
	return row * size + col;
}


function convert1DTo2DArray(arr) {
	const size = Math.sqrt(arr.length);
	const arr1D = [...arr];
	const arr2D = [];
	while(arr1D.length) 
		arr2D.push(arr1D.splice(0, size));
	return arr2D;
}


function checkWinRow(squares, winSize, row, col) {


	const positions = [{row, col}];

	let size = squares.length;
	

	let count = 1;

	console.group("ROW: pos=", {row, col});
	console.log("new squares: ", squares);


	console.log("LEFT");
	let curCol = col;
	
	while(curCol > 0) {
		let leftCol = curCol - 1;

		console.log("leftCol: ", leftCol);
		console.log(`squares[${row}][${leftCol}]: `, squares[row][leftCol]);

		if(squares[row][col] === squares[row][leftCol]) {
			positions.push({row: row, col: leftCol});
			count++;
		}
		else
			break;

		curCol = leftCol;

	}


	console.log("RIGHT");
	curCol = col;
	
	while(curCol < size - 1) {
		let rightCol = curCol + 1;

		console.log("rightCol: ", rightCol);
		console.log(`squares[${row}][${rightCol}]: `, squares[row][rightCol]);

		if(squares[row][col] === squares[row][rightCol]) {
			positions.push({row: row, col: rightCol});
			count++;
		}
		else
			break;

		curCol = rightCol;

	}


	console.log("count=", count);
	console.log("winSize=", winSize);

	console.groupEnd();
	

	if (count === winSize)
		return positions;

	return false;


}

function checkWinCol(squares, winSize, row, col) {

	const positions = [{row, col}];

	let size = squares.length;
	

	let count = 1;

	console.group("ROW: pos=", {row, col});
	console.log("new squares: ", squares);


	console.log("UP");
	let curRow = row;
	
	while(curRow > 0) {
		let upRow = curRow - 1;

		console.log("upRow: ", upRow);
		console.log(`squares[${upRow}][${col}]: `, squares[upRow][col]);

		if(squares[row][col] === squares[upRow][col]) {
			positions.push({row: upRow, col: col});
			count++;
		}
		else
			break;

		curRow = upRow;

	}


	console.log("DOWN");
	curRow = row;
	
	while(curRow < size - 1) {
		let downRow = curRow + 1;

		console.log("downRow: ", downRow);
		console.log(`squares[${downRow}][${col}]: `, squares[downRow][col]);

		if(squares[row][col] === squares[downRow][col]) {
			positions.push({row: downRow, col: col});
			count++;
		}
		else
			break;

		curRow = downRow;

	}

	console.log("count=", count);
	console.log("winSize=", winSize);

	console.groupEnd();
	

	if (count === winSize)
		return positions;

	return false;


}

function checkWinTopLeftToBottomRightCross(squares, winSize, row, col) {

	const positions = [{row, col}];

	let size = squares.length;
	

	let count = 1;

	console.group("ROW: pos=", {row, col});
	console.log("new squares: ", squares);


	console.log("TOP LEFT");
	let curRow = row;
	let curCol = col;
	
	while(curRow > 0 && curCol > 0) {
		let upRow = curRow - 1;
		let leftCol = curCol - 1;

		console.log("upRow: ", upRow);
		console.log("leftCol: ", leftCol);
		console.log(`squares[${upRow}][${leftCol}]: `, squares[upRow][leftCol]);

		if(squares[row][col] === squares[upRow][leftCol]) {
			positions.push({row: upRow, col: leftCol});
			count++;
		}
		else
			break;

		curRow = upRow;
		curCol = leftCol;

	}


	console.log("BOTTOM RIGHT");
	
	curRow = row;
	curCol = col;
	
	while(curRow < size - 1 && curCol < size - 1) {
		let downRow = curRow + 1;
		let rightCol = curCol + 1;

		console.log("downRow: ", downRow);
		console.log("rightCol: ", rightCol);
		console.log(`squares[${downRow}][${rightCol}]: `, squares[downRow][rightCol]);

		if(squares[row][col] === squares[downRow][rightCol]) {
			positions.push({row: downRow, col: rightCol});
			count++;
		}
		else
			break;

		curRow = downRow;
		curCol = rightCol;

	}



	console.log("count=", count);
	console.log("winSize=", winSize);

	console.groupEnd();
	

	if (count === winSize)
		return positions;

	return false;


}


function checkWinTopRightToBottomLeftCross(squares, winSize, row, col) {

	const positions = [{row, col}];

	let size = squares.length;
	

	let count = 1;

	console.group("ROW: pos=", {row, col});
	console.log("new squares: ", squares);


	console.log("TOP RIGHT");
	let curRow = row;
	let curCol = col;
	
	while(curRow > 0 && curCol < size - 1) {
		let upRow = curRow - 1;
		let rightCol = curCol + 1;

		console.log("upRow: ", upRow);
		console.log("rightCol: ", rightCol);
		console.log(`squares[${upRow}][${rightCol}]: `, squares[upRow][rightCol]);

		if(squares[row][col] === squares[upRow][rightCol]) {
			positions.push({row: upRow, col: rightCol});
			count++;
		}
		else
			break;

		curRow = upRow;
		curCol = rightCol;

	}


	console.log("BOTTOM LEFT");
	
	curRow = row;
	curCol = col;
	while(curRow < size - 1 && curCol > 0) {
		let downRow = curRow + 1;
		let leftCol = curCol - 1;

		console.log("downRow: ", downRow);
		console.log("leftCol: ", leftCol);
		console.log(`squares[${downRow}][${leftCol}]: `, squares[downRow][leftCol]);

		if(squares[row][col] === squares[downRow][leftCol]) {
			positions.push({row: downRow, col: leftCol});
			count++;
		}
		else
			break;

		curRow = downRow;
		curCol = leftCol;

	}



	console.log("count=", count);
	console.log("winSize=", winSize);

	console.groupEnd();
	

	if (count === winSize)
		return positions;

	return false;


}

function calculateWinner(squares, curPos, winSize) {
	
	const size = Math.sqrt(squares.length);
	let newSquares = convert1DTo2DArray(squares);
	const {row, col} = conver1DTo2DPosition(curPos, size);
	

	// console.log({row, col});
	if(isNaN(row) || isNaN(col)) {
		return false;
	}

	const positions2D = checkWinRow(newSquares, winSize, row, col) || checkWinCol(newSquares, winSize, row, col) 
				|| checkWinTopLeftToBottomRightCross(newSquares, winSize, row, col)
				|| checkWinTopRightToBottomLeftCross(newSquares, winSize, row, col);




	if(positions2D) {
		const positions = positions2D.map(function(pos){
			return conver2DTo1DPosition(pos, size);
		});
		const winner = squares[positions[0]];
		
		console.log("WIN POS: ", positions);
		console.log("winner: ", winner);

		return {
			positions,
			winner			
		}
	}

	return false;
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

	// console.log("history: ", history);

  
	const handleClick = (i) => {

	//   console.log("click tai: ", conver1DTo2DPosition(i, size));


	  const currentHistory = history.slice(0, stepNumber + 1);
	  const current = currentHistory[currentHistory.length - 1];
	  const squares = current.squares.slice();
	  const curPos = current.curPos;
	  const countEmpty = current.countEmpty;
	//   console.log("calculateWinner(squares): ", calculateWinner(squares, curPos, winSize))
	//   console.log("squares[i]: ", squares[i])

	  // nếu calculateWinner(squares) (==> win) =>> stop (ko hiển thị nút vừa đánh)
	  // hoạc nếu như squares[i] true (tức đánh lại vào vị trí đã đánh) => stop (ko hiển thị đè lên nút vừa đánh)

	//   console.log("current.curPos inside: ", current.curPos);
	  if (calculateWinner(squares, curPos, winSize) || squares[i]) {
		// console.log("return")
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
		// console.log("current.curPos: ", current.curPos);
		const checkWinner = calculateWinner(current.squares, current.curPos, winSize);
	
	
		const moves = history.map((step, move) => {
			const {row, col} = conver1DTo2DPosition(current.curPos, size);
			const desc = move ?
				`Go to move #${move} (col, row) = (${col+1}, ${row+1})` :
				'Go to game start';
			return (
				<li key={move}>
					<button className={stepNumber === move ? "bold" : ""} onClick={() => jumpTo(move)}>{desc}</button>
				</li>
			);
		});
	
		let winnerPositions = undefined;

		let status;
		if (checkWinner) {
			console.group("WIN");
			console.log("checkWinner.positions: ", checkWinner.positions);
			winnerPositions = checkWinner.positions;
			status = "Winner: " + checkWinner.winner;
			console.groupEnd();
		} else {

			// console.log("current count empty:", current.countEmpty);
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
					winnerPositions={winnerPositions}
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