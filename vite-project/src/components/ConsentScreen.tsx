import React, { useState } from 'react';

interface ConsentScreenProps {
  onAgree: () => void;
}

const ConsentScreen: React.FC<ConsentScreenProps> = ({ onAgree }) => {
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
        <h1>Thank You</h1>
        <p style={{ marginTop: '2rem', fontSize: '18px', color: '#666' }}>
          We understand and respect your decision. Thank you for your time.
        </p>
        <p style={{ marginTop: '1rem', color: '#888' }}>
          If you change your mind, you can refresh the page to participate.
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
      <h1>Research Study Consent</h1>
      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <p>
          You are invited to participate in a research study about consumer behavior and technology.
          This study will take approximately 8 minutes to complete.
        </p>
        <h2>What you will do:</h2>
        <ul>
          <li>View a social media advertisement</li>
          <li>Answer questions about your perceptions and intentions</li>
          <li>Complete a brief demographic survey</li>
        </ul>
        <h2>Your participation is:</h2>
        <ul>
          <li>Voluntary - you can withdraw at any time</li>
          <li>Anonymous - your responses will not be linked to your identity</li>
          <li>Confidential - data will be stored securely</li>
        </ul>
        <h2>Risks and Benefits:</h2>
        <p>
          There are no anticipated risks from participating in this study. 
          Your participation will contribute to scientific knowledge about consumer behavior.
        </p>
        <p style={{ marginTop: '2rem', fontWeight: 'bold' }}>
          By clicking "I Agree" below, you indicate that you have read this information 
          and agree to participate in this study.
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
          I Agree
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
          I Do Not Agree
        </button>
      </div>
    </div>
  );
};

export default ConsentScreen;
