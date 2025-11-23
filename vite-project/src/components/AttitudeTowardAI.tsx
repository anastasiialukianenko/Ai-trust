import React, { useState } from 'react';
import type { ScreenProps } from '../types/experiment';

const AttitudeTowardAI: React.FC<ScreenProps> = ({ onNext, data, setData }) => {
  const [attitudeScores, setAttitudeScores] = useState<number[]>(
    data.attitudeTowardAI || [0, 0, 0, 0, 0]
  );

  const questions = [
    'AI-generated content is trustworthy',
    'I prefer content created by humans over AI',
    'AI can create effective advertisements',
    'I am comfortable with AI-generated marketing content',
    'AI-generated content is as good as human-created content',
  ];

  const handleScoreChange = (index: number, score: number) => {
    const newScores = [...attitudeScores];
    newScores[index] = score;
    setAttitudeScores(newScores);
  };

  const handleSubmit = () => {
    setData({
      ...data,
      attitudeTowardAI: attitudeScores,
    });
    onNext('attention');
  };

  const allAnswered = attitudeScores.every(score => score > 0);

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1>Attitude Toward AI</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Please rate your agreement with each statement about AI-generated content.
      </p>

      {questions.map((question, index) => (
        <div key={index} style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px'
        }}>
          <p style={{ marginBottom: '1rem', fontWeight: '500' }}>{question}</p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>Strongly Disagree</span>
            {[1, 2, 3, 4, 5, 6, 7].map((score) => (
              <label key={score} style={{ cursor: 'pointer' }}>
                <input
                  type="radio"
                  name={`attitude-${index}`}
                  value={score}
                  checked={attitudeScores[index] === score}
                  onChange={() => handleScoreChange(index, score)}
                  style={{ marginRight: '4px' }}
                />
                {score}
              </label>
            ))}
            <span style={{ fontSize: '14px', color: '#666' }}>Strongly Agree</span>
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={!allAnswered}
        style={{
          padding: '12px 32px',
          fontSize: '16px',
          backgroundColor: allAnswered ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: allAnswered ? 'pointer' : 'not-allowed',
          fontWeight: 'bold',
          display: 'block',
          margin: '2rem auto 0'
        }}
      >
        Continue
      </button>
    </div>
  );
};

export default AttitudeTowardAI;

