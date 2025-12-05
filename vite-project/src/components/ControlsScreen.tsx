import React, { useState } from 'react';
import type { ScreenProps } from '../types/experiment';

const ControlsScreen: React.FC<ScreenProps> = ({ onNext, data, setData }) => {
  const [attitudeAI1, setAttitudeAI1] = useState<number>(data.controls?.attitudeAI1 || 0);
  const [attitudeAI2, setAttitudeAI2] = useState<number>(data.controls?.attitudeAI2 || 0);
  const [attitudeAI3, setAttitudeAI3] = useState<number>(data.controls?.attitudeAI3 || 0);

  const attitudeItems = [
    { id: 'attitudeAI1', label: 'Overall, I feel positive about artificial intelligence.', value: attitudeAI1, setValue: setAttitudeAI1 },
    { id: 'attitudeAI2', label: 'I trust AI systems to make good decisions.', value: attitudeAI2, setValue: setAttitudeAI2 },
    { id: 'attitudeAI3', label: 'I worry about the negative impacts of AI.', value: attitudeAI3, setValue: setAttitudeAI3 },
  ];

  const handleSubmit = () => {
    setData({
      ...data,
      controls: {
        ...data.controls,
        attitudeAI1,
        attitudeAI2,
        attitudeAI3,
      },
    });
    onNext('attention');
  };

  const allAnswered = attitudeAI1 > 0 && attitudeAI2 > 0 && attitudeAI3 > 0;

  const renderLikertItem = (item: { id: string; label: string; value: number; setValue: (val: number) => void }) => (
    <div key={item.id} style={{
      marginBottom: '2rem',
      padding: '0.5rem',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px'
    }}>
      <p style={{ marginBottom: '1rem', fontWeight: '500' }}>{item.label}</p>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'nowrap', justifyContent: 'space-between', marginBottom: '1rem', maxWidth: '400px' }}>
        <span style={{ fontSize: '14px', color: '#666', maxWidth: '80px', textAlign: 'left'}}>Strongly Disagree</span>
        <span style={{ fontSize: '14px', color: '#666', maxWidth: '80px', textAlign: 'right'}}>Strongly Agree</span>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'nowrap', justifyContent: 'space-between', maxWidth: '400px' }}>  {[1, 2, 3, 4, 5, 6, 7].map((score) => (
          <label key={score} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <input
              type="radio"
              name={item.id}
              value={score}
              checked={item.value === score}
              onChange={() => item.setValue(score)}
              style={{ marginRight: '4px' }}
            />
            <span>{score}</span>
          </label>
        ))}
      </div></div>
    );

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1>Attitude Toward AI</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Please rate your agreement with each statement about artificial intelligence on a scale from 1 (Strongly Disagree) to 7 (Strongly Agree).
      </p>

      {attitudeItems.map(renderLikertItem)}

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

export default ControlsScreen;
