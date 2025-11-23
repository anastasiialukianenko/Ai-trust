import type { ExperimentData } from '../types/experiment';

/**
 * Configuration for Google Apps Script endpoint
 * Replace with your actual Google Apps Script web app URL
 */
const GOOGLE_APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || '';

/**
 * Posts experiment data to Google Apps Script endpoint
 * @param data Experiment data to submit
 * @returns Promise that resolves when data is submitted
 */
export async function submitExperimentData(data: ExperimentData): Promise<void> {
  if (!GOOGLE_APPS_SCRIPT_URL) {
    console.error('❌ Google Apps Script URL not configured');
    console.log('📊 Data that would be submitted:', JSON.stringify(data, null, 2));
    throw new Error('Google Apps Script URL not configured');
  }

  console.log('📤 Submitting data to:', GOOGLE_APPS_SCRIPT_URL);
  console.log('📊 Data being submitted:', JSON.stringify(data, null, 2));

  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Note: With no-cors mode, we can't read the response
    // But the data should still be sent
    console.log('✅ Data submitted (no-cors mode - cannot verify response)');
    console.log('💡 Check your Google Sheet and Apps Script execution log for confirmation');
  } catch (error) {
    console.error('❌ Error submitting data:', error);
    console.error('📊 Failed data:', JSON.stringify(data, null, 2));
    throw error;
  }
}
