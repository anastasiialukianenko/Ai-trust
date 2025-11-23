# Google Sheets Integration Setup Guide

This guide will help you connect your experiment app to Google Sheets for data collection.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "AI Trust Experiment Data"
4. In the first row, add these column headers (or use the script to auto-generate them):

```
participantId | condition | startTime | startedAt | consentTime | stimulusViewTime | finishedAt | totalDurationMs | 
age | country | gender | 
socialMediaFreq | 
cog1 | cog2 | cog3 | aff1 | aff2 | aff3 | 
pi1 | pi2 | pi3 | pi4 | wtp | 
perceivedAuthor | noticedDisclosure | 
attitudeAI1 | attitudeAI2 | attitudeAI3 | willingnessToPay | 
attentionCheckAnswer | attentionCheckPassed | stimulusExposureMs
```

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any default code
3. Copy and paste the code from `google-apps-script.js` (see below)
4. Update the `SHEET_NAME` variable if your sheet tab has a different name
5. Click **Save** (💾 icon) and give your project a name

## Step 3: Deploy as Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Configure:
   - **Description**: "Experiment Data Collector"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (or "Anyone with Google account" if you want some security)
4. Click **Deploy**
5. **Copy the Web App URL** - you'll need this for your `.env` file
6. Click **Authorize access** and grant permissions when prompted

## Step 4: Configure Your Project

1. Create a `.env` file in the root of your project (same level as `package.json`)
2. Add your Google Apps Script URL:

```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

3. Restart your dev server (`npm run dev`)

## Step 5: Test the Connection

1. Run your app locally
2. Complete the experiment flow
3. Check your Google Sheet - you should see a new row with the data

## Troubleshooting

- **CORS errors**: Make sure you're using `mode: 'no-cors'` (already set in api.ts)
- **Permission denied**: Re-authorize the script in Apps Script → Deploy → Manage deployments
- **Data not appearing**: Check the Apps Script execution log (View → Executions)
- **URL not working**: Make sure you copied the full Web App URL, not the Editor URL

## Security Note

For production, consider:
- Restricting access to "Anyone with Google account"
- Adding validation in the Apps Script
- Using a more secure backend for production deployments

