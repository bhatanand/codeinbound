import React from 'react';

function WelcomeScreen({ startSurvey }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to Our Survey!</h1>
      <p>Please press start to begin the survey.</p>
      <button onClick={startSurvey}>Start</button>
    </div>
  );
}

export default WelcomeScreen;
