import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScreenProps } from '../types/experiment';

const AttentionCheck: React.FC<ScreenProps> = ({ onNext, onBack, data, setData }) => {
  const { t } = useTranslation();
  const [answer, setAnswer] = useState<string>(
    data.qc?.attentionCheckAnswer || ''
  );

  const saveData = () => {
    const passed = answer === 'agree'; 
    
    setData({
      ...data,
      qc: {
        ...data.qc,
        attentionCheckAnswer: answer,
        attentionCheckPassed: passed,
      },
    });
  };

  const handleSubmit = () => {
    saveData();
    onNext('debrief');
  };

  const handleBack = () => {
    saveData();
    onBack?.();
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
        marginBottom: '2rem',
        padding: '2rem',
        backgroundColor: '#f0f7ff',
        borderRadius: '8px',
        border: '2px solid #007bff'
      }}>
        <p style={{ 
          marginBottom: '1.5rem', 
          fontSize: '18px', 
          fontWeight: '600',
          color: '#333',
          textAlign: 'center'
        }}>
          {t('attention.instruction')}
        </p>
        <p style={{ 
          marginBottom: '2rem', 
          fontSize: '16px',
          color: '#555',
          textAlign: 'center'
        }}>
          {t('attention.statement')}
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setAnswer('agree')}
            style={{
              padding: '16px 32px',
              fontSize: '18px',
              backgroundColor: answer === 'agree' ? '#28a745' : '#fff',
              color: answer === 'agree' ? '#fff' : '#28a745',
              border: '2px solid #28a745',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              minWidth: '150px',
              transition: 'all 0.2s'
            }}
          >
            {t('attention.agree')}
          </button>
          <button
            onClick={() => setAnswer('disagree')}
            style={{
              padding: '16px 32px',
              fontSize: '18px',
              backgroundColor: answer === 'disagree' ? '#dc3545' : '#fff',
              color: answer === 'disagree' ? '#fff' : '#dc3545',
              border: '2px solid #dc3545',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              minWidth: '150px',
              transition: 'all 0.2s'
            }}
          >
            {t('attention.disagree')}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        {onBack && (
          <button
            onClick={handleBack}
            style={{
              padding: '12px 32px',
              fontSize: '16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {t('common.back')}
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={!answer}
          style={{
            padding: '12px 32px',
            fontSize: '16px',
            backgroundColor: answer ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: answer ? 'pointer' : 'not-allowed',
            fontWeight: 'bold'
          }}
        >
          {t('common.continue')}
        </button>
      </div>
    </div>
  );
};

export default AttentionCheck;
