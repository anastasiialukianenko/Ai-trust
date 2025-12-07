import React from 'react';
import { useTranslation } from 'react-i18next';
import type { DebriefProps } from '../types/experiment';

const DebriefScreen: React.FC<DebriefProps> = ({ onFinish }) => {
  const { t } = useTranslation();
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.6'
    }}>
      <h1>{t('debrief.title')}</h1>
      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <p>
          {t('debrief.thankYou')}
        </p>
        <h2>{t('debrief.studyPurpose')}</h2>
        <p>
          {t('debrief.purposeText')}
        </p>
        <h2>{t('debrief.dataCollection')}</h2>
        <p>
          {t('debrief.dataText')}
        </p>
        <h2>{t('debrief.whatNext')}</h2>
        <p>
          {t('debrief.nextText')}
        </p>
        <p style={{ marginTop: '2rem', fontWeight: 'bold' }}>
          {t('debrief.contact')}
        </p>
      </div>
      <button
        onClick={() => {
          console.log('🔘 Finish button clicked');
          onFinish();
        }}
        style={{
          padding: '12px 32px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        {t('common.finish')}
      </button>
    </div>
  );
};

export default DebriefScreen;
