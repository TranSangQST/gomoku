import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faL, faSortAsc, faSortDesc} from "@fortawesome/free-solid-svg-icons";


import Board from "../Board";

import "./Game.css";


function find2DPosition(pos, size) {

	// console.log("pos: ", pos)
	if(pos !== 0 && !pos){
		return {x: isNaN, y: isNaN}
	}

	// console.log("pos: ", pos); 
	const x = Math.floor(pos/size);
	const y = pos % size;

	return {x, y};
}


function convert1DTo2DArray(arr) {
	const arr1D = [...arr];
	const arr2D = [];
	while(arr1D.length) 
		arr2D.push(arr1D.splice(0,3));
	return arr2D;
}


function checkWin(squares, winSize, x, y) {

	let size = Math.sqrt(squares.length);
	console.log("new squares: ", squares);
	console.log({x, y});

	let d = 0;
	let k = x;
	let h;

	console.log("k=", k);

	
	// console.log(" squares[x][y]: ",  squares[x][y]);
	// console.log(" squares[k][y]: ",  squares[k][y]);
	// // kiểm tra hàng
	while (k >= 0 && k < size && squares[k][y] === squares[x][y]) {
		d++;
		k++;
	}
	k = x - 1;

	// console.log(" squares[x][y]: ",  squares[x][y]);
	// console.log(" squares[k][y]: ",  squares[k][y]);
	while (k >= 0 && k < size && squares[k][y] === squares[x][y]) {
		d++;
		k--;
	}
	if (d >= winSize) return true;
	d = 0; h = y;
	// kiểm tra cột
	while(h >= 0 && h < size && squares[x][h] === squares[x][y]) {
		d++;
		h++;
	}
	h = y - 1;
	while(h >= 0 && h < size && squares[x][h] === squares[x][y]) {
		d++;
		h--;
	}
	if (d >= winSize) return true;
	// kiểm tra đường chéo 1
	h = x; k = y; d = 0;
	while (k >= 0 && k < size && h >= 0 && h < size && squares[x][y] === squares[h][k]) {
		d++;
		h++;
		k++;
	}
	h = x - 1; k = y - 1;
	while (k >= 0 && k < size && h >= 0 && h < size && squares[x][y] === squares[h][k]) {
		d++;
		h--;
		k--;
	}
	if (d >= winSize) return true;
	// kiểm tra đường chéo 2
	h = x; k = y; d = 0;
	while (k >= 0 && k < size && h >= 0 && h < size && squares[x][y] === squares[h][k]) {
		d++;
		h++;
		k--;
	}
	h = x - 1; k = y + 1;
	while (k >= 0 && k < size && h >= 0 && h < size && squares[x][y] === squares[h][k]) {
		d++;
		h--;
		k++;
	}

	console.log("d=", d);
	console.log("winSize=", winSize);

	if (d >= winSize) return true;
	// nếu không đương chéo nào thỏa mãn thì trả về false.
	return false;
}


function calculateWinner(squares, curPos, winSize) {
	
	const size = Math.sqrt(squares.length);
	let newSquares = convert1DTo2DArray(squares);
	const {x, y} = find2DPosition(curPos, size);
	

	// console.log({x,y});
	if(isNaN(x) || isNaN(y)) {
		return false;
	}

	const res = checkWin(newSquares, winSize, x, y);


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

	// console.log("history: ", history);

  
	const handleClick = (i) => {

	//   console.log("click tai: ", find2DPosition(i, size));


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
			// console.log("WIN");
			status = "Winner: " + winner;
		} else {

			// console.log("current count empty:", current.countEmpty);
			if(current.countEmpty === 0) {
				// console.log("HOA");
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