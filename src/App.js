import React, { useState, useEffect, useCallback } from 'react';
import ReactConfetti from 'react-confetti';
import { phrases } from './data';
import './App.css';
import agutinMeme from './images/agutin.jpg';
import sadMeme from './images/sad-meme.png';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [guessedCount, setGuessedCount] = useState(0);
  const [shuffledPhrases, setShuffledPhrases] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [clickedButton, setClickedButton] = useState(null);
  const [userChoices, setUserChoices] = useState([]);
  const [showAgutinMeme, setShowAgutinMeme] = useState(false);
  const [showSadMeme, setShowSadMeme] = useState(false);
  const [isAgutinLeaving, setIsAgutinLeaving] = useState(false);
  const [luckyNumber, setLuckyNumber] = useState(null);
  const [isSadLeaving, setIsSadLeaving] = useState(false);

  const getRandomPhrases = () => {
    const shuffled = [...phrases].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  };

  useEffect(() => {
    const phrases = getRandomPhrases();
    setShuffledPhrases(phrases);
    setUserChoices(new Array(phrases.length).fill(null));
    setLuckyNumber(Math.floor(Math.random() * 5) + 1);
  }, []);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(userChoices[currentIndex - 1] !== null);
      setClickedButton(userChoices[currentIndex - 1]);
    }
  }, [currentIndex, userChoices]);

  const handleNext = useCallback(() => {
    if (currentIndex < shuffledPhrases.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(userChoices[currentIndex + 1] !== null);
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
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  const handleGuess = (isCorrect) => {
    if (!clickedButton) {
      // Сохраняем выбор пользователя
      const newChoices = [...userChoices];
      newChoices[currentIndex] = isCorrect ? 'correct' : 'incorrect';
      setUserChoices(newChoices);
      
      setClickedButton(isCorrect ? 'correct' : 'incorrect');
      
      // Увеличиваем счетчик только если это первый правильный ответ
      if (isCorrect && userChoices[currentIndex] === null) {
        setGuessedCount(prevCount => prevCount + 1);
        // 30% шанс показать мем при правильном ответе
        if (Math.random() < 0.3) {
          setShowAgutinMeme(true);
        }
      } else if (!isCorrect) {
        // 30% шанс показать грустный мем при неправильном ответе
        if (Math.random() < 0.3) {
          setShowSadMeme(true);
        }
      }

      // Проверяем, все ли карточки просмотрены
      const allCardsViewed = newChoices.every(choice => choice !== null);
      if (allCardsViewed) {
        setIsComplete(true);
      }
    }
  };

  const handleAgutinClick = () => {
    setIsAgutinLeaving(true);
    setTimeout(() => {
      setShowAgutinMeme(false);
      setIsAgutinLeaving(false);
    }, 500);
  };

  const handleSadMemeClick = () => {
    setIsSadLeaving(true);
    setTimeout(() => {
      setShowSadMeme(false);
      setIsSadLeaving(false);
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
    setLuckyNumber(Math.floor(Math.random() * 5) + 1);
    setShowAgutinMeme(false);
    setShowSadMeme(false);
    setIsAgutinLeaving(false);
    setIsSadLeaving(false);
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
      {showSadMeme && (
        <img
          src={sadMeme}
          alt="Sad Meme"
          className={`sad-meme ${isSadLeaving ? 'slide-down-left' : 'slide-up-left'}`}
          onClick={handleSadMemeClick}
        />
      )}
      <div className="container">
        <h1>Угадай, who это сказал</h1>
        
        <div className="progress">
          <span>Карточка {currentIndex + 1} из {shuffledPhrases.length}</span>
          <span>Счет: {guessedCount}</span>
        </div>

        <div className="card-container">
          <div 
            className={`card ${isFlipped ? 'flipped' : ''}`} 
            onClick={handleCardClick}
          >
            <div className="card-front">
              <p>{currentPhrase.phrase}</p>
              {isFlipped ? (
                <p className="author">{currentPhrase.author}</p>
              ) : (
                <span className="hint">Кликни, чтобы узнать автора</span>
              )}
            </div>
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