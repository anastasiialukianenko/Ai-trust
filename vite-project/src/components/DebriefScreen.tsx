import React from 'react';
import type { DebriefProps } from '../types/experiment';

const DebriefScreen: React.FC<DebriefProps> = ({ onFinish }) => {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.6'
    }}>
      <h1>Debrief</h1>
      <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <p>
          Thank you for participating in this study. This research is investigating how 
          consumers respond to AI-generated advertising content compared to human-created content.
        </p>
        <h2>Study Purpose:</h2>
        <p>
          This study compared human-created advertisements with AI-generated advertisements, 
          with and without disclosure. Some of the advertisements you viewed were created using 
          AI tools, while others were created by humans.
        </p>
        <h2>Data Collection:</h2>
        <p>
          Your responses are anonymous and will be used solely for research purposes. 
          All data will be stored securely and analyzed in aggregate.
        </p>
        <h2>What Happens Next:</h2>
        <p>
          Your responses will be analyzed along with other participants' data to understand 
          how disclosure of AI-generated content affects consumer trust, purchase intention, 
          and willingness to pay.
        </p>
        <p style={{ marginTop: '2rem', fontWeight: 'bold' }}>
          If you have any questions about this study, please contact the research team.
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
        Finish
      </button>
    </div>
  );
};

export default DebriefScreen;
