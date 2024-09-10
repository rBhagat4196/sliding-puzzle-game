/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import DynamicSlidingPuzzle from "./components/DynamicSlidingPuzzle";
import Scores from "./components/Scores";

function App() {
  const defaultImage =
    "https://firebasestorage.googleapis.com/v0/b/imageurl-d1144.appspot.com/o/507ede61-4d09-4008-81e3-0c8c2973cf0d?alt=media&token=aeae3f87-30a9-4c01-882d-81966fe51d04://a99d0ae3-3d68-4a52-a3c2-fea580e42708-00-35h6qcjm4i6au.kirk.replit.dev/image.jpeg";
  const [imageUrl, setImageUrl] = useState(defaultImage);
  const [gridSize, setGridSize] = useState(3);
  const [showNumber, setShowNumber] = useState(true);


  function handleSelectChange(e) {
    const data = e.target.value;
    setGridSize(data);
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const src = URL.createObjectURL(file);
    setImageUrl(src);
  };

  const handleNumber = () => {
    setShowNumber((prevInfo) => !prevInfo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#eb8140] to-slate-50 p-5">
      <h1 className="text-center pt-5 mb-10 text-3xl font-bold text-white">
        Sliding Puzzle Game
      </h1>
      <div className="flex flex-col gap-2 lg:gap-4 lg:flex-row items-center justify-center">
        <div className="w-[300px] bg-white p-4 rounded-md shadow-md">
          <h1 className="text-xl font-bold mb-4 text-gray-800">
            Set Difficulty
          </h1>
          <div className="mb-4">
            <label htmlFor="dropdown" className="block text-gray-600">
              Select an option:
            </label>
            <select
              id="dropdown"
              value={gridSize}
              onChange={handleSelectChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="3">3 X 3</option>
              <option value="4">4 X 4</option>
              <option value="5">5 X 5</option>
              <option value="6">6 X 6</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="imageUpload" className="block text-gray-600">
              Change Image
            </label>
            <input
              type="file"
              accept="image/*" // Allow only image files
              id="imageUpload"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />

            {imageUrl && (
              <div className="mt-4">
                <p className="mb-2 text-gray-600">Selected Image</p>
                <img
                  src={imageUrl}
                  alt="Selected"
                  className="w-full max-h-40 object-cover rounded-md"
                />
              </div>
            )}
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-gray-600">Don't Show Number</span>
            <input
              type="checkbox"
              value={showNumber}
              onChange={handleNumber}
              className="mt-1"
            />
          </div>
        </div>

        <div className="ml-4">
          <DynamicSlidingPuzzle
            imageUrl={imageUrl}
            gridSize={gridSize}
            showNumber={showNumber}
          />
        </div>
        <Scores />
 
      </div>
    </div>
  );
}

export default App;
