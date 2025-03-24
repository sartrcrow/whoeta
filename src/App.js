import React, { useState, useEffect, useCallback } from 'react';
import { phrases } from './data/data';
import './App.css';

import AnimatedNumber from './components/AnimatedNumber';
import Card from './components/Card';
import GuessButtons from './components/GuessButtons';
import Navigation from './components/Navigation';
import ResultScreen from './components/ResultScreen';
import Memes from './components/Memes';

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
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGMxNHhyOXc1dXNoamY5eGJyZDI1dTlwcjJlZTh4Ym1hd2V5eHZ4MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hv4TC2Ide8rDoXy0iK/giphy.gif',
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnQ5dmRiY29hZ2FiNnV2aTJ6OXIwNTg2cm5zM3Awbm5tNXBtdDR1ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2GN4OAIdsMDv10jAVn/giphy.gif',
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNm5sNGJ2emI2Y3BnYWo3OHl3cXZtZDd4ZmJyMGFscTFxeDAxdjlidSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6pSJGZW0ZmbUA/giphy.gif',
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXRwOGJpNTdtZDNyYnhmZ2xlb2FiaWQwOTAxc2puY2NudnpybWgyNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jrutBd1N7ZhsINAPzs/giphy.gif'
  ];
  
  // Массив с GIF для среднего результата (5-9 из 10)
  const mediumScoreGifs = [
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXZkenh5Z2Y1bnJxMXc2cnl0Y2o3OXM3MmRjYnE4M2lnc3B5OWlpZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5K7ngCtszoxxbaBieC/giphy.gif',
    'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3Vxd2E4OW9vaDRxMmp0MTkwaXQ5czVmcHU4M2YwaTkxaHlraHg2MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Nv1roC7mg5Kec/giphy.gif',
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGprcWp4a2sycnNqMjBzZjR3YmUyazl0eDhkN2E1enE4Ym5mOTExeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/T7nRl5WHw7Yru/giphy.gif',
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG4zNDg0Z2RmdWQ2a3E2MHRqajE5cmUwYWRvczZuMmVybHN1Z3RkbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xoHntNXFYkfzGAftEv/giphy.gif',
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXNjZGFzend3Mmtib2ZrcnNsOW0wZnhhcG9ubXh3MnRyZDd5ZHdqdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SVH9y2LQUVVCRcqD7o/giphy.gif',
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2lndDgxbTd5NHhjNGptazhmNDZteXR1c3d4MWR3YWZjbmI5bWY1aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jTByV2aZDFvuU/giphy.gif',
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNm5sNGJ2emI2Y3BnYWo3OHl3cXZtZDd4ZmJyMGFscTFxeDAxdjlidSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6pSJGZW0ZmbUA/giphy.gif'
  ];
  
  // Массив с GIF для плохого результата (0-4 из 10)
  const zeroScoreGifs = [
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmxxZGNpMzZrOW1ndXdqYndiczFnanU1cnhleTBteDVkaW41enowayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3og0IBnG9wJlbKL0Gc/giphy.gif',
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExamdoejU4aWN3ZThmcHI3ZHI3MDM5NHBlcXExb2tkZHYxeGY3YmZrYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ppXe5owaD75zpEG921/giphy.gif',
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3QyZHZ6bjFhZzljcDFuamptY2w5Y3d3bHN2emVyNTRzaThidDl2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8lgqAbycBjosxjfi9k/giphy.gif',
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHcya3Nra252dTQyZ2t3NXh0ZDEzZjVreGxvY216OHRkM2Ywb3oyNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/f2HiQKaEkaKwo/giphy.gif',
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDkyY2U4OHZmcTF4dTk5cWN4enQ3cG81NDZvczdnbzVnMDk0OXFraSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qiFchLT8Gora8/giphy.gif',
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmtsNndsc3hheHViMWdmYWZ4dXQ0MDZzaTB1cm1iZ2kwN3kwMHcxOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MZocLC5dJprPTcrm65/giphy.gif',
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTR1bjVzNHduY2VlbTgxdm04YzZsYjd5dWR2M2dwbjNodDMwYjR2MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CWN0uW6ELn3pK/giphy.gif',
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2hrcTl0MzZwOHMyeHk4aWcwbmk3NjF3a3Y5a2lzYWhlYm5rcHpyYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IKjbJJmKtWO7Uj4lul/giphy.gif',
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHB3ZG8zNHpmbHZua292cjVqMjB2cGlxd2ExbzQ0N2N0ejU0M3BrbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LjaYDVWiABfvbLQENN/giphy.gif',
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2VybmlzNWV1N3V2ZXU5b3phM2I5N3N3Yml3aG1qanlob2luY3o1diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Vns2DRR16K9q0/giphy.gif',
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3hpcWZlc204YXhjMHZzYzVhemZhcnRnaXZqemszZGtwMjRidmk3OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2Sq09tRk9EZSYNZm/giphy.gif'
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
    return (
      <ResultScreen
        guessedCount={guessedCount}
        totalCards={shuffledPhrases.length}
        onRestart={handleRestart}
        showPerfectScoreGif={showPerfectScoreGif}
        perfectScoreGif={perfectScoreGif}
        showMediumScoreGif={showMediumScoreGif}
        mediumScoreGif={mediumScoreGif}
        showZeroScoreGif={showZeroScoreGif}
        zeroScoreGif={zeroScoreGif}
      />
    );
  }

  const currentPhrase = shuffledPhrases[currentIndex];
  const currentChoice = userChoices[currentIndex];

  return (
    <div className="app">
      <Memes
        showAgutinMeme={showAgutinMeme}
        isAgutinLeaving={isAgutinLeaving}
        onAgutinClick={handleAgutinClick}
        showSadMeme={showSadMeme}
        isSadLeaving={isSadLeaving}
        onSadMemeClick={handleSadMemeClick}
      />
      
      <div className="container">
        <h1>угадай, <span className="light-text">who ета</span> сказал</h1>
        
        <div className="progress">
          <span>Карточка <AnimatedNumber number={currentIndex + 1} /> из {shuffledPhrases.length}</span>
          <span>Счет: <AnimatedNumber number={guessedCount} /></span>
        </div>

        <div className="card-container">
          <Card
            phrase={currentPhrase.phrase}
            author={currentPhrase.author}
            isFlipped={isFlipped}
            onCardClick={handleCardClick}
          />

          {isFlipped && (
            <GuessButtons
              onGuess={handleGuess}
              currentChoice={currentChoice}
            />
          )}
        </div>

        <Navigation
          onPrevious={handlePrevious}
          onNext={handleNext}
          currentIndex={currentIndex}
          totalCards={shuffledPhrases.length}
        />
      </div>
    </div>
  );
}

export default App; 