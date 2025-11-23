import React, { useState } from 'react';
import type { ScreenProps } from '../types/experiment';

const PurchaseQuestions: React.FC<ScreenProps> = ({ onNext, data, setData }) => {
  const [pi1, setPi1] = useState<number>(data.purchase?.pi1 || 0);
  const [pi2, setPi2] = useState<number>(data.purchase?.pi2 || 0);
  const [pi3, setPi3] = useState<number>(data.purchase?.pi3 || 0);
  const [pi4, setPi4] = useState<number>(data.purchase?.pi4 || 0);
  const [wtp, setWtp] = useState<number>(data.purchase?.wtp || 0.50);

  const purchaseIntentionItems = [
    { id: 'pi1', label: 'I would consider buying this product', value: pi1, setValue: setPi1 },
    { id: 'pi2', label: 'I would like to try this product', value: pi2, setValue: setPi2 },
    { id: 'pi3', label: 'I am likely to purchase this product', value: pi3, setValue: setPi3 },
    { id: 'pi4', label: 'I would recommend this product to others', value: pi4, setValue: setPi4 },
  ];

  const handleSubmit = () => {
    setData({
      ...data,
      purchase: {
        pi1,
        pi2,
        pi3,
        pi4,
        wtp: parseFloat(wtp.toFixed(2)),
      },
    });
    onNext('manipChecks');
  };

  const allAnswered = pi1 > 0 && pi2 > 0 && pi3 > 0 && pi4 > 0 && wtp > 0;

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
      <h1>Purchase Questions</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Please answer the following questions about your purchase intentions and willingness to pay.
      </p>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '1rem', color: '#333' }}>Purchase Intention</h2>
        <p style={{ marginBottom: '1rem', fontSize: '14px', color: '#666' }}>
          Please rate your agreement with each statement on a scale from 1 (Strongly Disagree) to 7 (Strongly Agree).
        </p>
        {purchaseIntentionItems.map(renderLikertItem)}
      </div>

      <div style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px'
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '1rem', color: '#333' }}>Willingness to Pay</h2>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          Similar products usually cost <strong>1.50 EUR</strong>.
        </p>
        <p style={{ marginBottom: '1.5rem', color: '#666' }}>
          How much would you be willing to pay for this product?
        </p>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>0.50 EUR</span>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#007bff' }}>
              {wtp.toFixed(2)} EUR
            </span>
            <span style={{ fontSize: '14px', color: '#666' }}>3.00 EUR</span>
          </div>
          <input
            type="range"
            min="0.50"
            max="3.00"
            step="0.10"
            value={wtp}
            onChange={(e) => setWtp(parseFloat(e.target.value))}
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
            min="0.50"
            max="3.00"
            step="0.10"
            value={wtp.toFixed(2)}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              if (!isNaN(val) && val >= 0.50 && val <= 3.00) {
                setWtp(val);
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

export default PurchaseQuestions;
