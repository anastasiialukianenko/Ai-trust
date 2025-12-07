import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScreenProps } from '../types/experiment';

const ScreeningScreen: React.FC<ScreenProps> = ({ onNext, data, setData }) => {
  const { t } = useTranslation();
  const [ageRange, setAgeRange] = useState<string>(data.demographics?.age || '');
  const [country, setCountry] = useState<string>(data.demographics?.country || '');
  const [gender, setGender] = useState<string>(data.demographics?.gender || '');
  const [socialMediaFreq, setSocialMediaFreq] = useState<string>(
    data.controls?.socialMediaFreq || ''
  );
  const [notEligible, setNotEligible] = useState<string | null>(null);

  const ageRangeOptions = [
    { value: 'genZ', label: t('screening.ageOptions.genZ') },
    { value: 'millennial', label: t('screening.ageOptions.millennial') },
    { value: 'genX', label: t('screening.ageOptions.genX') },
    { value: 'babyBoomer', label: t('screening.ageOptions.babyBoomer') },
    { value: 'silentGen', label: t('screening.ageOptions.silentGen') },
  ];

  const genderOptions = [
    { value: 'male', label: t('screening.genderOptions.male') },
    { value: 'female', label: t('screening.genderOptions.female') },
    { value: 'other', label: t('screening.genderOptions.other') },
    { value: 'preferNotToSay', label: t('screening.genderOptions.preferNotToSay') },
  ];

  const socialMediaOptions = [
    { value: 'severalTimesADay', label: t('screening.socialMediaOptions.severalTimesADay') },
    { value: 'daily', label: t('screening.socialMediaOptions.daily') },
    { value: 'weekly', label: t('screening.socialMediaOptions.weekly') },
    { value: 'lessThanWeekly', label: t('screening.socialMediaOptions.lessThanWeekly') },
    { value: 'never', label: t('screening.socialMediaOptions.never') },
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
      setNotEligible(t('screening.selectAgeRange'));
      return;
    }

    // Validate social media frequency
    const validFrequencies = ['weekly', 'daily', 'severalTimesADay'];
    if (!socialMediaFreq || !validFrequencies.includes(socialMediaFreq)) {
      setNotEligible(t('screening.notEligible'));
      return;
    }

    // Validate country (required)
    if (!country.trim()) {
      setNotEligible(t('screening.enterCountry'));
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
      <h1>{t('screening.title')}</h1>

      {notEligible && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#fee',
          color: '#c33',
          borderRadius: '4px',
          marginBottom: '2rem',
          border: '1px solid #fcc'
        }}>
          {notEligible}
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
            {t('screening.ageRange')} <span style={{ color: '#c33' }}>*</span>
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
            <option value="">{t('screening.selectAgeRange')}</option>
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
            {t('screening.country')} <span style={{ color: '#c33' }}>*</span>
          </label>
          <input
            type="text"
            value={country}
            onChange={handleCountryChange}
            placeholder={t('screening.enterCountry')}
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
            {t('screening.gender')}
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
            <option value="">{t('screening.selectGender')}</option>
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
            {t('screening.socialMediaFreq')} <span style={{ color: '#c33' }}>*</span>
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
            <option value="">{t('screening.selectFrequency')}</option>
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
        {t('common.continue')}
      </button>
    </div>
  );
};

export default ScreeningScreen;
