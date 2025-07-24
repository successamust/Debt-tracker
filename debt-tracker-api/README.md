
---

# Debt Tracker API

[![Deploy on Render](https://img.shields.io/badge/Deployed%20on-Render-4d7fff?logo=render&logoColor=white)](https://debt-tracker-api-2ojf.onrender.com)

A simple and powerful API that reads debt records from a **Google Sheet** and exposes them via REST endpoints. Perfect for managing IOUs, shared expenses, and debt splits among friends or teams.

---

## Live Demo

🌐 [https://debt-tracker-0q53.onrender.com/all](https://debt-tracker-0q53.onrender.com/all)

---

## How It Works

This project fetches data from a **public Google Sheet**, where:

- **Rows** represent **debtors**
- **Columns** represent **creditors**
- **Cells** contain the amount owed

It transforms the sheet into structured debt records like:

```json
{
  "debtor": "Mojito",
  "creditor": "Ashley",
  "amount": 4.3
}
````

---

## API Endpoints

| Method | Route                        | Description                                       |
| ------ | ---------------------------- | ------------------------------------------------- |
| `GET`  | `/all`                       | Get all debt records                              |
| `GET`  | `/creditor/:name`            | Get all people who owe the given creditor         |
| `GET`  | `/debtor/:name`              | Get all creditors the given debtor owes           |
| `GET`  | `/total/creditor/:name`      | Get total amount owed to a creditor               |
| `GET`  | `/total/debtor/:name`        | Get total amount a debtor owes                    |
| `GET`  | `/debts?creditor=A&debtor=B` | Filter debts between specific debtor and creditor |

---

## Example

```bash
GET /creditor/Malik
```

Returns:

```json
[
  {
    "debtor": "Paul",
    "creditor": "Malik",
    "amount": 14.2
  },
  ...
]
```

---

## ⚙️ Setup Locally

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/Debt-tracker-api.git
cd Debt-tracker-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```bash
SPREADSHEET_ID=your_google_sheet_id_here
PORT=0000
```

### 4. Add your Google credentials

Place your Google service account key file at the project root and name it:

```bash
credentials.json
```

Make sure the service account has access to your sheet.

---

## 🌍 Deploying on Render

1. Push your code to GitHub
2. Create a new Web Service on [Render.com](https://render.com)
3. Set the environment variables in **"Environment"**
4. Add `credentials.json` under **"Secret Files"**
5. Deploy!

---

```

---

```
