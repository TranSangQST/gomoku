function checkWinRow(squares, rowSize, colSize, row, col, winSize) {
	const positions = [{ row, col }];

	let count = 1;

	// Row: Left
	let curCol = col;
	while (curCol > 0) {
		let leftCol = curCol - 1;

		if (squares[row][col] === squares[row][leftCol]) {
			positions.push({ row: row, col: leftCol });
			count++;
		} else break;
		curCol = leftCol;
	}

	// Row: Right
	curCol = col;
	while (curCol < colSize - 1) {
		let rightCol = curCol + 1;

		if (squares[row][col] === squares[row][rightCol]) {
			positions.push({ row: row, col: rightCol });
			count++;
		} else break;

		curCol = rightCol;
	}

	if (count === winSize) return positions;

	return false;
}

function checkWinCol(squares2D, rowSize, colSize, row, col, winSize) {
	const positions = [{ row, col }];

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
	while (curRow < rowSize - 1) {
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

function checkWinTopLeftToBottomRightCross(
	squares,
	rowSize,
	colSize,
	row,
	col,
	winSize
) {
	const positions = [{ row, col }];

	let count = 1;

	//  TopLeft
	let curRow = row;
	let curCol = col;

	console.group("checkWinTopLeftToBottomRightCross");

	console.log("squares: ", squares);
	console.log("rowSize: ", rowSize);
	console.log("colSize: ", colSize);
	console.log("row: ", row);
	console.log("col: ", col);
	console.log("winSize: ", winSize);

	console.log("curRow: ", curRow);
	console.log("curCol: ", curCol);

	console.group("TOP LEFT");

	console.log(`cur: (${curRow} ${curCol}) = ${squares[curRow][curCol]}`);

	while (curRow > 0 && curCol > 0) {
		let upRow = curRow - 1;
		let leftCol = curCol - 1;

		console.log(`Xet: (${upRow} ${leftCol}) = ${squares[upRow][leftCol]}`);

		if (squares[row][col] === squares[upRow][leftCol]) {
			positions.push({ row: upRow, col: leftCol });
			count++;
		} else break;

		curRow = upRow;
		curCol = leftCol;
	}

	console.groupEnd();
	// Bottom Right
	curRow = row;
	curCol = col;

	console.group("RIGHT BOTTOM");

	console.log(`cur: (${curRow} ${curCol}) = ${squares[curRow][curCol]}`);

	while (curRow < rowSize - 1 && curCol < colSize - 1) {
		let downRow = curRow + 1;
		let rightCol = curCol + 1;

		console.log(
			`Xet: (${downRow} ${rightCol}) = ${squares[downRow][rightCol]}`
		);

		if (squares[row][col] === squares[downRow][rightCol]) {
			positions.push({ row: downRow, col: rightCol });
			count++;
		} else break;

		curRow = downRow;
		curCol = rightCol;
	}

	console.log("count=", count);
	console.groupEnd();

	console.groupEnd();
	if (count === winSize) return positions;

	return false;
}

function checkWinTopRightToBottomLeftCross(
	squares2D,
	rowSize,
	colSize,
	row,
	col,
	winSize
) {
	const positions = [{ row, col }];

	let count = 1;

	// Top Right
	let curRow = row;
	let curCol = col;

	while (curRow > 0 && curCol < colSize - 1) {
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
	while (curRow < rowSize - 1 && curCol > 0) {
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

function calculateWinner(squares, rowSize, colSize, row, col, winSize) {
	console.group("calculateWinner start");

	if (row === null || col === null) {
		return false;
	}

	console.groupEnd();
	const positions =
		checkWinRow(squares, rowSize, colSize, row, col, winSize) ||
		checkWinCol(squares, rowSize, colSize, row, col, winSize) ||
		checkWinTopLeftToBottomRightCross(
			squares,
			rowSize,
			colSize,
			row,
			col,
			winSize
		) ||
		checkWinTopRightToBottomLeftCross(
			squares,
			rowSize,
			colSize,
			row,
			col,
			winSize
		);

	console.group("calculateWinner start");

	console.log("positions: ", positions);

	if (positions) {
		const winner = squares[positions[0].row][positions[0].col];

		console.log("winner: ", winner);

		console.groupEnd();
		return {
			positions,
			winner,
		};
	}

	console.groupEnd();
	return false;
}

export { calculateWinner };
export default calculateWinner;
