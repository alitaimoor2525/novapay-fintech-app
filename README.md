# 💳 NovaPay — FinTech Mobile Application

> A production-grade, full-stack mobile payment platform built with 
> React Native, Node.js, SQLite, and Google Gemini AI.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=flat&logo=sqlite&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)

---

## 📱 What is NovaPay?

NovaPay is a full-featured mobile banking and payment application 
built for Pakistani users. It combines real-time money transfers, 
AI-powered financial assistance, Islamic finance tools, and a 
complete admin ecosystem — all in one app.

---

## ✨ Core Features

### 💸 Payments & Transfers
- Peer-to-peer money transfers with instant confirmation
- QR Code payments — scan camera to auto-fill recipient details
- JazzCash gateway integration via Python FastAPI
- Scheduled & recurring payments
- Request money from contacts

### 🤖 Nova AI Assistant
- Powered by Google Gemini API
- Answers financial queries in real-time
- Suggests budgeting tips and spending insights
- Accessible from any screen via floating button

### 🕌 Islamic Finance Tools
- **Zakat Calculator** with 6 asset categories
  (Cash, Gold, Silver, Stocks, Receivables, Business Inventory)
- Live gold & silver price fetching (PKR per gram)
- Automatic Nisab threshold detection (85g gold / 595g silver)
- Calculates net zakatable assets after liabilities

### 📊 Budget Manager
- Set spending limits across 6 custom categories
- Real-time progress bars per category
- Overspend alerts and monthly reset

### 🔐 Security
- JWT-based user authentication
- Biometric login (fingerprint / face ID via Expo)
- Configurable backend IP for demo/testing environments

### 👨‍💼 Admin Dashboard
- Global transaction ledger
- All user accounts overview
- Platform-wide financial stats and monitoring

### 🎨 UI/UX
- Full dark / light theme toggle
- Urdu / English language switch
- Skeleton loading animations
- Animated transitions throughout

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Mobile Frontend | React Native (Expo) |
| Backend Server | Node.js + SQLite |
| AI Gateway | Python FastAPI |
| AI Model | Google Gemini API |
| Authentication | JWT + Expo Biometrics |
| Payment Gateway | JazzCash (FastAPI simulation) |
| PDF Export | expo-print + expo-sharing |
| Camera | expo-camera (QR scanning) |

---

## 📂 Project Structure

```
NovaPayApp/
├── backend/
│   └── server.js          # Node.js backend + SQLite DB
├── jazzcash-gateway/
│   ├── main.py            # FastAPI JazzCash gateway
│   └── requirements.txt
├── src/
│   ├── screens/           # 18+ app screens
│   ├── components/        # Reusable UI components
│   ├── services/          # API service layer
│   └── constants/         # App-wide constants & data
├── HOW_TO_RUN.md
└── package.json
```

---

## 🚀 How to Run

### Prerequisites
- Node.js installed
- Python 3.9+ installed
- Expo Go app on your phone

### Step 1 — Start Backend
```bash
cd NovaPayApp
node backend/server.js
```
Wait for: `NovaPay Backend running at http://<your-ip>:3000`

### Step 2 — Start JazzCash Gateway
```bash
cd jazzcash-gateway
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Step 3 — Start Mobile App
```bash
npx expo start
```
Scan the QR code with **Expo Go** app on your phone.

> ⚠️ Your phone and laptop must be on the **same Wi-Fi network**

---

## 📱 App Screens (18+)

| Screen | Description |
|--------|-------------|
| Home | Balance, quick actions, recent transactions |
| Transfer | Send money to contacts |
| QR Pay | Scan QR to pay instantly |
| Zakat Calculator | Islamic finance tool with live prices |
| Budget Manager | Spending limits per category |
| Scheduled Payments | Recurring & future payments |
| Request Money | Send payment requests |
| Transaction History | Full logs with PDF export |
| Rewards | Points & cashback system |
| Admin Dashboard | Platform monitoring |
| Nova AI Chat | Gemini-powered assistant |
| Settings | Theme, language, security |

---

## 🎓 Project Info

**Type:** Semester Project  
**University:** The Superior University, Lahore  
**Program:** BS Computer Science (6th Semester)  
**Developer:** Ali Taimoor

---

## 📫 Contact

**LinkedIn:** linkedin.com/in/ali-taimoor-357427312  
**GitHub:** github.com/alitaimoor2525  
**Email:** taimoorali659@gmail.com
