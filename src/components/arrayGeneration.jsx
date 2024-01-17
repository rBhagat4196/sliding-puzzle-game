function arrayGeneration(gridSize){
    const array = Array.from({length : gridSize*gridSize -1} , (_,index) => index+1);
    array.push(" ");
    do {
      for (let i = array.length - 2; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }

      var inversionCount = 0;
      for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
          if (array[i] !== " " && array[j] !== " " && array[i] > array[j]) {
            inversionCount++;
          }
        }
      }
    } while (inversionCount % 2 !== 0);
   return array;
}

export default arrayGeneration
