import React from 'react';

const Card = ({ phrase, author, isFlipped, onCardClick }) => {
  return (
    <div 
      className={`card ${isFlipped ? 'flipped' : ''}`} 
      onClick={onCardClick}
    >
      <div className="card-front">
        <p>{phrase}</p>
        {isFlipped ? (
          <p className="author">{author}</p>
        ) : (
          <span className="hint">Кликни, чтобы узнать автора</span>
        )}
      </div>
    </div>
  );
};

export default Card; 