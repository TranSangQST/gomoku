
import "./Square.css"



function Square({value, isWinSquare, onClick}) {
    // console.log("onclick in sq: ", onClick);
    return (
        <button className={isWinSquare ? "square square-winner" : "square"} onClick={onClick}>
            {value}
        </button>
    );
}

export default Square;