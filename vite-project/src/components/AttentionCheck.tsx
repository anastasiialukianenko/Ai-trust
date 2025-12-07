import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScreenProps } from '../types/experiment';

const AttentionCheck: React.FC<ScreenProps> = ({ onNext, data, setData }) => {
  const { t } = useTranslation();
  const [answer, setAnswer] = useState<number>(0);

  const handleSubmit = () => {
    const passed = answer === 5; 
    
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
      <h1>{t('attention.title')}</h1>
      <div style={{
        marginBottom: '1.5rem',
        padding: '0.5rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px'
      }}>
        <p style={{ marginBottom: '1rem', fontWeight: '500', fontSize: '16px' }}>
          {t('attention.instruction')}
        </p>
        <p style={{ marginBottom: '1rem', fontWeight: '500' }}>
          {t('attention.statement')}
        </p>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'nowrap', justifyContent: 'space-between', marginBottom: '1rem', maxWidth: '400px' }}>
          <span style={{ fontSize: '14px', color: '#666', maxWidth: '80px', textAlign: 'left'}}>{t('trust.scale.stronglyDisagree')}</span>
          <span style={{ fontSize: '14px', color: '#666', maxWidth: '80px', textAlign: 'right'}}>{t('trust.scale.stronglyAgree')}</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'nowrap', justifyContent: 'space-between', maxWidth: '400px' }}>  {[1, 2, 3, 4, 5, 6, 7].map((score) => (
            <label key={score} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
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
        {t('common.continue')}
      </button>
    </div>
  );
};

export default AttentionCheck;
