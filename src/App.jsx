import React, { useState, useEffect } from 'react';
import './App.css';
import WelcomeScreen from './WelcomeScreen';
import Survey from './Survey';
import ThankYouScreen from "./ThankYouScreen";

function App() {
  const [surveyStarted, setSurveyStarted] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);

  const startSurvey = () => setSurveyStarted(true);
  const completeSurvey = () => {
    setSurveyStarted(false);
    setSurveyCompleted(true);
    setTimeout(() => setSurveyCompleted(false), 5000);  // Show "Thank you" for 5 seconds
  };

  return (
    <div>
      {!surveyStarted && !surveyCompleted && <WelcomeScreen startSurvey={startSurvey} />}
      {surveyStarted && <Survey completeSurvey={completeSurvey} />}
      {surveyCompleted && <ThankYouScreen />}
    </div>
  );
}

export default App;
