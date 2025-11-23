import React, { useState } from 'react';
import type { ScreenProps } from '../types/experiment';

const AttentionCheck: React.FC<ScreenProps> = ({ onNext, data, setData }) => {
  const [answer, setAnswer] = useState<number>(0);

  const handleSubmit = () => {
    // Check if user selected "Agree" (assuming 7 is "Strongly Agree" and we want them to select a high value)
    // Actually, the instruction says to select "Agree", so let's check if they selected 6 or 7
    const passed = answer >= 6; // 6 or 7 would be "Agree" or "Strongly Agree"
    
    setData({
      ...data,
      qc: {
        ...data.qc,
        attentionCheckAnswer: answer.toString(),
        attentionCheckPassed: passed,
      },
    });
    onNext('debrief');
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1>Attention Check</h1>
      <div style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px'
      }}>
        <p style={{ marginBottom: '1rem', fontWeight: '500', fontSize: '16px' }}>
          To show that you are paying attention, please select "Agree" for this statement.
        </p>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
          <span style={{ fontSize: '14px', color: '#666', minWidth: '120px' }}>Strongly Disagree</span>
          {[1, 2, 3, 4, 5, 6, 7].map((score) => (
            <label key={score} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                name="attentionCheck"
                value={score}
                checked={answer === score}
                onChange={() => setAnswer(score)}
                style={{ marginRight: '4px' }}
              />
              <span>{score}</span>
            </label>
          ))}
          <span style={{ fontSize: '14px', color: '#666', minWidth: '120px' }}>Strongly Agree</span>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        disabled={answer === 0}
        style={{
          padding: '12px 32px',
          fontSize: '16px',
          backgroundColor: answer > 0 ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: answer > 0 ? 'pointer' : 'not-allowed',
          fontWeight: 'bold',
          display: 'block',
          margin: '0 auto'
        }}
      >
        Continue
      </button>
    </div>
  );
};

export default AttentionCheck;
