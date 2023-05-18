import React, { useState, useEffect } from 'react';




const questionsData = [

  {
    Question: 'Who is the first lady prime miniter of india?',
    Options: ['sonia gandhi', 'shahrukh Khan', 'Rahul Gandhi', 'Indra Gandhi'],
    CorrectAnswer: 'Indra Gandhi',
  },
  {
    Question: ' Who is the first prime minister of india?',
    Options: ['Lalu yada', 'duryodhan', 'chaywala', 'pandit Jawahar lal nehru'],
    CorrectAnswer: 'pandit Jawahar lal nehru',
  },
  {
    Question: 'who is the president of India?',
    Options: ['Dhropadi murmu', 'nirmala sita raman', 'brijesh pathak', 'sonia gandhi'],
    CorrectAnswer: 'Dhropadi murmu',
  },
  {
    Question: 'How many hours are there in a day',
    Options: ['24', '90', '10', '21'],
    CorrectAnswer: '24',
  },
  {
    Question: 'What is Array in javascript',
    Options: ['Array is used to store multiple value in a single variable', 
    'Array is used to multiple value in a single string',
     'Array is used to multiple value in a function ',
      'Array is a variable'],
    CorrectAnswer: 'Array is used to store multiple value in a single variable',
  },

  {
    Question: 'Presiden of russia?',
    Options: ['Salman khan', 'shahrukh Khan', 'Rahul Gandhi', 'Viladimir puttin'],
    CorrectAnswer: 'Viladimir puttin',
  },
  {
    Question: ' Which animal is known as the Ship of the Desert',
    Options: ['Horse', 'Cow', 'Camel', 'Ox'],
    CorrectAnswer: 'Camel',
  },
  {
    Question: 'How many days are there in a week',
    Options: ['1', '10', '7', '70'],
    CorrectAnswer: '7',
  },
  {
    Question: 'How many hours are there in a day',
    Options: ['24', '90', '10', '21'],
    CorrectAnswer: '24',
  },
  {
    Question: ' How many letters are there in the English alphabet',
    Options: ['26', '22', '27', '20'],
    CorrectAnswer: '26',
  },
 
//   {/*  Add more questions here */}
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [time, setTime] = useState(10 * 60); // 10 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      if (isStarted && !isSubmitted) {
        setTime((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isSubmitted]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleStartQuiz = () => {
    setIsStarted(true);
  };

  const handleNextQuestion = () => {
    const correctAnswer = questionsData[currentQuestion].CorrectAnswer;
    if (selectedOption === correctAnswer) {
      setScore((prevScore) => prevScore + 2);
    }

    setSelectedOption('');

    if (currentQuestion === questionsData.length - 1) {
      setIsSubmitted(true);
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const handleSubmitTest = () => {
    const correctAnswer = questionsData[currentQuestion].CorrectAnswer;
    if (selectedOption === correctAnswer) {
      setScore((prevScore) => prevScore + 2);
    }

    setIsSubmitted(true);
  };

  const handleRestartTest = () => {
    setCurrentQuestion(0);
    setSelectedOption('');
    setScore(0);
    setIsSubmitted(false);
    setIsPassed(false);
    setIsStarted(false);
    setTime(10 * 60);
  };

  useEffect(() => {
    if (isSubmitted) {
      if (score >= 12) {
        setIsPassed(true);
      }
    }
  }, [isSubmitted, score]);

  const renderQuestion = () => {
    if (isSubmitted) {
      return (
        <div>
          <h2>Test Result</h2>
          <p>Your score: {score} out of {questionsData.length * 2}</p>
          {isPassed ? (
            <p>Congratulations! You passed the test!</p>
          ) : (
            <button onClick={handleRestartTest}>Restart Test</button>
          )}
        </div>
      );
    }

    const question = questionsData[currentQuestion];

    return (
      <div>
        <h2>Question {currentQuestion + 1}</h2>
        <p>{question.Question}</p>
        <div>
          {question.Options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`option${index}`}
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              <label htmlFor={`option${index}`}>{option}</label>
            </div>
          ))}
        </div>
        <button onClick={currentQuestion === questionsData.length - 1 ? handleSubmitTest : handleNextQuestion}>
          {currentQuestion === questionsData.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    );
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Test</h1>
      {!isStarted ? (
        <button onClick={handleStartQuiz}>Start Quiz</button>
      ) : (
        <div>
          {renderQuestion()}
          <p>Time remaining: {formatTime(time)}</p>
          {time === 0 && !isSubmitted && (
            <div>
              <p>Time's up! Test submitted automatically.</p>
              {renderQuestion()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Quiz;