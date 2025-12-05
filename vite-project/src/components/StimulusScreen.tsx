import React, { useEffect, useState } from 'react';
import type { ScreenProps } from '../types/experiment';
import InstaPost from './InstaPost';

const StimulusScreen: React.FC<ScreenProps> = ({ onNext, setData, condition }) => {
  const [startTime] = useState<number>(performance.now());
  const [minViewTimeElapsed, setMinViewTimeElapsed] = useState<boolean>(false);
  const MIN_VIEW_TIME_MS = 6000; // 6 seconds

  useEffect(() => {
    // Record stimulus view time
    setData(prev => ({
      ...prev,
      stimulusViewTime: Date.now(),
    }));

    // Enforce minimum viewing time
    const timer = setTimeout(() => {
      setMinViewTimeElapsed(true);
    }, MIN_VIEW_TIME_MS);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    const exposureTime = performance.now() - startTime;
    setData(prev => ({
      ...prev,
      qc: {
        ...prev.qc,
        stimulusExposureMs: Math.round(exposureTime),
      },
    }));
    onNext('trust');
  };

  // Determine ad content based on condition
  const getAdContent = () => {
    switch (condition) {
      case 1:
        // Human ad - no disclosure
        return {
          imageSrc: '/api/placeholder/400/400', // Replace with actual image URL
          caption: '',
          showDisclosure: false,
        };
      case 2:
        // AI ad - no disclosure
        return {
          imageSrc: '/api/placeholder/400/400', // Replace with actual image URL
          caption: '',
          showDisclosure: false,
        };
      case 3:
        // AI ad - with disclosure
        return {
          imageSrc: '/api/placeholder/400/400', // Replace with actual image URL
          caption: '',
          showDisclosure: true,
          disclosureText: 'AI info',
        };
      default:
        return {
          imageSrc: '/api/placeholder/400/400',
          caption: '',
          showDisclosure: false,
        };
    }
  };

  const adContent = getAdContent();

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Please view this advertisement
      </h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
        Take your time to examine the ad below. When you're ready, click continue.
      </p>
      
      <InstaPost
        imageSrc={adContent.imageSrc}
        caption={adContent.caption}
        showDisclosure={adContent.showDisclosure}
        disclosureText={adContent.disclosureText}
      />

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        {!minViewTimeElapsed && (
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '1rem' }}>
            Please view the advertisement for at least 6 seconds...
          </p>
        )}
        <button
          onClick={handleContinue}
          disabled={!minViewTimeElapsed}
          style={{
            padding: '12px 32px',
            fontSize: '16px',
            backgroundColor: minViewTimeElapsed ? '#007bff' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: minViewTimeElapsed ? 'pointer' : 'not-allowed',
            fontWeight: 'bold'
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StimulusScreen;
