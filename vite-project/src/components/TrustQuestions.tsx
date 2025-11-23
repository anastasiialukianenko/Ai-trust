import React, { useState } from 'react';
import type { ScreenProps } from '../types/experiment';

const TrustQuestions: React.FC<ScreenProps> = ({ onNext, data, setData }) => {
  const [cog1, setCog1] = useState<number>(data.trust?.cog1 || 0);
  const [cog2, setCog2] = useState<number>(data.trust?.cog2 || 0);
  const [cog3, setCog3] = useState<number>(data.trust?.cog3 || 0);
  const [aff1, setAff1] = useState<number>(data.trust?.aff1 || 0);
  const [aff2, setAff2] = useState<number>(data.trust?.aff2 || 0);
  const [aff3, setAff3] = useState<number>(data.trust?.aff3 || 0);

  const cognitiveItems = [
    { id: 'cog1', label: 'This brand is reliable', value: cog1, setValue: setCog1 },
    { id: 'cog2', label: 'This brand is accurate', value: cog2, setValue: setCog2 },
    { id: 'cog3', label: 'This brand is professional', value: cog3, setValue: setCog3 },
  ];

  const affectiveItems = [
    { id: 'aff1', label: 'This brand is honest', value: aff1, setValue: setAff1 },
    { id: 'aff2', label: 'This brand has my best interests at heart', value: aff2, setValue: setAff2 },
    { id: 'aff3', label: 'This brand is sincere and not manipulative', value: aff3, setValue: setAff3 },
  ];

  const handleSubmit = () => {
    setData({
      ...data,
      trust: {
        cog1,
        cog2,
        cog3,
        aff1,
        aff2,
        aff3,
      },
    });
    onNext('purchase');
  };

  const allAnswered = cog1 > 0 && cog2 > 0 && cog3 > 0 && aff1 > 0 && aff2 > 0 && aff3 > 0;

  const renderLikertItem = (item: { id: string; label: string; value: number; setValue: (val: number) => void }) => (
    <div key={item.id} style={{
      marginBottom: '2rem',
      padding: '1.5rem',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px'
    }}>
      <p style={{ marginBottom: '1rem', fontWeight: '500' }}>{item.label}</p>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '14px', color: '#666', minWidth: '120px' }}>Strongly Disagree</span>
        {[1, 2, 3, 4, 5, 6, 7].map((score) => (
          <label key={score} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
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
        <span style={{ fontSize: '14px', color: '#666', minWidth: '120px' }}>Strongly Agree</span>
      </div>
    </div>
  );

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1>Trust Questions</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Please rate your agreement with each statement about the brand you just saw on a scale from 1 (Strongly Disagree) to 7 (Strongly Agree).
      </p>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '1rem', color: '#333' }}>Cognitive Trust</h2>
        {cognitiveItems.map(renderLikertItem)}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '1rem', color: '#333' }}>Affective Trust</h2>
        {affectiveItems.map(renderLikertItem)}
      </div>

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

export default TrustQuestions;
