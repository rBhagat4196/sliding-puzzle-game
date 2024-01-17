import { useAppContext } from "../context/scoreContext"

const Scores = () => {
    const {state} = useAppContext();
  return (
    <div className="w-[300px]">
      <div>
        <span>Time Taken : </span>
        <span>{state.currentTime}</span>
      </div>
      <h1>High SCores</h1>
      <div>
        <span>3x3 High Score : </span>
        <span>{state.highScore3}</span>
      </div>
      <div>
        <span>4x4 High Score : </span>
        <span>{state.highScore4}</span>
      </div>
      <div>
        <span>5x5 High Score : </span>
        <span>{state.highScore5}</span>
      </div>
      <div>
        <span>6x6 High Score : </span>
        <span>{state.highScore6}</span>
      </div>
    </div>
  )
}

export default Scores
