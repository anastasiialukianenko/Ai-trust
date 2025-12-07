import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScreenProps } from '../types/experiment';

const ManipulationChecks: React.FC<ScreenProps> = ({ onNext, data, setData }) => {
  const { t } = useTranslation();
  const [perceivedAuthor, setPerceivedAuthor] = useState<string>(
    data.manipulationChecks?.perceivedAuthor || ''
  );
  const [noticedDisclosure, setNoticedDisclosure] = useState<string>(
    data.manipulationChecks?.noticedDisclosure || ''
  );

  const authorOptions = [
    t('manipulation.options.human'),
    t('manipulation.options.ai'),
    t('manipulation.options.notSure'),
  ];

  const disclosureOptions = [
    t('manipulation.options.yes'),
    t('manipulation.options.no'),
  ];

  const handleSubmit = () => {
    setData({
      ...data,
      manipulationChecks: {
        perceivedAuthor,
        noticedDisclosure,
      },
    });
    onNext('controls');
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
            key={option}
            style={{
              display: 'block',
              padding: '0.75rem',
              marginBottom: '0.5rem',
              backgroundColor: perceivedAuthor === option ? '#e3f2fd' : 'white',
              border: `1px solid ${perceivedAuthor === option ? '#2196f3' : '#ddd'}`,
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            <input
              type="radio"
              name="perceivedAuthor"
              value={option}
              checked={perceivedAuthor === option}
              onChange={(e) => setPerceivedAuthor(e.target.value)}
              style={{ marginRight: '8px' }}
            />
            {option}
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
            key={option}
            style={{
              display: 'block',
              padding: '0.75rem',
              marginBottom: '0.5rem',
              backgroundColor: noticedDisclosure === option ? '#e3f2fd' : 'white',
              border: `1px solid ${noticedDisclosure === option ? '#2196f3' : '#ddd'}`,
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            <input
              type="radio"
              name="noticedDisclosure"
              value={option}
              checked={noticedDisclosure === option}
              onChange={(e) => setNoticedDisclosure(e.target.value)}
              style={{ marginRight: '8px' }}
            />
            {option}
          </label>
        ))}
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
        {t('common.continue')}
      </button>
    </div>
  );
};

export default ManipulationChecks;
