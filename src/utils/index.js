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

export {
	conver1DTo2DPosition,
	conver2DTo1DPosition,
	convert1DTo2DArray,
	calculateWinner,
};
export default calculateWinner;
