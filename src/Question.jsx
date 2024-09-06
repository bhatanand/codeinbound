import React from 'react';
import './App.css'; // Import global styles

function Question({ question, answer, onAnswerChange }) {
  const handleInputChange = (e) => {
    onAnswerChange(question.id, e.target.value);
  };

  return (
    <div className="container question-container">
      <h3>{question.text}</h3>
      {/* For Rating Questions */}
      {question.type === 'rating' && (
        <div className="rating-container">
          {[...Array(question.scale)].map((_, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`question-${question.id}-rating-${index + 1}`}
                name={`question-${question.id}`}
                value={index + 1}
                checked={parseInt(answer) === index + 1}
                onChange={handleInputChange}
              />
              <label htmlFor={`question-${question.id}-rating-${index + 1}`}>
                {index + 1}
              </label>
            </div>
          ))}
        </div>
      )}

      {/* For Text Type Question */}
      {question.type === 'text' && (
        <textarea
          className="text-input"
          value={answer || ''}
          onChange={handleInputChange}
          placeholder="Your feedback..."
        />
      )}
    </div>
  );
}

export default Question;
