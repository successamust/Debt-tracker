


# Debt Tracker Frontend

This is the frontend of the **Debt Tracker** app, built with [Vite](https://vitejs.dev/) and React. It connects to a Node.js/Express backend hosted on Render.

## Live Demo

Frontend: [https://your-vercel-url.vercel.app](https://debt-tracker-frontend.vercel.app)  

---

## Tech Stack

- React
- Vite
- Fetch API
- Deployed on Vercel

---

## Setup Instructions

1. **Clone the repo**
```bash
git clone https://github.com/successamust/debt-tracker-frontend.git
cd debt-tracker-frontend
````

2. **Install dependencies**

```bash
npm install
```

3. **Environment variables**

Create a `.env` file at the root:

```env
VITE_API_BASE=https://your-backend-url.onrender.com
```

4. **Run locally**

```bash
npm run dev
```

---

## 🌐 Deployment

This app is deployed on [Vercel](https://vercel.com).
To deploy your own version:

1. Push to a GitHub repo
2. Connect the repo to Vercel
3. Add the `VITE_API_BASE` environment variable in Vercel's dashboard

---


## Project Structure

```
src/
  App.jsx
  App.css
  ...
public/
  index.html
```

---

