import React from 'react';
import type { ScreenProps } from '../types/experiment';
import { submitExperimentData } from '../utils/api';

const SubmitScreen: React.FC<ScreenProps> = ({ data, onNext }) => {
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    
    try {
      const finalData = {
        ...data,
        completionTime: Date.now(),
      };
      await submitExperimentData(finalData);
      onNext('thankyou');
    } catch (err) {
      setError('Failed to submit data. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      textAlign: 'center'
    }}>
      <h1>Submit Your Responses</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Thank you for completing the study! Please click the button below to submit your responses.
      </p>
      {error && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#fee',
          color: '#c33',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}
      <button
        onClick={handleSubmit}
        disabled={submitting}
        style={{
          padding: '12px 32px',
          fontSize: '16px',
          backgroundColor: submitting ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: submitting ? 'not-allowed' : 'pointer',
          fontWeight: 'bold'
        }}
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};

export default SubmitScreen;

