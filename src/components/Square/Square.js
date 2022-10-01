import "./Square.css";

function Square({ value, isWinSquare, isCurPos, onClick }) {
	// console.log("onclick in sq: ", onClick);

	const render = () => {
		let className1 = isWinSquare ? "square-winner" : "";
		let className2 = isCurPos ? "square-current" : "";

		let className = `square ${className1} ${className2}`;

		return (
			<button className={className} onClick={onClick}>
				{value}
			</button>
		);
	};

	return render();
}

export default Square;
