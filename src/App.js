import React, { useState, useEffect, useCallback } from 'react';
import ReactConfetti from 'react-confetti';
import { phrases } from './data';
import './App.css';
import agutinMeme from './images/agutin.jpg';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [guessedCount, setGuessedCount] = useState(0);
  const [shuffledPhrases, setShuffledPhrases] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [clickedButton, setClickedButton] = useState(null);
  const [userChoices, setUserChoices] = useState([]);
  const [showAgutinMeme, setShowAgutinMeme] = useState(false);
  const [isAgutinLeaving, setIsAgutinLeaving] = useState(false);

  const getRandomPhrases = () => {
    const shuffled = [...phrases].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  };

  useEffect(() => {
    const phrases = getRandomPhrases();
    setShuffledPhrases(phrases);
    setUserChoices(new Array(phrases.length).fill(null));
  }, []);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
      setClickedButton(userChoices[currentIndex - 1]);
    }
  }, [currentIndex, userChoices]);

  const handleNext = useCallback(() => {
    if (currentIndex < shuffledPhrases.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      setClickedButton(userChoices[currentIndex + 1]);
    }
  }, [currentIndex, shuffledPhrases.length, userChoices]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        handlePrevious();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext]);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleGuess = (isCorrect) => {
    const newChoices = [...userChoices];
    newChoices[currentIndex] = isCorrect ? 'correct' : 'incorrect';
    setUserChoices(newChoices);
    setClickedButton(isCorrect ? 'correct' : 'incorrect');
    
    // Показываем мем при первом правильном ответе
    if (isCorrect && userChoices[currentIndex] === null) {
      setGuessedCount(guessedCount + 1);
      if (guessedCount === 0) {
        setShowAgutinMeme(true);
        setIsAgutinLeaving(false);
      }
    }

    const allCardsViewed = newChoices.every(choice => choice !== null);
    if (allCardsViewed) {
      setIsComplete(true);
    }
  };

  const handleAgutinClick = () => {
    setIsAgutinLeaving(true);
    setTimeout(() => {
      setShowAgutinMeme(false);
      setIsAgutinLeaving(false);
    }, 500);
  };

  const handleRestart = () => {
    const phrases = getRandomPhrases();
    setShuffledPhrases(phrases);
    setUserChoices(new Array(phrases.length).fill(null));
    setCurrentIndex(0);
    setIsFlipped(false);
    setGuessedCount(0);
    setIsComplete(false);
    setClickedButton(null);
  };

  if (shuffledPhrases.length === 0) {
    return <div className="loading">Загрузка...</div>;
  }

  if (isComplete) {
    return (
      <div className="container">
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          colors={['#FFD700', '#FFA500', '#FF69B4', '#87CEEB', '#98FB98']}
          style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }}
        />
        <h1>Типа закончились карточки</h1>
        <p className="guessed-count">Угадано: {guessedCount} из {shuffledPhrases.length}</p>
        <button onClick={handleRestart} className="restart-button">
          Начать заново? Да!
        </button>
      </div>
    );
  }

  const currentPhrase = shuffledPhrases[currentIndex];
  const currentChoice = userChoices[currentIndex];

  return (
    <div className="app">
      {showAgutinMeme && (
        <img 
          src={agutinMeme} 
          alt="Агутин радуется" 
          className={`agutin-meme ${isAgutinLeaving ? 'slide-up' : 'slide-down'}`}
          onClick={handleAgutinClick}
        />
      )}
      <div className="container">
        <h1>Угадай, who это сказал</h1>
        
        <div className="progress">
          <span>Карточка {currentIndex + 1} из {shuffledPhrases.length}</span>
          <span>Счет: {guessedCount}</span>
        </div>

        <div className="card-container">
          <div className="card" onClick={handleCardClick}>
            {!isFlipped ? (
              <div className="card-front">
                <p>{currentPhrase.phrase}</p>
                <span className="hint">Кликни, чтобы узнать автора</span>
              </div>
            ) : (
              <div className="card-back">
                <p>{currentPhrase.author}</p>
              </div>
            )}
          </div>

          {isFlipped && (
            <div className="guess-buttons">
              <button 
                onClick={() => handleGuess(true)} 
                className={`guess-button correct ${currentChoice === 'correct' ? 'active' : ''}`}
                disabled={currentChoice === 'incorrect'}
              >
                Даааа ДАААА ДАВАЙ! Угадал(-а)!
              </button>
              <button 
                onClick={() => handleGuess(false)} 
                className={`guess-button incorrect ${currentChoice === 'incorrect' ? 'active' : ''}`}
                disabled={currentChoice === 'correct'}
              >
                Не угадал(-а)
              </button>
            </div>
          )}
        </div>
        <div className="footer">
          <div className="navigation-buttons">
            <button 
              onClick={handlePrevious} 
              className="nav-button"
              disabled={currentIndex === 0}
            >
              ←
            </button>
            <button 
              onClick={handleNext} 
              className="nav-button"
              disabled={currentIndex === shuffledPhrases.length - 1}
            >
              →
            </button>
          </div>
          <p>Ещё карточки можно листать стрелками ← и → на клавиатуре</p>
          <p>Сделано с любовью и исключительно фо фан</p>
        </div>
      </div>
    </div>
  );
}

export default App; 