import PriorityQueue from 'js-priority-queue'; // Import a priority queue library

// Helper function to generate next possible states (neighboring states) from the current state
function generateNextStates(currentState, gridSize) {
  const emptyIndex = currentState.indexOf(" ");
  const nextStates = [];
  const row = Math.floor(emptyIndex / gridSize);
  const col = emptyIndex % gridSize;

  // Move directions: [rowChange, colChange]
  const directions = [
    [-1, 0], // Up
    [1, 0],  // Down
    [0, -1], // Left
    [0, 1],  // Right
  ];

  directions.forEach(([rowChange, colChange]) => {
    const newRow = row + rowChange;
    const newCol = col + colChange;
    if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
      const newEmptyIndex = newRow * gridSize + newCol;
      const newState = [...currentState];
      // Swap empty space with the new position
      newState[emptyIndex] = currentState[newEmptyIndex];
      newState[newEmptyIndex] = " ";
      nextStates.push({ state: newState, move: newState[emptyIndex] });
    }
  });

  return nextStates;
}

// Calculate the heuristic cost (Manhattan distance) for A* algorithm
function calculateCost(state, goalState, gridSize) {
  let cost = 0;
  state.forEach((value, index) => {
    if (value !== " ") {
      const currentRow = Math.floor(index / gridSize);
      const currentCol = index % gridSize;
      const goalIndex = goalState.indexOf(value);
      const goalRow = Math.floor(goalIndex / gridSize);
      const goalCol = goalIndex % gridSize;
      cost += Math.abs(currentRow - goalRow) + Math.abs(currentCol - goalCol);
    }
  });
  return cost;
}

// Function to construct the path from root to the solution
function constructPath(node) {
  const path = [];
  while (node) {
    path.push(node.state);
    node = node.parent;
  }
  return path.reverse(); // Reverse to get the path from start to goal
}

// A* search algorithm to solve the sliding puzzle
async function solveSlidingPuzzle(initialState, gridSize) {
  const goalState = Array.from({ length: gridSize * gridSize - 1 }, (_, i) => i + 1).concat(" ");
  const startNode = {
    state: initialState,
    parent: null,
    moves: [],
    level: 0,
    cost: calculateCost(initialState, goalState, gridSize),
  };

  const openSet = new PriorityQueue({ comparator: (a, b) => (a.cost + a.level) - (b.cost + b.level) });
  openSet.queue(startNode);
  const visited = new Set();

  while (openSet.length > 0) {
    const currentNode = openSet.dequeue();

    const stateKey = currentNode.state.join(",");
    if (stateKey === goalState.join(",")) {
      return constructPath(currentNode);
    }

    if (!visited.has(stateKey)) {
      visited.add(stateKey);

      const nextStates = generateNextStates(currentNode.state, gridSize);
      for (const { state: nextState, move } of nextStates) {
        const newNode = {
          state: nextState,
          parent: currentNode,
          moves: [...currentNode.moves, move],
          level: currentNode.level + 1,
          cost: calculateCost(nextState, goalState, gridSize),
        };

        openSet.queue(newNode);
      }
    }
  }

  return [];
}

export default solveSlidingPuzzle;
