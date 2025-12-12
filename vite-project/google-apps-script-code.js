/**
 * Google Apps Script to receive experiment data and write to Google Sheets
 * 
 * Instructions:
 * 1. Open your Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Delete any default code
 * 4. Paste this code
 * 5. Update SHEET_NAME if your sheet tab has a different name
 * 6. Save the script
 * 7. Deploy → New deployment → Web app
 * 8. Execute as: "Me"
 * 9. Who has access: "Anyone"
 * 10. Deploy and copy the Web App URL
 */

// Update this to match your sheet tab name (default is usually "Sheet1")
const SHEET_NAME = 'Sheet1';

/**
 * Handle POST requests from the experiment app
 * This is called when your app sends data via fetch()
 */
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Sheet not found: ' + SHEET_NAME
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Parse the JSON data from the POST request
    const data = JSON.parse(e.postData.contents);
    
    // Prepare the row data - matches required backend structure
    const row = [
      // Required fields in specific order
      data.participantId || '',
      data.conditionString || (data.condition === 1 ? 'Human' : data.condition === 2 ? 'AI_noDisc' : data.condition === 3 ? 'AI_Disc' : ''),
      data.Ad_AI_noDisc !== undefined ? data.Ad_AI_noDisc : (data.condition === 2 ? 1 : 0),
      data.Ad_AI_Disc !== undefined ? data.Ad_AI_Disc : (data.condition === 3 ? 1 : 0),
      data.exposure_time_ms !== undefined ? data.exposure_time_ms : (data.qc?.stimulusExposureMs || 0),
      data.completion_time_ms !== undefined ? data.completion_time_ms : (data.totalDurationMs || 0),
      data.device_type || '',
      
      // Manipulation checks (computed)
      data.mc_ai_recognition !== undefined ? data.mc_ai_recognition : (data.manipulationChecks?.perceivedAuthor === 'ai' ? 1 : 0),
      data.mc_disclosure_recognition !== undefined ? data.mc_disclosure_recognition : (data.manipulationChecks?.noticedDisclosure === 'yes' ? 1 : 0),
      
      // Attention check (computed)
      data.attention_check !== undefined ? data.attention_check : (data.qc?.attentionCheckPassed === true ? 1 : 0),
      
      // Cognitive Trust (CT1-CT4)
      data.CT1 !== undefined ? data.CT1 : (data.trust?.cog1 || 0),
      data.CT2 !== undefined ? data.CT2 : (data.trust?.cog2 || 0),
      data.CT3 !== undefined ? data.CT3 : (data.trust?.cog3 || 0),
      data.CT4 !== undefined ? data.CT4 : (data.trust?.cog4 || 0),
      
      // Affective Trust (ET1-ET4)
      data.ET1 !== undefined ? data.ET1 : (data.trust?.aff1 || 0),
      data.ET2 !== undefined ? data.ET2 : (data.trust?.aff2 || 0),
      data.ET3 !== undefined ? data.ET3 : (data.trust?.aff3 || 0),
      data.ET4 !== undefined ? data.ET4 : (data.trust?.aff4 || 0),
      
      // Purchase Intention (PI1-PI3)
      data.PI1 !== undefined ? data.PI1 : (data.purchase?.pi1 || 0),
      data.PI2 !== undefined ? data.PI2 : (data.purchase?.pi2 || 0),
      data.PI3 !== undefined ? data.PI3 : (data.purchase?.pi3 || 0),
      
      // Willingness to Pay (WTP1-WTP3, WTP_max)
      data.WTP1 !== undefined ? data.WTP1 : (data.purchase?.wtp1 || 0),
      data.WTP2 !== undefined ? data.WTP2 : (data.purchase?.wtp2 || 0),
      data.WTP3 !== undefined ? data.WTP3 : (data.purchase?.wtp3 || 0),
      data.WTP_max !== undefined ? data.WTP_max : (data.purchase?.wtp4 || 0),
      
      // Demographics
      data.age !== undefined ? data.age : (data.demographics?.age || ''),
      data.gender !== undefined ? data.gender : (data.demographics?.gender || ''),
      data.country !== undefined ? data.country : (data.demographics?.country || ''),
      
      // Controls
      data.social_media_frequency !== undefined ? data.social_media_frequency : (data.controls?.socialMediaFreq || ''),
      
      // Attitude toward AI
      data.attitudeAI1 !== undefined ? data.attitudeAI1 : (data.controls?.attitudeAI1 || 0),
      data.attitudeAI2 !== undefined ? data.attitudeAI2 : (data.controls?.attitudeAI2 || 0),
      data.attitudeAI3 !== undefined ? data.attitudeAI3 : (data.controls?.attitudeAI3 || 0),
    ];

    // Check if headers exist, if not, add them
    if (sheet.getLastRow() === 0) {
      const headers = [
        // Required fields in specific order
        'participant_id', 'condition', 'Ad_AI_noDisc', 'Ad_AI_Disc', 'exposure_time_ms', 
        'completion_time_ms', 'device_type',
        // Manipulation checks
        'mc_ai_recognition', 'mc_disclosure_recognition',
        // Attention check
        'attention_check',
        // Cognitive Trust
        'CT1', 'CT2', 'CT3', 'CT4',
        // Affective Trust
        'ET1', 'ET2', 'ET3', 'ET4',
        // Purchase Intention
        'PI1', 'PI2', 'PI3',
        // Willingness to Pay
        'WTP1', 'WTP2', 'WTP3', 'WTP_max',
        // Demographics
        'age', 'gender', 'country',
        // Controls
        'social_media_frequency',
        // Attitude toward AI
        'attitudeAI1', 'attitudeAI2', 'attitudeAI3'
      ];
      sheet.appendRow(headers);
    }

    // Append the data row
    sheet.appendRow(row);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log error and return error response
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: Handle GET requests (for testing)
 * This is called when you open the URL in a browser
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    message: 'This endpoint accepts POST requests only',
    instructions: 'Send POST requests with JSON data from your experiment app'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function - you can run this manually to test the script
 */
function testDoPost() {
  const testData = {
    participantId: 'TEST-123',
    condition: 1,
    startTime: Date.now(),
    demographics: {
      age: 'genZ',
      country: 'USA',
      gender: 'male'
    },
    controls: {
      socialMediaFreq: 'daily'
    }
  };

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

