import React from 'react';

const GuessButtons = ({ onGuess, currentChoice }) => {
  return (
    <div className="guess-buttons">
      <button 
        onClick={() => onGuess(true)} 
        className={`guess-button correct ${currentChoice === 'correct' ? 'active' : ''}`}
        disabled={currentChoice === 'incorrect'}
      >
        Даааа ДАААА ДАВАЙ! Угадал(-а)!
      </button>
      <button 
        onClick={() => onGuess(false)} 
        className={`guess-button incorrect ${currentChoice === 'incorrect' ? 'active' : ''}`}
        disabled={currentChoice === 'correct'}
      >
        Не угадал(-а)
      </button>
    </div>
  );
};

export default GuessButtons; 