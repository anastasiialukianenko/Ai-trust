import React from 'react';

const ThankYouScreen: React.FC = () => {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      textAlign: 'center'
    }}>
      <h1>Thank You!</h1>
      <p style={{ marginTop: '2rem', fontSize: '18px', color: '#666' }}>
        Your responses have been successfully submitted.
      </p>
      <p style={{ marginTop: '1rem', color: '#888' }}>
        We appreciate your participation in this research study.
      </p>
    </div>
  );
};

export default ThankYouScreen;

