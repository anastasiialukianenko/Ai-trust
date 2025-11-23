# Troubleshooting: Data Not Appearing in Google Sheets

## Issue: Wrong URL Format

Your `.env` file currently has a **library URL** instead of a **web app deployment URL**.

### Current (Wrong) URL Format:
```
https://script.google.com/macros/library/d/.../1
```

### Correct URL Format:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## How to Fix:

### Step 1: Deploy Your Script as Web App

1. Open your Google Sheet
2. Go to **Extensions** → **Apps Script**
3. Make sure your script code is saved
4. Click **Deploy** → **New deployment**
5. Click the gear icon ⚙️ next to "Select type"
6. Choose **Web app** (NOT "Library")
7. Configure:
   - **Description**: "Experiment Data Collector"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (for testing) or "Anyone with Google account"
8. Click **Deploy**
9. **Copy the Web App URL** - it should look like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

### Step 2: Update Your .env File

Replace the URL in your `.env` file with the Web App URL you just copied:

```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### Step 3: Restart Your Dev Server

```bash
# Stop your current server (Ctrl+C)
npm run dev
```

### Step 4: Test Again

1. Complete the experiment flow
2. Check the browser console for logs (F12 → Console)
3. Check your Google Sheet for new data
4. Check Apps Script execution log: **View** → **Executions**

## Additional Debugging Steps:

### Check Browser Console
Open browser DevTools (F12) and look for:
- ✅ "Data submitted successfully" message
- ❌ Any error messages
- 📊 The data being sent

### Check Apps Script Execution Log
1. In Apps Script editor: **View** → **Executions**
2. Look for recent executions
3. Click on an execution to see details/errors

### Verify Script Code
Make sure your Apps Script has the `doPost` function and is writing to the correct sheet tab name.

### Test the Web App URL Directly
Try accessing the URL in your browser - you should see a JSON response (even if it's an error, it confirms the deployment works).

