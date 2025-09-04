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

automated-quiz-scoring/
 ├── Code.gs     # Main Google Apps Script source code
 └── README.md   # Project documentation

# Quiz Score Updater (Google Apps Script)

This project automates the process of updating student quiz scores from multiple Google Form response sheets into a central grade sheet.  
It ensures that student grades stay up to date without manual copy-pasting.

---

## 🚀 Setup Instructions

### 1. Prepare Your Grade Sheet
- Create a **Google Sheet** for student grades.
- First column: **Student ID** (must be numeric only — no alphabets, no spaces).
- Other columns: **Quiz 1, Quiz 2, ...** where scores will be stored.

Example:

| Student ID | Quiz 1 | Quiz 2 | Quiz 3 |
|------------|--------|--------|--------|
| 101        | 8      | 9      |        |
| 102        | 7      |        | 10     |

---

### 2. Collect Quiz Response Sheets
- Each quiz is linked to a **Google Form**.
- When students attempt the quiz, a **response sheet** is automatically created.
- Ensure each response sheet has:
  - A column with **Student ID** (numeric, no spaces).
  - A column with **Score**.

---

### 3. Add the Script
1. Open your **Grade Sheet**.
2. Go to **Extensions → Apps Script**.
3. Paste the script from this repository (`Code.gs`).
4. Save the script.

---

### 4. Configure Quiz List
- Inside the script, update the `quizList` array with your quiz sheet URLs and names.
- You have just check which column is of which quiz, for eg. quiz 2 has column C( 3) accordingly change it in the code ( gradecol = quiznum +1)

Example:
   var quizSheets = [
       "https://docs.google.com/spreadsheets/d/1234567890/edit",
       "https://docs.google.com/spreadsheets/d/2345678901/edit",
       "https://docs.google.com/spreadsheets/d/3456789012/edit"
   ];

## ⚠️ Errors & Fixes

### 1. `No item with the given ID could be found`
- **Cause:** Script is trying to open a Google Form using `FormApp.openByUrl()`, but you don’t have editor access to the Form.  
- **Fix:** Remove the `FormApp` check for accepting responses, or get editor access to the Form.  

---

### 2. `Missing Permissions`
- **Cause:** First time running the script — it needs access to Google Sheets and Forms.  
- **Fix:** Run the script manually (`Run → updateQuizScores`) and grant permissions.  

---

### 3. Quiz response sheet not updating
- **Cause:** The quiz might still be collecting responses, or has no responses yet.  
- **Fix:** If there are no responses, the script will skip it. Once responses exist, they will sync in the next run.  

---

### 4. Wrong scores in grade sheet
- **Cause:** Student IDs don’t match between quiz response sheet and grade sheet. IDs must be **numeric only (no alphabets, no spaces)**.  
- **Fix:** Clean the student ID column in both sheets so they match exactly.  

