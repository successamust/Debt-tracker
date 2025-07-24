import express from 'express';
import dotenv from 'dotenv';
import { getDebtData } from './googleSheetService.js';
import cors from 'cors';


dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
}));


// Get all debts where the given name is the creditor
app.get('/creditor/:name', async (req, res) => {
  const debts = await getDebtData();
  const name = req.params.name.toLowerCase();
  const result = debts.filter(d => d.creditor.toLowerCase() === name);
  res.json(result);
});

// Get all debts where the given name is the debtor
app.get('/debtor/:name', async (req, res) => {
  const debts = await getDebtData();
  const name = req.params.name.toLowerCase();
  const result = debts.filter(d => d.debtor.toLowerCase() === name);
  res.json(result);
});

// Get all debts in the sheet
app.get('/all', async (req, res) => {
  const debts = await getDebtData();
  res.json(debts);
});

// Get total summary for a person: amount owed and amount they're owed
app.get('/totalsummary/:name', async (req, res) => {
  const debts = await getDebtData();
  const name = req.params.name.toLowerCase();

  const totalOwedBy = debts
    .filter(d => d.debtor.toLowerCase() === name)
    .reduce((sum, entry) => sum + entry.amount, 0);

  const totalOwedTo = debts
    .filter(d => d.creditor.toLowerCase() === name)
    .reduce((sum, entry) => sum + entry.amount, 0);

  res.json({ name, totalOwedBy, totalOwedTo });
});

// Query debts using creditor and/or debtor as filters
app.get('/debts', async (req, res) => {
  const { creditor, debtor } = req.query;
  const debts = await getDebtData();

  const filtered = debts.filter(d => {
    const matchCreditor = creditor ? d.creditor.toLowerCase() === creditor.toLowerCase() : true;
    const matchDebtor = debtor ? d.debtor.toLowerCase() === debtor.toLowerCase() : true;
    return matchCreditor && matchDebtor;
  });

  res.json(filtered);
});

// Start server on specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
