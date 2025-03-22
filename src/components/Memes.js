import React from 'react';
import agutinMeme from '../images/agutin.png';
import sadMeme from '../images/sad-meme.png';

const Memes = ({ 
  showAgutinMeme, 
  isAgutinLeaving, 
  onAgutinClick,
  showSadMeme,
  isSadLeaving,
  onSadMemeClick 
}) => {
  return (
    <>
      {showAgutinMeme && (
        <img 
          src={agutinMeme} 
          alt="Агутин жмёт кнопку"
          className={`agutin-meme ${isAgutinLeaving ? 'slide-up' : 'slide-down'}`}
          onClick={onAgutinClick}
        />
      )}
      {showSadMeme && (
        <img
          src={sadMeme}
          alt="Кот недоумевает"
          className={`sad-meme ${isSadLeaving ? 'slide-down-left' : 'slide-up-left'}`}
          onClick={onSadMemeClick}
        />
      )}
    </>
  );
};

export default Memes; 