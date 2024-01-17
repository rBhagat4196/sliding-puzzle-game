/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import arrayGeneration from "./arrayGeneration";
import CalculateBackgroundPosition from "./CalculateBackgroundPosition";
import { useAppContext } from "../context/scoreContext";
const GeneratePieces = ({ gridSize, imageUrl, showNumber }) => {
  const {dispatch} = useAppContext(); 
  const [ticking,setTicking] = useState(false);
  const [array, setArray] = useState([]);
  const [reset,setReset] = useState(true);
  const [intervalId,setIntervalId] = useState(null);
  useEffect(() => {
    setArray(arrayGeneration(gridSize));
    setTicking(false);
    setIntervalId(null);
    if (intervalId) {
      clearInterval(intervalId,1000);
    }
    dispatch({type : 'UPDATE_CURRENT_SCORE' , payload : 0})
  }, [gridSize, imageUrl,reset]);

  const pieceSize = 500 / gridSize; // Adjust the size based on the container size
  const bgSize = gridSize * 100;
  const gridTemplateColumns = `repeat(${gridSize}, ${pieceSize}px)`;
  const gridTemplateRows = `repeat(${gridSize}, ${pieceSize}px)`;

  const handleClick = (e) => {

    if (!ticking) {
      setTicking(true);
      if (!intervalId) {
        setIntervalId(setInterval(() => dispatch({ type: 'UPDATE_CURRENT_SCORE' ,payload:1}), 1000));
      }
    }
    const target = e.target;
    const id = parseInt(target.getAttribute("value"));
    // console.log(array)
    // console.log(id)
    const index = Array.from(array).findIndex((piece) => piece === id);
    const emptyIndex = Array.from(array).findIndex((piece) => piece === " ");

    if (isAdjacent(index, emptyIndex)) {
      const newArray = [...array]; // Create a deep copy of the array
      newArray[index] = " ";
      newArray[emptyIndex] = id;
      if (solved(newArray)) {
         clearInterval(intervalId,1000);
         dispatch({type: 'UPDATE_HIGH_SCORE',payload : gridSize});
      }
      setArray(newArray);
    }
  };

  function isAdjacent(index1, index2) {
    const row1 = Math.floor(index1 / gridSize);
    const col1 = index1 % gridSize;
    const row2 = Math.floor(index2 / gridSize);
    const col2 = index2 % gridSize;

    return (
      (Math.abs(row1 - row2) === 1 && col1 === col2) ||
      (Math.abs(col1 - col2) === 1 && row1 === row2)
    );
  }

  function solved(array) {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] !== null && parseInt(array[i]) !== i + 1) {
        return false;
      }
    }
    return true;
  }

  const handleRestart = ()=>{
    clearInterval(intervalId,1000);
    setReset((prev) => !prev);
    dispatch({ type: 'UPDATE_CURRENT_SCORE',payload : 0})
  }

  return (
    <>
    <div className="flex flex-col">

    <div
      className="grid gap-1 border-4 border-[#b6744a] rounded-lg"
      style={!solved(array) ? { gridTemplateColumns, gridTemplateRows } : {}}>
      {!solved(array) &&
        array.map((value) =>
          value !== " " ? (
            <div
              key={value}
              className={`w-[${pieceSize}px] h-[${pieceSize}px] text-center text-white flex justify-center items-center`}
              style={{
                backgroundImage: `url('${imageUrl}')`,
                backgroundPosition: CalculateBackgroundPosition(
                  gridSize,
                  value - 1
                  ),
                backgroundSize: `${bgSize}%  ${bgSize}%`,
                border: "1px solid #ccc",
              }}
              value={value}
              onClick={handleClick}
            >
              {showNumber && value}
            </div>
          ) : (
            <div
              key={value}
              className={`w-[${pieceSize}px] h-[${pieceSize}px] bg-[#c29478]`}
              />
              )
              )}
      {solved(array) && (
        <img src={imageUrl} className="w-[500px] h-[500px]"></img>
        )}
    </div>
       <button className="mx-auto mt-[10px] rounded-lg h-[40px] w-[100px] p-1 bg-blue-400 font-bold text-white border-blue-500 border-2" onClick={handleRestart}>Restart</button>
        </div>
    </>
  );
};

export default GeneratePieces;
