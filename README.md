# Explain This Message

A simple web app where users can paste an SMS/WhatsApp message and get:
- a plain-language explanation
- scam detection insights
- a risk level (`low`, `medium`, `high`)

## Tech stack
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **AI:** OpenAI API

## Project structure

```text
explain-message-app/
├── backend/
│   ├── src/
│   │   └── index.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Setup

### 1) Install dependencies

```bash
npm install --prefix backend
npm install --prefix frontend
```

### 2) Configure environment variables

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Set your real OpenAI API key in `backend/.env`:

```bash
OPENAI_API_KEY=your_real_key
```

### 3) Run the backend

```bash
npm run dev --prefix backend
```

Backend runs at `http://localhost:4000`.

### 4) Run the frontend

In a second terminal:

```bash
npm run dev --prefix frontend
```

Frontend runs at `http://localhost:5173`.

## API endpoint

### `POST /api/explain`
Request body:

```json
{
  "message": "Your bank account has been suspended. Click this link..."
}
```

Response shape:

```json
{
  "explanation": "...",
  "riskLevel": "high",
  "reasons": ["..."],
  "safetyTips": ["..."]
}
```
