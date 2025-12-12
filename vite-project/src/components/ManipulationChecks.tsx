import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScreenProps } from '../types/experiment';

const ManipulationChecks: React.FC<ScreenProps> = ({ onNext, onBack, data, setData }) => {
  const { t } = useTranslation();
  const [perceivedAuthor, setPerceivedAuthor] = useState<string>(
    data.manipulationChecks?.perceivedAuthor || ''
  );
  const [noticedDisclosure, setNoticedDisclosure] = useState<string>(
    data.manipulationChecks?.noticedDisclosure || ''
  );

  // Store English values internally, but display translated labels
  const authorOptions = [
    { value: 'human', label: t('manipulation.options.human') },
    { value: 'ai', label: t('manipulation.options.ai') },
    { value: 'notSure', label: t('manipulation.options.notSure') },
  ];

  const disclosureOptions = [
    { value: 'yes', label: t('manipulation.options.yes') },
    { value: 'no', label: t('manipulation.options.no') },
  ];

  const saveData = () => {
    setData({
      ...data,
      manipulationChecks: {
        perceivedAuthor,
        noticedDisclosure,
      },
    });
  };

  const handleSubmit = () => {
    saveData();
    onNext('controls');
  };

  const handleBack = () => {
    saveData();
    onBack?.();
  };

  const allAnswered = perceivedAuthor !== '' && noticedDisclosure !== '';

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1>{t('manipulation.title')}</h1>

      {/* Question 1: Perceived Author */}
      <div style={{
        marginBottom: '1rem',
        padding: '1.5rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px'
      }}>
        <p style={{ marginBottom: '1rem', fontWeight: '500' }}>
          {t('manipulation.perceivedAuthor')}
        </p>
        {authorOptions.map((option) => (
          <label
            key={option.value}
            style={{
              display: 'block',
              padding: '0.75rem',
              marginBottom: '0.5rem',
              backgroundColor: perceivedAuthor === option.value ? '#e3f2fd' : 'white',
              border: `1px solid ${perceivedAuthor === option.value ? '#2196f3' : '#ddd'}`,
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            <input
              type="radio"
              name="perceivedAuthor"
              value={option.value}
              checked={perceivedAuthor === option.value}
              onChange={(e) => setPerceivedAuthor(e.target.value)}
              style={{ marginRight: '8px' }}
            />
            {option.label}
          </label>
        ))}
      </div>

      {/* Question 2: Noticed Disclosure */}
      <div style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px'
      }}>
        <p style={{ marginBottom: '1rem', fontWeight: '500' }}>
          {t('manipulation.noticedDisclosure')}
        </p>
        {disclosureOptions.map((option) => (
          <label
            key={option.value}
            style={{
              display: 'block',
              padding: '0.75rem',
              marginBottom: '0.5rem',
              backgroundColor: noticedDisclosure === option.value ? '#e3f2fd' : 'white',
              border: `1px solid ${noticedDisclosure === option.value ? '#2196f3' : '#ddd'}`,
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            <input
              type="radio"
              name="noticedDisclosure"
              value={option.value}
              checked={noticedDisclosure === option.value}
              onChange={(e) => setNoticedDisclosure(e.target.value)}
              style={{ marginRight: '8px' }}
            />
            {option.label}
          </label>
        ))}
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

export default ManipulationChecks;
