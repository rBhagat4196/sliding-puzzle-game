import GeneratePieces from "./generatePieces";

/* eslint-disable react/prop-types */
const DynamicSlidingPuzzle = ({ imageUrl, gridSize ,showNumber}) => {
  return (
    <div className="flex items-center justify-center ">
      <GeneratePieces gridSize={gridSize} imageUrl={imageUrl} showNumber={showNumber}/>
    </div>
  );
};

export default DynamicSlidingPuzzle;
