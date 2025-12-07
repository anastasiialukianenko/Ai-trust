import { useState, useEffect } from 'react';
import './App.css';
import type { Condition, Step, ExperimentData } from './types/experiment';
import { randomCondition } from './utils/randomization';
import { initialData } from './utils/initialData';
import { submitExperimentData } from './utils/api';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './components/LanguageSelector';

// Import all screen components
import ConsentScreen from './components/ConsentScreen';
import ScreeningScreen from './components/ScreeningScreen';
import StimulusScreen from './components/StimulusScreen';
import TrustQuestions from './components/TrustQuestions';
import PurchaseQuestions from './components/PurchaseQuestions';
import ManipulationChecks from './components/ManipulationChecks';
import ControlsScreen from './components/ControlsScreen';
import AttentionCheck from './components/AttentionCheck';
import DebriefScreen from './components/DebriefScreen';
import ThankYouScreen from './components/ThankYouScreen';

function App() {
  const { i18n } = useTranslation();
  const [condition] = useState<Condition>(() => randomCondition());
  const [data, setData] = useState<ExperimentData>(() => initialData(condition));
  const [step, setStep] = useState<Step>("consent");

  // Store language preference in data when it changes
  useEffect(() => {
    setData(prev => ({
      ...prev,
      language: i18n.language,
    }));
  }, [i18n.language]);

  const goTo = (next: Step) => {
    setStep(next);
    
    // Set startedAt when moving from consent to screening
    if (next === 'screening' && !data.startedAt) {
      setData(prev => ({
        ...prev,
        startedAt: performance.now(),
        consentTime: Date.now(),
      }));
    }

  };

  const goBack = () => {
    // Map each step to its previous step
    const stepMap: Record<Step, Step | null> = {
      'consent': null,
      'screening': 'consent',
      'stimulus': 'screening',
      'trust': 'stimulus',
      'purchase': 'trust',
      'manipChecks': 'purchase',
      'controls': 'manipChecks',
      'attention': 'controls',
      'debrief': 'attention',
      'submit': 'debrief',
      'thankyou': null,
    };

    const previousStep = stepMap[step];
    if (previousStep) {
      setStep(previousStep);
    }
  };

  const handleConsent = () => {
    goTo('screening');
  };

  const handleDebriefFinish = () => {
    console.log('🚀 handleDebriefFinish called');
    console.log('📊 Current data:', data);
    
    // Compute timing and submit data when finishing debrief
    const finishedAt = Date.now();
    const totalDurationMs = data.startedAt 
      ? finishedAt - data.startTime
      : finishedAt - data.startTime;

    const finalData = {
      ...data,
      finishedAt,
      totalDurationMs: Math.round(totalDurationMs),
    };

    console.log('📦 Final data to submit:', finalData);

    // Update data first
    setData(finalData);

    // Submit data asynchronously, then move to thankyou
    console.log('📤 Calling submitExperimentData...');
    submitExperimentData(finalData)
      .then(() => {
        console.log('✅ Submission successful, moving to thankyou');
        setStep('thankyou');
      })
      .catch((error) => {
        console.error('❌ Failed to submit data:', error);
        // Still move to thankyou even if submission fails
        // (since we're using no-cors mode, we can't reliably detect failures)
        setStep('thankyou');
      });
  };

  const screenProps = {
    data,
    setData,
    onNext: goTo,
    onBack: goBack,
    condition,
  };

  return (
    <div className="app-layout">
      <LanguageSelector />
      {(() => {
        switch (step) {
          case 'consent':
            return <ConsentScreen onAgree={handleConsent} />;
          
          case 'screening':
            return <ScreeningScreen {...screenProps} />;
          
          case 'stimulus':
            return <StimulusScreen {...screenProps} />;
          
          case 'trust':
            return <TrustQuestions {...screenProps} />;
          
          case 'purchase':
            return <PurchaseQuestions {...screenProps} />;
          
          case 'manipChecks':
            return <ManipulationChecks {...screenProps} />;
          
          case 'controls':
            return <ControlsScreen {...screenProps} />;
          
          case 'attention':
            return <AttentionCheck {...screenProps} />;
          
          case 'debrief':
            return <DebriefScreen onFinish={handleDebriefFinish} />;
          
          case 'submit':
            // This step is handled automatically, show loading
            return (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>Submitting your responses...</p>
              </div>
            );
          
          case 'thankyou':
            return <ThankYouScreen />;
          
          default:
            return <div>Unknown step: {step}</div>;
        }
      })()}
    </div>
  );
}

export default App;
