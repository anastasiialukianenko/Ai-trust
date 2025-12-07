import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScreenProps } from '../types/experiment';

const PurchaseQuestions: React.FC<ScreenProps> = ({ onNext, onBack, data, setData }) => {
  const { t } = useTranslation();
  const [pi1, setPi1] = useState<number>(data.purchase?.pi1 || 0);
  const [pi2, setPi2] = useState<number>(data.purchase?.pi2 || 0);
  const [pi3, setPi3] = useState<number>(data.purchase?.pi3 || 0);

  const [wtp1, setWtp1] = useState<number>(data.purchase?.wtp1 || 0);
  const [wtp2, setWtp2] = useState<number>(data.purchase?.wtp2 || 0);
  const [wtp3, setWtp3] = useState<number>(data.purchase?.wtp3 || 0);
  const [wtp4, setWtp4] = useState<number>(data.purchase?.wtp4 || 0);

  const purchaseIntentionItems = [
    { id: 'pi1', label: t('purchase.items.pi1'), value: pi1, setValue: setPi1 },
    { id: 'pi2', label: t('purchase.items.pi2'), value: pi2, setValue: setPi2 },
    { id: 'pi3', label: t('purchase.items.pi3'), value: pi3, setValue: setPi3 },
    { id: 'wtp1', label: t('purchase.items.wtp1'), value: wtp1, setValue: setWtp1 },
    { id: 'wtp2', label: t('purchase.items.wtp2'), value: wtp2, setValue: setWtp2 },
    { id: 'wtp3', label: t('purchase.items.wtp3'), value: wtp3, setValue: setWtp3 },
  ];

  const saveData = () => {
    setData({
      ...data,
      purchase: {
        pi1,
        pi2,
        pi3,
        wtp1,
        wtp2,
        wtp3,
        wtp4: parseFloat(wtp4.toFixed(2)),
      },
    });
  };

  const handleSubmit = () => {
    saveData();
    onNext('manipChecks');
  };

  const handleBack = () => {
    saveData();
    onBack?.();
  };

  const allAnswered = pi1 > 0 && pi2 > 0 && pi3 > 0 && wtp1 > 0 && wtp2 > 0 && wtp3 > 0 && wtp4 > 0;

  const renderLikertItem = (item: { id: string; label: string; value: number; setValue: (val: number) => void }) => (
    <div key={item.id} style={{
      marginBottom: '1.5rem',
      padding: '0.5rem',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px'
    }}>
      <p style={{ marginBottom: '1rem', fontWeight: '500' }}>{item.label}</p>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'nowrap', justifyContent: 'space-between', marginBottom: '1rem', maxWidth: '400px' }}>
        <span style={{ fontSize: '14px', color: '#666', maxWidth: '80px' }}>{t('trust.scale.stronglyDisagree')}</span>
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
      <h1>{t('purchase.title')}</h1>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '1rem', color: '#333' }}>{t('purchase.title')}</h2>
        {purchaseIntentionItems.map(renderLikertItem)}
      </div>

      <div style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px'
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '1rem', color: '#333' }}>{t('purchase.wtp.title')}</h2>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          {t('purchase.wtp.reference', { price: '70' })}
        </p>
        <p style={{ marginBottom: '1.5rem', color: '#666' }}>
          {t('purchase.wtp.question')}
        </p>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>0 EUR</span>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#007bff' }}>
              {wtp4} EUR
            </span>
            <span style={{ fontSize: '14px', color: '#666' }}>3000 EUR</span>
          </div>
          <input
            type="range"
            min="0.00"
            max="3000.00"
            step="10"
            value={wtp4}
            onChange={(e) => setWtp4(parseFloat(e.target.value))}
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: '#ddd',
              outline: 'none',
              cursor: 'pointer'
            }}
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <input
            type="number"
            min="0"
            max="3000"
            step="100"
            value={wtp4}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              if (!isNaN(val) && val >= 0 && val <= 3000) {
                setWtp4(val);
              }
            }}
            style={{
              padding: '8px 12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              width: '120px',
              textAlign: 'center'
            }}
          />
          <span style={{ marginLeft: '8px', fontSize: '16px' }}>EUR</span>
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

export default PurchaseQuestions;
