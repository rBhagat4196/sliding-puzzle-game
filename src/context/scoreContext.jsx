/* eslint-disable no-case-declarations */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useReducer, useContext } from 'react';


const initialState = {
  currentTime: 0,
  highScore3: parseInt(localStorage.getItem("score3x3")) || 0,
  highScore4: parseInt(localStorage.getItem("score4x4")) || 0,
  highScore5: parseInt(localStorage.getItem("score5x5")) || 0,
  highScore6: parseInt(localStorage.getItem("score6x6")) || 0,
};

console.log(initialState)

const AppContext = createContext();


const reducer = (state, action) => {
  switch (action.type) {

    case 'UPDATE_CURRENT_SCORE':
      return {
        ...state,
        currentTime: (action.payload === 1) ? state.currentTime + 1 : 0,
      };

      case 'UPDATE_HIGH_SCORE':
      let score = state[`highScore${action.payload}`];

      if (state.currentTime < score) {
        localStorage.setItem(`score${action.payload}x${action.payload}`, state.currentTime);
      }

      if (score === 0) score = 999;

      return {
        ...state,
        [`highScore${action.payload}`]: (state.currentTime < score) ? state.currentTime : score,
      };

    default:
      return state;
  }
};


export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
