import React, { useState, useEffect } from 'react';
import { phrases } from './data';
import './App.css';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [guessedCount, setGuessedCount] = useState(0);
  const [shuffledPhrases, setShuffledPhrases] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const getRandomPhrases = () => {
    const shuffled = [...phrases].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  };

  useEffect(() => {
    setShuffledPhrases(getRandomPhrases());
  }, []);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleGuess = (isCorrect) => {
    if (isCorrect) {
      setGuessedCount(guessedCount + 1);
    }
    
    setTimeout(() => {
      if (currentIndex < shuffledPhrases.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsFlipped(false);
      } else {
        setIsComplete(true);
      }
    }, 1000);
  };

  const handleRestart = () => {
    setShuffledPhrases(getRandomPhrases());
    setCurrentIndex(0);
    setIsFlipped(false);
    setGuessedCount(0);
    setIsComplete(false);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < shuffledPhrases.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  if (shuffledPhrases.length === 0) {
    return <div className="loading">Загрузка...</div>;
  }

  if (isComplete) {
    return (
      <div className="container">
        <h1>Игра завершена!</h1>
        <p>Правильных ответов: {guessedCount} из {shuffledPhrases.length}</p>
        <button onClick={handleRestart} className="restart-button">
          Начать заново
        </button>
      </div>
    );
  }

  const currentPhrase = shuffledPhrases[currentIndex];

  return (
    <div className="container">
      <h1>Угадай, кто сказал</h1>
      
      <div className="progress">
        <span>Карточка {currentIndex + 1} из {shuffledPhrases.length}</span>
        <span>Правильных ответов: {guessedCount}</span>
      </div>

      <div className="card-container">
        <div className="card" onClick={handleCardClick}>
          {!isFlipped ? (
            <div className="card-front">
              <p>{currentPhrase.phrase}</p>
            </div>
          ) : (
            <div className="card-back">
              <p>{currentPhrase.author}</p>
            </div>
          )}
        </div>

        <div className="navigation-buttons">
          <button 
            onClick={handlePrevious} 
            className="nav-button"
            disabled={currentIndex === 0}
          >
            Предыдущая
          </button>
          <button 
            onClick={handleNext} 
            className="nav-button"
            disabled={currentIndex === shuffledPhrases.length - 1}
          >
            Следующая
          </button>
        </div>

        {isFlipped && (
          <div className="guess-buttons">
            <button 
              onClick={() => handleGuess(true)} 
              className="guess-button correct"
            >
              Угадал
            </button>
            <button 
              onClick={() => handleGuess(false)} 
              className="guess-button incorrect"
            >
              Забыл
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 