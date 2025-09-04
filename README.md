# 📊 Automated Quiz Scoring System

This project automates the transfer of quiz scores from multiple Google Form–linked spreadsheets into a central grade sheet using **Google Apps Script**.  
It was designed to reduce manual work for educators and ensure that student grades stay up-to-date automatically.

---

## ✨ Features
- ✅ Fetches quiz responses from **multiple Google Sheets** linked to Google Forms  
- ✅ Maps **student IDs** across quiz response sheets and a central grade sheet  
- ✅ Runs weekly via a **time-driven trigger (every Monday)**  
- ✅ Gracefully handles incomplete or not-yet-started quizzes  
- ✅ Keeps the grade sheet updated with the **latest quiz scores**

---

## 🛠 Tech Stack
- **Google Apps Script** (JavaScript-based scripting for Google Workspace)  
- **Google Sheets API**  
- **Google Forms (linked response sheets)**  

---

## 🚀 How It Works
1. Each quiz is linked to its own Google Form response sheet.  
2. The script:
   - Extracts quiz scores and student IDs  
   - Matches them with the central grade sheet IDs  
   - Updates the correct quiz column with the latest scores  
3. A time-based trigger ensures the script runs **every Monday** without manual execution.  

---

## 📂 Project Structure
