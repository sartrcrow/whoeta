import React, { useState } from "react";

const phrases = [
  { phrase: "Это все без юая, поэтому всё тут стремное.", author: "Катя Мишина" },
  { phrase: "Более лучше стали одеваться виджеты.", author: "Алина Краснослободцева" },
  { phrase: "Есть гипотеза, что это дело благое.", author: "Алсу Газиева" },
  { phrase: "У меня, кстати, нет такой реакции на эту стену.", author: "Андрей Фатеев" },
  { phrase: "Мы обычно и так на встречах пукаем и крякаем, так что все норм, ничего не потеряешь.", author: "Антон Дуканич" },
  { phrase: "Это противоречит колбасе.", author: "Антон Дуканич" },
  { phrase: "Давайте в этот раз без дикпиков!", author: "Лёша Ардов" },
  { phrase: "Тоже померюсь длиной своего юикса.", author: "Макс Совенков" },
  { phrase: "Пилили его два спринта, но все равно он забагованный.", author: "Марина Тивякова" },
  { phrase: "Это вы еще про мой градус каши не слышали.", author: "Настя Залозная" }
];

const FlashcardsApp = () => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState(Array(phrases.length).fill(null));
  const [finished, setFinished] = useState(false);

  const handleFlip = () => setFlipped(true);

  const handleAnswer = (isCorrect) => {
    if (answers[index] !== null) return;
    const newAnswers = [...answers];
    newAnswers[index] = isCorrect;
    setAnswers(newAnswers);
    if (isCorrect) setCorrectCount(correctCount + 1);
  };

  const handleNext = () => {
    if (index < phrases.length - 1) {
      setIndex(index + 1);
      setFlipped(false);
    } else {
      setFinished(true);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
      setFlipped(false);
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setFlipped(false);
    setCorrectCount(0);
    setAnswers(Array(phrases.length).fill(null));
    setFinished(false);
  };
  return (
    <div style={{ textAlign: "center" as const, padding: "20px" }}>
      {finished ? (
        <div style={{ textAlign: "center" as const }}>
          <h2 style={styles.finalScore}>Угадано: {correctCount}</h2>
          <button style={styles.restartButton} onClick={handleRestart}>Попробовать заново?</button>
        </div>
      ) : (
        <>
          <div style={styles.header}>
            <span style={styles.score}>Угадано: {correctCount}</span>
            <span style={styles.stepper}>{index + 1} / {phrases.length}</span>
          </div>
          <div style={styles.card} onClick={handleFlip}>
            {flipped ? <p>{phrases[index].author}</p> : <p>{phrases[index].phrase}</p>}
          </div>
          {flipped && (
            <div style={styles.buttonsContainer}>
              <button 
                style={answers[index] === true ? styles.activeButton : styles.button} 
                onClick={() => handleAnswer(true)}
                disabled={answers[index] !== null}
              >Угадал!</button>
              <button 
                style={answers[index] === false ? styles.activeButton : styles.button} 
                onClick={() => handleAnswer(false)}
                disabled={answers[index] !== null}
              >Не помню</button>
            </div>
          )}
          <div style={styles.navigationContainer}>
            <button 
              style={styles.navButton} 
              onClick={handlePrev} 
              disabled={index === 0}
            >Предыдущая</button>
            <button style={styles.navButton} onClick={handleNext}>Следующая</button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px" },
  header: { display: "flex", justifyContent: "space-between", marginBottom: "10px" },
  score: { fontSize: "18px", fontWeight: "bold" },
  stepper: { fontSize: "18px", fontWeight: "bold" },
  card: { 
    width: "100%",
    height: "200px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid black", 
    margin: "20px auto",
    fontSize: "18px",
    fontWeight: "bold"
  },
  buttonsContainer: { marginBottom: "10px" },
  button: { margin: "5px", padding: "10px", fontSize: "16px", cursor: "pointer" },
  activeButton: { margin: "5px", padding: "10px", fontSize: "16px", backgroundColor: "lightgreen" },
  navigationContainer: { marginTop: "10px" },
  navButton: { margin: "5px", padding: "10px", fontSize: "16px", cursor: "pointer" },
  finishedContainer: { textAlign: "center" },
  finalScore: { fontSize: "24px", fontWeight: "bold" },
  restartButton: { padding: "10px 20px", fontSize: "18px", cursor: "pointer" }
};

export default FlashcardsApp;
