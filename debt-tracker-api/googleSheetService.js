import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

// Get absolute path to credentials.json dynamically
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const credentialsPath = path.join(__dirname, 'credentials.json');

// Initialize Google Sheets API auth with service account credentials
const auth = new google.auth.GoogleAuth({
  keyFile: credentialsPath,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

export async function getDebtData() {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'Sheet1',
  });

  const rows = res.data.values;
  if (!rows || rows.length < 2) return [];

  const data = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const debtor = row[0];

    for (let j = 1; j < row.length; j++) {
      const amount = parseFloat(row[j]);

      if (!isNaN(amount) && amount > 0) {
        const creditor = rows[0][j];
        data.push({ debtor, creditor, amount });
      }
    }
  }

  return data;
}
