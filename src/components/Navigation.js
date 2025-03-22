import React from 'react';

const Navigation = ({ onPrevious, onNext, currentIndex, totalCards }) => {
  return (
    <div className="footer">
      <div className="navigation-buttons">
        <button 
          onClick={onPrevious} 
          className="nav-button"
          disabled={currentIndex === 0}
        >
          ←
        </button>
        <button 
          onClick={onNext} 
          className="nav-button"
          disabled={currentIndex === totalCards - 1}
        >
          →
        </button>
      </div>
      <p>Карточки можно листать стрелками туда-сюда на клавиатуре</p>
      <p>Сделано с любовью и исключительно фо фан</p>
    </div>
  );
};

export default Navigation; 