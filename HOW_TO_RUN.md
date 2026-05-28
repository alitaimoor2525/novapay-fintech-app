# 🚀 How to Run NovaPay Locally (using Windows Command Prompt)

To get the NovaPay application working on your phone, you must start **both** the backend database server and the Expo app UI at the same time. 

Follow these steps exactly every time you want to code or test the app.

---

## 🛠️ Step 1: Start the Backend Server (The Brain)
Your server manages the SQLite database, User Authentication, and the Nova AI structure.

1. Click the Windows **Start** button, type `cmd`, and press Enter to open **Command Prompt**.
2. Navigate to your project folder by pasting this:
   ```cmd
   cd /d D:\FinTech\NovaPayApp
   ```
3. Start the node server:
   ```cmd
   node backend/server.js
   ```
4. Wait until you see: **`NovaPay Backend running at http://192.168.100.111:3000`**
5. **CRITICAL:** Do NOT close this black window. Leave it running in the background.

---

## 📱 Step 2: Start the Expo Mobile App (The Screens)
We need a brand new window so we don't accidentally close the server.

1. Click the Windows **Start** button again, type `cmd`, and open a **second** Command Prompt window.
2. Navigate to the project folder just like before:
   ```cmd
   cd /d D:\FinTech\NovaPayApp
   ```
3. Start the Expo compiler:
   ```cmd
   npx expo start
   ```
4. A large, square **QR Code** will eventually appear in this window.

---

## 🔗 Step 3: Connect Your Phone

1. Make sure your actual phone is connected to the **exact same Wi-Fi network** as your laptop.
2. Download the **Expo Go** app from the iOS App Store or Google Play Store.
3. Open the **Camera** app on your phone and point it at the QR code on your computer screen.
4. Tap the yellow banner link that drops down in your camera. The app will begin downloading and launch natively on your phone!

---

---

## 🎁 Bonus: Sharing with a Friend (Demo Mode)

If you are sending this project to a friend to show to a "Sir", they can run it on their own laptop and phone easily:

1. **Send the Project & APK**: Send them the project folder (zipped) and the APK file.
2. **Setup Laptop**: 
   - They must install Node.js.
   - They run `node backend/server.js` in a terminal.
   - They find their laptop IP (run `ipconfig` in CMD, look for IPv4).
3. **Setup Phone**:
   - They install the APK on their Android phone.
   - Ensure the phone and laptop are on the **exact same Wi-Fi**.
4. **Connect App to Laptop**:
   - Open the NovaPay app on the phone.
   - On the Login Screen, tap the **Gear/Settings icon** (top-right).
   - Type their **Laptop IP Address** and tap "Save & Update".
   - The app is now connected to their backend!

---

### 🚨 Common Troubleshooting

* **Terminal is stuck with `>>` arrows?**
  You accidentally pressed Enter too early in PowerShell or pasted something weird. Always press **`Ctrl + C`** to cancel and try typing the command normally.
* **App says "Network Error" when logging in?**
  1. Check if the backend terminal is running.
  2. Tap the Gear icon on the login screen and ensure the IP matches your laptop's current IP exactly.
* **Nova AI isn't replying?**
  Ensure your `GEMINI_API_KEY` is completely correct inside your `.env` file, and restart the backend server so it reads the file again.
