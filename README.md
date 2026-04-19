# WePay – AI Powered Digital Wallet

WePay is a fintech-style digital wallet application built with React and Vite.
Designed for rural users in India to access government welfare schemes, send money, and manage their digital identity.

## Features
- 💰 Digital wallet with balance management
- 📜 Transaction history with fraud detection alerts
- 🏛️ Government welfare scheme browser
- ✅ Welfare eligibility checker (state-wise)
- 🌐 Multi-language support (English, Hindi, Bengali)
- 👤 Agent portal for field officers
- 🔒 Offline-ready architecture

## Tech Stack
- React 19 + Vite
- TypeScript
- Tailwind CSS v4
- React Router DOM v7

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm (`npm install -g pnpm`)

### Run Frontend
```bash
cd frontend
pnpm install
pnpm dev
```
Open → http://localhost:5000

### Demo Login
- **Email:** any email (e.g. `demo@wepay.com`)
- **Password:** `demo123`

---

## 📁 Project Structure

```
wepay/
├── frontend/
│   ├── src/
│   │   ├── pages/          # All page components
│   │   ├── components/     # Layout and shared components
│   │   ├── i18n/           # Language context + translations
│   │   ├── types/          # TypeScript interfaces
│   │   ├── data/           # Mock data
│   │   ├── context/        # React contexts (Location etc.)
│   │   ├── services/       # API service layer
│   │   ├── hooks/          # Custom hooks
│   │   └── store/          # In-memory store
│   ├── package.json
│   ├── vite.config.ts
│   └── .env                # Set VITE_USE_MOCK_DATA=true
└── README.md
```

---

## 🐛 Bugs Fixed

| # | File | Issue |
|---|------|-------|
| 1 | `src/pages/LoginPage.tsx` | Duplicate return statement + undefined variables |
| 2 | `src/i18n/languageContext.tsx` | Missing `useLanguage` hook export |
| 3 | `src/i18n/translations.ts` | File was missing entirely |
| 4 | `src/types/index.ts` | File was missing entirely |
| 5 | `src/i18n/useTranslation.ts` | Wrong import paths |
| 6 | `src/hooks/useTranslation.ts` | Duplicate conflicting implementation |
