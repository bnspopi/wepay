# API Specification

## Authentication
- `POST /auth/register` - Register user (Email/Password)
- `POST /auth/login` - Login user (Email/Password: demo123)
- `POST /auth/refresh` - Refresh access token
- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/me` - Get current user profile
- `POST /auth/phone/send-otp` - Send OTP for phone login
- `POST /auth/phone/verify-otp` - Verify OTP and login

## User Management
- `GET /users` - List all users
- `GET /users/profile` - Get current user profile
- `PATCH /users/profile` - Update profile data
- `POST /users/lock-savings` - Lock wallet funds for duration

## Transactions
- `GET /transactions` - List user transactions
- `POST /transactions` - Create new P2P transaction
- `POST /transactions/create-transaction` - Create transaction with senderId (public)
- `POST /transactions/sync` - Sync offline transactions

## Digital Wallet
- `GET /wallet/balance` - Get current wallet balance
- `POST /wallet/add-funds` - Add funds to wallet

## Welfare
- `GET /welfare/schemes` - List available welfare schemes
- `POST /welfare/check-eligibility` - Check eligibility for a scheme
- `GET /welfare/payments` - List user welfare payments

## AI & Voice
- `POST /ai/chat` - AI assistant for voice/text commands