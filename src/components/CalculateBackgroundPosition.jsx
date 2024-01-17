const CalculateBackgroundPosition = (gridSize,value) => {
    // console.log(gridSize)

    const row = Math.floor(value / gridSize);
    const col = value % gridSize;
    const x = -col * 100 + '%';
    const y = -row * 100 + '%';
    return `${x} ${y}`;

}

export default CalculateBackgroundPosition
