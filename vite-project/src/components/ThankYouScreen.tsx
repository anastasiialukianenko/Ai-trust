import React from 'react';
import { useTranslation } from 'react-i18next';

const ThankYouScreen: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      textAlign: 'center'
    }}>
      <h1>{t('thankYou.title')}</h1>
      <p style={{ marginTop: '2rem', fontSize: '18px', color: '#666' }}>
        {t('thankYou.message')}
      </p>
    </div>
  );
};

export default ThankYouScreen;

