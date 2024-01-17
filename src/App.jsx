/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import DynamicSlidingPuzzle from "./components/DynamicSlidingPuzzle";
import Scores from "./components/Scores";

function App() {
  const defaultImage =
    "https://a99d0ae3-3d68-4a52-a3c2-fea580e42708-00-35h6qcjm4i6au.kirk.replit.dev/image.jpeg";
  const [imageUrl, setImageUrl] = useState(defaultImage);
  const [gridSize, setGridSize] = useState(3);
  const [showNumber,setShowNumber] = useState(true);
  function handleSelectChange(e) {
    const data = e.target.value;
    setGridSize(data);
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const src = URL.createObjectURL(file);
    setImageUrl(src);
  };

  const handleNumber = ()=>{
    setShowNumber((prevInfo) => !prevInfo);
    console.log(showNumber)
  }

  return (
    <div className="h-[100%] min-h-[100vh] bg-gradient-to-tr from-[#eb8140] to-slate-50">
      <h1 className="text-center pt-5 mb-[10px] text-3xl font-bold">
        Sliding Puzzle Game
      </h1>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
        <div className="h-full w-[300px]">
          <h1 className="text-xl font-bold">
            Set Difficulty
          </h1>
          <div>
            <label htmlFor="dropdown">Select an option:</label>
            <select
              id="dropdown"
              value={gridSize}
              onChange={handleSelectChange}
            >
              <option value="3">3 X 3</option>
              <option value="4">4 X 4</option>
              <option value="5">5 X 5</option>
              <option value="6">6 X 6</option>
            </select>
            
          </div>
          {/* <div className="border"></div> */}
          <div className="">
            <label htmlFor="imageUpload">Change Image  </label>
            <input
              type="file"
              accept="image/*" // Allow only image files
              id="imageUpload"
              onChange={handleImageChange}
            />

            {imageUrl && (
              <div>
                <p className="mb-[5px]">Selected Image</p>
                <img
                  src={imageUrl}
                  alt="Selected"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              </div>
            )}
          </div>
          <div className="mt-[10px] flex gap-4 p-2">
            <span>Don't Show Number</span>
            <input className="mt-[2px]" type="checkbox" value={showNumber} onChange={handleNumber}/>
          </div>
        </div>

        <div className="">
          <DynamicSlidingPuzzle imageUrl={imageUrl} gridSize={gridSize} showNumber = {showNumber}/>
        </div>
        <Scores/>
      </div>
    </div>
  );
}

export default App;
