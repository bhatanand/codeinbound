import React, { useState, useEffect } from 'react';
import Question from './Question';

const questions = [
  { id: 1, text: 'How satisfied are you with our products?', type: 'rating', scale: 5 },
  { id: 2, text: 'How fair are the prices compared to similar retailers?', type: 'rating', scale: 5 },
  { id: 3, text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', scale: 5 },
  { id: 4, text: 'On a scale of 1-5 how would you recommend us to your friends and family?', type: 'rating', scale: 5 },
  { id: 5, text: 'What could we do to improve our service?', type: 'text' }
];

function Survey({ completeSurvey }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(() => {
    const storedAnswers = JSON.parse(localStorage.getItem('surveyAnswers')) || {};
    return storedAnswers;
  });

  // Save answers in local storage whenever they change
  useEffect(() => {
    localStorage.setItem('surveyAnswers', JSON.stringify(answers));
  }, [answers]);

  const handleAnswerChange = (questionId, answer) => {
    const updatedAnswers = { ...answers, [questionId]: answer };
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit the survey?')) {
      const sessionId = new Date().getTime(); // Simple session identifier
      const surveyData = {
        sessionId,
        answers,
        status: 'COMPLETED',
      };

      // Save completed survey data to local storage
      localStorage.setItem('surveyData', JSON.stringify(surveyData));

      // Clear the survey answers from local storage after submitting
      localStorage.removeItem('surveyAnswers');

      completeSurvey();
    }
  };

  return (
    <div>
      <h2>Survey {currentQuestionIndex + 1}/{questions.length}</h2>
      <Question
        question={questions[currentQuestionIndex]}
        answer={answers[questions[currentQuestionIndex].id]}
        onAnswerChange={handleAnswerChange}
      />
      <div>
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</button>
        <button onClick={handleSkip}>Skip</button>
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
}

export default Survey;
