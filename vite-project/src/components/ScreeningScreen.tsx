import React, { useState } from 'react';
import type { ScreenProps } from '../types/experiment';

const ScreeningScreen: React.FC<ScreenProps> = ({ onNext, data, setData }) => {
  const [ageRange, setAgeRange] = useState<string>(data.demographics?.age || '');
  const [country, setCountry] = useState<string>(data.demographics?.country || '');
  const [gender, setGender] = useState<string>(data.demographics?.gender || '');
  const [socialMediaFreq, setSocialMediaFreq] = useState<string>(
    data.controls?.socialMediaFreq || ''
  );
  const [notEligible, setNotEligible] = useState<string | null>(null);

  const ageRangeOptions = [
    { value: 'genZ', label: 'Gen Z (18-27 years)' },
    { value: 'millennial', label: 'Millennial (28-43 years)' },
    { value: 'genX', label: 'Gen X (44-59 years)' },
    { value: 'babyBoomer', label: 'Baby Boomer (60-77 years)' },
    { value: 'silentGen', label: 'Silent Generation (78+ years)' },
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'preferNotToSay', label: 'Prefer not to say' },
  ];

  const socialMediaOptions = [
    { value: 'severalTimesADay', label: 'Several times a day' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'lessThanWeekly', label: 'Less than weekly' },
    { value: 'never', label: 'Never' },
  ];

  const handleAgeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAgeRange(e.target.value);
    setNotEligible(null);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSocialMediaFreq(e.target.value);
    setNotEligible(null);
  };

  const validateAndSubmit = () => {
    // Validate age range (must select a generation)
    if (!ageRange) {
      setNotEligible('Please select your age range.');
      return;
    }

    // Validate social media frequency
    const validFrequencies = ['weekly', 'daily', 'severalTimesADay'];
    if (!socialMediaFreq || !validFrequencies.includes(socialMediaFreq)) {
      setNotEligible('You must use social media at least weekly to participate in this study.');
      return;
    }

    // Validate country (required)
    if (!country.trim()) {
      setNotEligible('Please provide your country.');
      return;
    }

    // All validations passed - save data and proceed
    setNotEligible(null);
    setData(prev => ({
      ...prev,
      demographics: {
        ...prev.demographics,
        age: ageRange,
        country: country.trim(),
        gender: gender || undefined,
      },
      controls: {
        ...prev.controls,
        socialMediaFreq: socialMediaFreq,
      },
    }));
    onNext('stimulus');
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1>Screening</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Please answer a few quick questions to ensure you're eligible for this study.
      </p>

      {notEligible && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#fee',
          color: '#c33',
          borderRadius: '4px',
          marginBottom: '2rem',
          border: '1px solid #fcc'
        }}>
          <strong>Not Eligible:</strong> {notEligible}
        </div>
      )}

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        {/* Age Range */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500'
          }}>
            Age Range <span style={{ color: '#c33' }}>*</span>
          </label>
          <select
            value={ageRange}
            onChange={handleAgeRangeChange}
            style={{
              width: '100%',
              maxWidth: '300px',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: 'white'
            }}
          >
            <option value="">Select your generation</option>
            {ageRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500'
          }}>
            Country <span style={{ color: '#c33' }}>*</span>
          </label>
          <input
            type="text"
            value={country}
            onChange={handleCountryChange}
            placeholder="Enter your country"
            style={{
              width: '100%',
              maxWidth: '300px',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Gender (optional) */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500'
          }}>
            Gender (optional)
          </label>
          <select
            value={gender}
            onChange={handleGenderChange}
            style={{
              width: '100%',
              maxWidth: '300px',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: 'white'
            }}
          >
            <option value="">Select an option (optional)</option>
            {genderOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Social Media Frequency */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500'
          }}>
            How often do you use social media? <span style={{ color: '#c33' }}>*</span>
          </label>
          <select
            value={socialMediaFreq}
            onChange={handleSocialMediaChange}
            style={{
              width: '100%',
              maxWidth: '300px',
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: 'white'
            }}
          >
            <option value="">Select an option</option>
            {socialMediaOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={validateAndSubmit}
        style={{
          marginTop: '2rem',
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
        Continue
      </button>
    </div>
  );
};

export default ScreeningScreen;
