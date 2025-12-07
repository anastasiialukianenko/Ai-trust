import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScreenProps } from '../types/experiment';

const TrustQuestions: React.FC<ScreenProps> = ({ onNext, onBack, data, setData }) => {
  const { t } = useTranslation();
  const [cog1, setCog1] = useState<number>(data.trust?.cog1 || 0);
  const [cog2, setCog2] = useState<number>(data.trust?.cog2 || 0);
  const [cog3, setCog3] = useState<number>(data.trust?.cog3 || 0);
  const [cog4, setCog4] = useState<number>(data.trust?.cog4 || 0);
  const [aff1, setAff1] = useState<number>(data.trust?.aff1 || 0);
  const [aff2, setAff2] = useState<number>(data.trust?.aff2 || 0);
  const [aff3, setAff3] = useState<number>(data.trust?.aff3 || 0);
  const [aff4, setAff4] = useState<number>(data.trust?.aff4 || 0);

  const cognitiveItems = [
    { id: 'cog1', label: t('trust.items.cog1'), value: cog1, setValue: setCog1 },
    { id: 'cog2', label: t('trust.items.cog2'), value: cog2, setValue: setCog2 },
    { id: 'cog3', label: t('trust.items.cog3'), value: cog3, setValue: setCog3 },
    { id: 'cog4', label: t('trust.items.cog4'), value: cog4, setValue: setCog4 },
  ];

  const affectiveItems = [
    { id: 'aff1', label: t('trust.items.aff1'), value: aff1, setValue: setAff1 },
    { id: 'aff2', label: t('trust.items.aff2'), value: aff2, setValue: setAff2 },
    { id: 'aff3', label: t('trust.items.aff3'), value: aff3, setValue: setAff3 },
    { id: 'aff4', label: t('trust.items.aff4'), value: aff4, setValue: setAff4 },
  ];

  const saveData = () => {
    setData({
      ...data,
      trust: {
        cog1,
        cog2,
        cog3,
        cog4,
        aff1,
        aff2,
        aff3,
        aff4,
      },
    });
  };

  const handleSubmit = () => {
    saveData();
    onNext('purchase');
  };

  const handleBack = () => {
    saveData();
    onBack?.();
  };

  const allAnswered = cog1 > 0 && cog2 > 0 && cog3 > 0 && cog4 > 0 && aff1 > 0 && aff2 > 0 && aff3 > 0 && aff4 > 0;

  const renderLikertItem = (item: { id: string; label: string; value: number; setValue: (val: number) => void }) => (
    <div key={item.id} style={{
      marginBottom: '1.5rem',
      padding: '0.5rem',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px'
    }}>
      <p style={{ marginBottom: '1rem', fontWeight: '500' }}>{item.label}</p>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'nowrap', justifyContent: 'space-between', marginBottom: '1rem', maxWidth: '400px' }}>
        <span style={{ fontSize: '14px', color: '#666', maxWidth: '80px', textAlign: 'left'}}>{t('trust.scale.stronglyDisagree')}</span>
        <span style={{ fontSize: '14px', color: '#666', maxWidth: '80px', textAlign: 'right'}}>{t('trust.scale.stronglyAgree')}</span>
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
      <h1>{t('trust.title')}</h1>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '1rem', color: '#333' }}>{t('trust.cognitiveTitle')}</h2>
        {cognitiveItems.map(renderLikertItem)}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '1rem', color: '#333' }}>{t('trust.affectiveTitle')}</h2>
        {affectiveItems.map(renderLikertItem)}
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
          disabled={!allAnswered}
          style={{
            padding: '12px 32px',
            fontSize: '16px',
            backgroundColor: allAnswered ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: allAnswered ? 'pointer' : 'not-allowed',
            fontWeight: 'bold'
          }}
        >
          {t('common.continue')}
        </button>
      </div>
    </div>
  );
};

export default TrustQuestions;
