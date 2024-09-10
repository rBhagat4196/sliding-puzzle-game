/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import arrayGeneration from "./arrayGeneration";
import CalculateBackgroundPosition from "./CalculateBackgroundPosition";
import { useAppContext } from "../context/scoreContext";
import solveSlidingPuzzle from "../utils/ai"; // Solver function

const GeneratePieces = ({ gridSize, imageUrl, showNumber }) => {
  const { dispatch } = useAppContext();
  const [ticking, setTicking] = useState(false);
  const [array, setArray] = useState([]);
  const [reset, setReset] = useState(true);
  const [intervalId, setIntervalId] = useState(null);
  const [solving, setSolving] = useState(false);
  const [aiThinking, setAiThinking] = useState(false); // For AI thinking message
  const [timer, setTimer] = useState(0); // Timer state
  const [timerIntervalId, setTimerIntervalId] = useState(null); // Timer interval ID

  useEffect(() => {
    setArray(arrayGeneration(gridSize));
    setTicking(false);
    setIntervalId(null);
    if (intervalId) {
      clearInterval(intervalId);
    }
    dispatch({ type: "UPDATE_CURRENT_SCORE", payload: 0 });
  }, [gridSize, imageUrl, reset]);

  useEffect(() => {
    if (solving) {
      // Start the timer when solving begins
      setTimer(0);
      const id = setInterval(() => setTimer(prev => prev + 1), 1000);
      setTimerIntervalId(id);

      return () => clearInterval(id); // Cleanup timer on unmount
    } else if (timerIntervalId) {
      // Stop the timer when solving ends
      clearInterval(timerIntervalId);
    }
  }, [solving]);

  const pieceSize = 500 / gridSize; // Adjust the size based on the container size
  const bgSize = gridSize * 100;
  const gridTemplateColumns = `repeat(${gridSize}, ${pieceSize}px)`;
  const gridTemplateRows = `repeat(${gridSize}, ${pieceSize}px)`;

  const handleClick = (e) => {
    if (!ticking) {
      setTicking(true);
      if (!intervalId) {
        setIntervalId(setInterval(() => dispatch({ type: "UPDATE_CURRENT_SCORE", payload: 1 }), 1000));
      }
    }
    const target = e.target;
    const id = parseInt(target.getAttribute("value"));
    const index = Array.from(array).findIndex((piece) => piece === id);
    const emptyIndex = Array.from(array).findIndex((piece) => piece === " ");

    if (isAdjacent(index, emptyIndex)) {
      const newArray = [...array]; // Create a deep copy of the array
      newArray[index] = " ";
      newArray[emptyIndex] = id;
      if (solved(newArray)) {
        clearInterval(intervalId);
        dispatch({ type: "UPDATE_HIGH_SCORE", payload: gridSize });
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

  const handleRestart = () => {
    clearInterval(intervalId);
    setReset((prev) => !prev);
    dispatch({ type: "UPDATE_CURRENT_SCORE", payload: 0 });
  };

  // Auto-solve logic with "AI thinking..." state
  const autoSolvePuzzle = async () => {
    setAiThinking(true); // Show "AI is thinking" message
    setSolving(true);

    try {
      console.log(array)
      // Await the solveSlidingPuzzle function
      const solutionMoves = await solveSlidingPuzzle(array, gridSize);

      // Process the solution moves
      for (let move of solutionMoves) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000ms delay between moves
        setArray((prevArray) => {
          const newArray = [...prevArray];
          const emptyIndex = newArray.indexOf(" ");
          newArray[emptyIndex] = move;
          newArray[prevArray.indexOf(move)] = " ";
          return newArray;
        });
      }
    } catch (error) {
      console.error("Error while solving puzzle: ", error);
    } finally {
      setSolving(false);
      setAiThinking(false); // Hide "AI is thinking" message when done
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div
          className="grid gap-1 border-4 border-[#b6744a] rounded-lg"
          style={!solved(array) ? { gridTemplateColumns, gridTemplateRows } : {}}
        >
          {!solved(array) &&
            array.map((value) =>
              value !== " " ? (
                <div
                  key={value}
                  className={`w-[${pieceSize}px] h-[${pieceSize}px] text-center text-white flex justify-center items-center`}
                  style={{
                    backgroundImage: `url('${imageUrl}')`,
                    backgroundPosition: CalculateBackgroundPosition(gridSize, value - 1),
                    backgroundSize: `${bgSize}%  ${bgSize}%`,
                    border: "1px solid #ccc",
                  }}
                  value={value}
                  onClick={handleClick}
                >
                  {showNumber && value}
                </div>
              ) : (
                <div key={value} className={`w-[${pieceSize}px] h-[${pieceSize}px] bg-[#c29478]`} />
              )
            )}
          {solved(array) && <img src={imageUrl} className="w-[500px] h-[500px]" alt="Solved Puzzle" />}
        </div>

        {/* Restart Button */}
        <button
          className="mx-auto mt-[10px] rounded-lg h-[40px] w-[100px] p-1 bg-blue-400 font-bold text-white border-blue-500 border-2"
          onClick={handleRestart}
        >
          Restart
        </button>

        {/* Auto-Solve Button */}
        <button
          className="mx-auto mt-[10px] rounded-lg h-[40px] w-1/2 p-1 bg-gradient-to-r from-red-400 to-blue-400 font-bold border-2 text-white"
          onClick={autoSolvePuzzle}
          disabled={solving}
        >
          {solving ? "Solving..." : "Auto-Solve"}
        </button>

        {/* AI Thinking Message */}
        {aiThinking && (
          <div className="mt-4 text-center text-lg font-semibold text-red-500">
            AI is Solving...
          </div>
        )}

        {/* Timer Display */}
        {solving && (
          <div className="mt-4 text-center text-lg font-semibold text-green-500">
            Time Elapsed: {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}
          </div>
        )}
      </div>
    </>
  );
};

export default GeneratePieces;
