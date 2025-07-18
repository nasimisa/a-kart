# A-Kart Customer Management App

A React + TypeScript application for managing A-Kart digital card customers, cards, transactions, and audit logs.

## 🛠 Tech Stack

- React + TypeScript
- Chakra UI
- React Router
- Formik + Yup
- TanStack Query
- JSON Server

## 🚀 Features

- Add, view, and manage customers and their debit cards
- Generate new 16-digit card numbers (masked cards)
- Delete cards with removal reason
- View and search transactions
- Add, View and search audit logs of all key actions (Create customer, Add/Remove card for customer)
- Responsiveness of app for all devices + Empty states and Loaders for pages
- Fully mocked backend using `json-server`

## 📦 Setup

1. **Install dependencies**

```bash
npm install
```

2. **Start JSON server**

```bash
npm run server
```

3. **Start the React app**

```bash
npm start
```

## 📜 Project structure

```bash
  src/
    api/                        # Axios set up + API requests as hooks + models
    components/                 # Reusable UI components
    modules/                    # Reusable domain-based components
    pages/                      # Pages by route + 404 page
    router/                     # React router set up
    utils/                      # Helpers (format date etc.)
    App.tsx
    index.tsx
```

## 📁 Data Files

JSON Server reads db.json which contains:

```bash
/customers
/transactions
/auditLogs
```

## 🔐 Notes

- All data is stored in memory (via JSON Server)
- No backend or database required
