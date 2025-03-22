import React from 'react';
import ReactConfetti from 'react-confetti';

const ResultScreen = ({ 
  guessedCount, 
  totalCards, 
  onRestart, 
  showPerfectScoreGif,
  perfectScoreGif,
  showMediumScoreGif,
  mediumScoreGif,
  showZeroScoreGif,
  zeroScoreGif
}) => {
  const correctCount = guessedCount;
  const showConfetti = correctCount >= 5;

  return (
    <div className="container">
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={100}
          gravity={0.3}
          colors={['#B4E035', '#FFB7B2', '#FF52A9', '#8EADFF', '#58DB8D']}
          style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }}
        />
      )}
      <p className="guessed-count">Угадано: {guessedCount} из {totalCards}</p>
      <button onClick={onRestart} className="restart-button">
        Начать заново? Да!
      </button>
      
      {showPerfectScoreGif && perfectScoreGif && (
        <div className="perfect-score-container">
          <img 
            src={perfectScoreGif}
            alt="Поздравляем с идеальным результатом!"
            className="perfect-score-gif"
          />
        </div>
      )}
      
      {showMediumScoreGif && mediumScoreGif && (
        <div className="medium-score-container">
          <img 
            src={mediumScoreGif}
            alt="Неплохой результат!"
            className="medium-score-gif"
          />
        </div>
      )}
      
      {showZeroScoreGif && zeroScoreGif && (
        <div className="zero-score-container">
          <img 
            src={zeroScoreGif}
            alt="Неудачный результат"
            className="zero-score-gif"
          />
        </div>
      )}
    </div>
  );
};

export default ResultScreen; 