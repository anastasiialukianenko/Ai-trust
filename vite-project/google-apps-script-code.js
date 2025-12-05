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
    
    // Prepare the row data - matches ExperimentData structure
    const row = [
      // Basic info
      data.participantId || '',
      data.condition || '',
      data.startTime || '',
      data.startedAt || '',
      data.consentTime || '',
      data.stimulusViewTime || '',
      data.finishedAt || '',
      data.totalDurationMs || '',
      data.completionTime || '',
      
      // Demographics
      data.demographics?.age || '',
      data.demographics?.country || '',
      data.demographics?.gender || '',
      data.demographics?.education || '',
      
      // Controls - Social Media
      data.controls?.socialMediaFreq || '',
      
      // Trust - Cognitive (4 items)
      data.trust?.cog1 || '',
      data.trust?.cog2 || '',
      data.trust?.cog3 || '',
      data.trust?.cog4 || '',
      // Trust - Affective (4 items)
      data.trust?.aff1 || '',
      data.trust?.aff2 || '',
      data.trust?.aff3 || '',
      data.trust?.aff4 || '',
      
      // Purchase Intention (4 items)
      data.purchase?.pi1 || '',
      data.purchase?.pi2 || '',
      data.purchase?.pi3 || '',
      data.purchase?.pi4 || '',
      // Willingness to Pay (4 items)
      data.purchase?.wtp1 || '',
      data.purchase?.wtp2 || '',
      data.purchase?.wtp3 || '',
      data.purchase?.wtp4 || '',
      
      // Manipulation Checks
      data.manipulationChecks?.perceivedAuthor || '',
      data.manipulationChecks?.noticedDisclosure || '',
      
      // Controls - Attitude toward AI (3 items)
      data.controls?.attitudeAI1 || '',
      data.controls?.attitudeAI2 || '',
      data.controls?.attitudeAI3 || '',      
      // QC
      data.qc?.attentionCheckAnswer || '',
      data.qc?.attentionCheckPassed || '',
      data.qc?.stimulusExposureMs || '',
      
      // Timestamp
      new Date()
    ];

    // Check if headers exist, if not, add them
    if (sheet.getLastRow() === 0) {
      const headers = [
        // Basic info
        'participantId', 'condition', 'startTime', 'startedAt', 'consentTime', 
        'stimulusViewTime', 'finishedAt', 'totalDurationMs', 'completionTime',
        // Demographics
        'age', 'country', 'gender', 'education',
        // Controls - Social Media
        'socialMediaFreq',
        // Trust - Cognitive (4 items)
        'cog1', 'cog2', 'cog3', 'cog4',
        // Trust - Affective (4 items)
        'aff1', 'aff2', 'aff3', 'aff4',
        // Purchase Intention (4 items)
        'pi1', 'pi2', 'pi3', 'pi4',
        // Willingness to Pay (4 items)
        'wtp1', 'wtp2', 'wtp3', 'wtp4',
        // Manipulation Checks
        'perceivedAuthor', 'noticedDisclosure',
        // Controls - Attitude toward AI (3 items)
        'attitudeAI1', 'attitudeAI2', 'attitudeAI3',
        // QC
        'attentionCheckAnswer', 'attentionCheckPassed', 'stimulusExposureMs',
        // Timestamp
        'timestamp'
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

