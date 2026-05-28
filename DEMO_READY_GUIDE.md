# 🚀 NovaPay Demo Guide (For Presentation)

Welcome! This guide contains everything you need to set up and demonstrate the **NovaPay Fintech System** to your Sir/Examiner. Follow these steps exactly to ensure a smooth presentation.

---

## 🛠️ Step 1: Laptop Setup (Backend & Admin)

You must start the "brain" of the app on your laptop first.

### 1. Find your Laptop IP Address
The phone app needs to know your laptop's address. 
- Open **Command Prompt (CMD)**.
- Type `ipconfig` and press Enter.
- Look for **IPv4 Address** under "Wireless LAN adapter Wi-Fi".
- **Example:** `192.168.1.15` (Keep this number ready).

### 2. Start the Backend Server
- Open a CMD window in the project folder.
- Run:
  ```cmd
  node backend/server.js
  ```
- **Verification:** You should see `NovaPay Backend running at http://...:3000`.

### 3. Start the Admin Dashboard
- Open a **second** CMD window.
- Navigate to the admin folder:
  ```cmd
  cd admin-dashboard
  ```
- Run:
  ```cmd
  npm run dev
  ```
- **Access URL:** Open `http://localhost:5173` in your browser.
- **Admin Login:**
  - **Username:** `admin`
  - **Password:** `admin123`

---

## 📱 Step 2: Mobile App Setup (APK)

### 1. Connect to Wi-Fi
Make sure your **phone and laptop** are connected to the **exact same Wi-Fi network**.

### 2. Configure the App Connection
- Open the NovaPay app on your phone.
- On the Login Screen, look at the **top-right corner**. 
- Tap the **Gear/Settings icon** ⚙️.
- Type your **Laptop IP Address** (from Step 1.1) into the box.
- Tap **"Save & Update"**.

---

## 🎭 Step 3: Performing the Demo

Now you are ready to show the features!

### 👤 Demo Accounts
You can use these accounts to show how the app works:

| Feature | Details |
| :--- | :--- |
| **Demo User** | Username: `demo` / Password: `password123` |
| **Admin Panel** | View Users, Block/Unblock accounts, and see Audit Logs. |
| **Nova AI** | Open the Chat icon at the bottom for AI financial help. |
| **Biometrics** | Show the Fingerprint/Face scan during Sign-Up. |

### 💡 Pro Tips for a Great Presentation:
- **Show the Live Update:** Open the Admin Dashboard on your laptop and the app on your phone. Block a user in the Dashboard and show how the app immediately logs them out and says "Access Denied".
- **Show Nova AI:** Ask Nova AI "How can I save money?" to show off the Gemini AI integration.
- **Show Zakat:** Go to the "More" tab to show the Zakat Calculator.

---

## 🚨 Troubleshooting
- **"Network Error" on Phone?** Double-check that your IP address in the Gear menu matches your laptop's current IP exactly.
- **Dashboard looks empty?** Ensure the backend server (Step 1.2) is still running in the background.
- **AI not responding?** Check your internet connection and verify the `.env` file has a valid `GEMINI_API_KEY`.

---
**Good luck with your presentation! 🌟**
