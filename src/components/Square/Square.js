
import "./Square.css"



function Square({value, onClick}) {
    // console.log("onclick in sq: ", onClick);
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
}

export default Square;