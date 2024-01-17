import { useAppContext } from "../context/scoreContext";

const Scores = () => {
  const { state } = useAppContext();

  return (
    <div className="w-[300px] p-4 m-2 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <span className="font-bold">Time Taken:</span>
        <span className="ml-2">{state.currentTime}</span>
      </div>

      <h1 className="text-2xl font-bold mb-4">High Scores</h1>

      <div className="mb-2">
        <span className="font-bold">3x3 High Score:</span>
        <span className="ml-2">{state.highScore3}</span>
      </div>

      <div className="mb-2">
        <span className="font-bold">4x4 High Score:</span>
        <span className="ml-2">{state.highScore4}</span>
      </div>

      <div className="mb-2">
        <span className="font-bold">5x5 High Score:</span>
        <span className="ml-2">{state.highScore5}</span>
      </div>

      <div className="mb-2">
        <span className="font-bold">6x6 High Score:</span>
        <span className="ml-2">{state.highScore6}</span>
      </div>
    </div>
  );
};

export default Scores;
