import React, { useState, useEffect, useCallback } from 'react';
import ReactConfetti from 'react-confetti';
import { phrases } from './data';
import './App.css';
import agutinMeme from './images/agutin.png';
import sadMeme from './images/sad-meme.png';

// Компонент для анимированного числа
const AnimatedNumber = ({ number }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prev => prev + 1);
  }, [number]);

  return (
    <span key={key} className="animated-number">
      {number}
    </span>
  );
};

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
  const [isSadLeaving, setIsSadLeaving] = useState(false);
  const [perfectScoreGif, setPerfectScoreGif] = useState('');
  const [showPerfectScoreGif, setShowPerfectScoreGif] = useState(false);
  const [zeroScoreGif, setZeroScoreGif] = useState('');
  const [showZeroScoreGif, setShowZeroScoreGif] = useState(false);
  const [mediumScoreGif, setMediumScoreGif] = useState('');
  const [showMediumScoreGif, setShowMediumScoreGif] = useState(false);
  
  // Массив с GIF для идеального результата (10 из 10)
  const perfectScoreGifs = [
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWtkbHRsd2Vzdnllbnpqd2cwNWQ2N2kyajB1ejE4NnE2MzQ3ZXhlciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/b7MtjZ8uhWMaHMsueA/giphy.gif',
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzZodWUxNnhsMDN1Nm40cTJ1aGYzZzA5dXI1YXR0a3hhMnUyanRxMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/K0zN8vrXUen8PMBaeR/giphy.gif',
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnQ5dmRiY29hZ2FiNnV2aTJ6OXIwNTg2cm5zM3Awbm5tNXBtdDR1ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2GN4OAIdsMDv10jAVn/giphy.gif',
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNm5sNGJ2emI2Y3BnYWo3OHl3cXZtZDd4ZmJyMGFscTFxeDAxdjlidSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6pSJGZW0ZmbUA/giphy.gif'
  ];
  
  // Массив с GIF для среднего результата (5-9 из 10)
  const mediumScoreGifs = [
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG4zNDg0Z2RmdWQ2a3E2MHRqajE5cmUwYWRvczZuMmVybHN1Z3RkbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xoHntNXFYkfzGAftEv/giphy.gif',
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXNjZGFzend3Mmtib2ZrcnNsOW0wZnhhcG9ubXh3MnRyZDd5ZHdqdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SVH9y2LQUVVCRcqD7o/giphy.gif',
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2lndDgxbTd5NHhjNGptazhmNDZteXR1c3d4MWR3YWZjbmI5bWY1aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jTByV2aZDFvuU/giphy.gif',
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNm5sNGJ2emI2Y3BnYWo3OHl3cXZtZDd4ZmJyMGFscTFxeDAxdjlidSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6pSJGZW0ZmbUA/giphy.gif'
  ];
  
  // Массив с GIF для плохого результата (0-4 из 10)
  const zeroScoreGifs = [
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDkyY2U4OHZmcTF4dTk5cWN4enQ3cG81NDZvczdnbzVnMDk0OXFraSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qiFchLT8Gora8/giphy.gif',
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmtsNndsc3hheHViMWdmYWZ4dXQ0MDZzaTB1cm1iZ2kwN3kwMHcxOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MZocLC5dJprPTcrm65/giphy.gif',
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTR1bjVzNHduY2VlbTgxdm04YzZsYjd5dWR2M2dwbjNodDMwYjR2MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CWN0uW6ELn3pK/giphy.gif',
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2hrcTl0MzZwOHMyeHk4aWcwbmk3NjF3a3Y5a2lzYWhlYm5rcHpyYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IKjbJJmKtWO7Uj4lul/giphy.gif',
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHB3ZG8zNHpmbHZua292cjVqMjB2cGlxd2ExbzQ0N2N0ejU0M3BrbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LjaYDVWiABfvbLQENN/giphy.gif'
  ];

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
        // 20% шанс показать мем при правильном ответе
        if (Math.random() < 0.2) {
          setShowAgutinMeme(true);
        }
      } else if (!isCorrect) {
        // 20% шанс показать грустный мем при неправильном ответе
        if (Math.random() < 0.2) {
          setShowSadMeme(true);
        }
      }

      // Проверяем, все ли карточки просмотрены
      const allCardsViewed = newChoices.every(choice => choice !== null);
      if (allCardsViewed) {
        setIsComplete(true);
        
        // Проверяем количество правильных ответов
        const correctCount = newChoices.filter(choice => choice === 'correct').length;
        
        // Выбираем и показываем GIF в зависимости от результата
        setTimeout(() => {
          // Идеальный результат (10 из 10)
          if (correctCount === shuffledPhrases.length) {
            const randomGif = perfectScoreGifs[Math.floor(Math.random() * perfectScoreGifs.length)];
            setPerfectScoreGif(randomGif);
            setShowPerfectScoreGif(true);
          }
          // Средний результат (5-9 из 10)
          else if (correctCount >= 5) {
            const randomGif = mediumScoreGifs[Math.floor(Math.random() * mediumScoreGifs.length)];
            setMediumScoreGif(randomGif);
            setShowMediumScoreGif(true);
          }
          // Плохой результат (0-4 из 10)
          else {
            const randomGif = zeroScoreGifs[Math.floor(Math.random() * zeroScoreGifs.length)];
            setZeroScoreGif(randomGif);
            setShowZeroScoreGif(true);
          }
        }, 500);
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
    setShowAgutinMeme(false);
    setShowSadMeme(false);
    setIsAgutinLeaving(false);
    setIsSadLeaving(false);
    setPerfectScoreGif('');
    setShowPerfectScoreGif(false);
    setZeroScoreGif('');
    setShowZeroScoreGif(false);
    setMediumScoreGif('');
    setShowMediumScoreGif(false);
  };

  if (shuffledPhrases.length === 0) {
    return <div className="loading">Загрузка...</div>;
  }

  if (isComplete) {
    // Получаем количество правильных ответов
    const correctCount = userChoices.filter(choice => choice === 'correct').length;
    const showConfetti = correctCount >= 5; // Показываем конфетти для результатов 5-10
    
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
        {/* <h1>Типа закончились карточки</h1> */}
        <p className="guessed-count">Угадано: {guessedCount} из {shuffledPhrases.length}</p>
        <button onClick={handleRestart} className="restart-button">
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
        <h1>угадай, <span className="light-text">who ета</span> сказал</h1>
        
        <div className="progress">
          <span>Карточка <AnimatedNumber number={currentIndex + 1} /> из {shuffledPhrases.length}</span>
          <span>Счет: <AnimatedNumber number={guessedCount} /></span>
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
          <p>Карточки можно листать стрелками туда-сюда на клавиатуре</p>
          <p>Сделано с любовью и исключительно фо фан</p>
        </div>
      </div>
    </div>
  );
}

export default App; 