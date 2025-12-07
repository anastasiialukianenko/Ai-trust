import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ConsentScreenProps {
  onAgree: () => void;
}

const ConsentScreen: React.FC<ConsentScreenProps> = ({ onAgree }) => {
  const { t } = useTranslation();
  const [disagreed, setDisagreed] = useState(false);

  const handleAgree = () => {
    onAgree();
  };

  const handleDisagree = () => {
    setDisagreed(true);
  };

  if (disagreed) {
    return (
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        lineHeight: '1.6',
        textAlign: 'center'
      }}>
        <h1>{t('common.thankYou', 'Thank You')}</h1>
        <p style={{ marginTop: '2rem', fontSize: '18px', color: '#666' }}>
          {t('consent.disagreed')}
        </p>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.6'
    }}>
      <h1>{t('consent.title')}</h1>
      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <p>{t('consent.intro')}</p>
        <h2>{t('consent.whatYouWillDo')}</h2>
        <ul>
          <li>{t('consent.viewAd')}</li>
          <li>{t('consent.answerQuestions')}</li>
          <li>{t('consent.demographicSurvey')}</li>
        </ul>
        <h2>{t('consent.participation')}</h2>
        <ul>
          <li>{t('consent.voluntary')}</li>
          <li>{t('consent.anonymous')}</li>
          <li>{t('consent.confidential')}</li>
        </ul>
        <h2>{t('consent.risksAndBenefits')}</h2>
        <p>{t('consent.noRisks')}</p>
        <p style={{ marginTop: '2rem', fontWeight: 'bold' }}>
          {t('consent.agreement')}
        </p>
      </div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <button
          onClick={handleAgree}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {t('common.agree')}
        </button>
        <button
          onClick={handleDisagree}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {t('common.disagree')}
        </button>
      </div>
    </div>
  );
};

export default ConsentScreen;
