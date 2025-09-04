function updateQuizScores() {

  function fetchsheetid(url){ // Function to extract id from the spreadsheet url
    var pattern = /\/d\/([a-zA-Z0-9-_]+)/;
    var match = url.match(pattern);
    if(match) {
      var id = match[1]; 
      return id;
    }
  }

  function fetchQuizNum(name) { // function to extract the num of quiz to find the column on which the score is to be updates 
    if (!name) return null;   // handle empty input
    
    var match = name.match(/Quiz\s*(\d+)/i);
    if (match) {
      return parseInt(match[1], 10);  // return as number
    }
    else{
      return 13;
    }
  }

  var urls = [] 

  for (var k = 0; k < urls.length; k++){ 
    var id = fetchsheetid(urls[k]); // id fetch 
    Logger.log(id);

    var quizSS = SpreadsheetApp.openById(id);
    var quizSheet = quizSS.getSheetByName("Form Responses 1");
    var name = quizSS.getName();
    Logger.log(name);
    var quiznum = fetchQuizNum(name)
    Logger.log(quiznum); // fetch the quiznum

  // these values are based on your sheets 
    var scorecol = 3 // Score on the response sheet 
    var idcol = 6 // Column E (Unique id of student in response sheet)
    var quizcol = quiznum + 3 // Column in the grade sheet where the score is to be updated 
    var gradeid = 2 // Column B (Unique id of student in grade sheet)


    // Student IDs from Grade Sheet (Column B)
    var gradeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    var gradeLastRow = gradeSheet.getLastRow();
    var gradeData = gradeSheet.getRange(2, gradeid, gradeLastRow - 1, 1).getValues(); 

    // Open Quiz Response Sheet
    var quizLastRow = quizSheet.getLastRow();
    // Only proceed if there are actual data rows
    if (quizLastRow <= 1) {
      Logger.log("No quiz data found");
      return;
    }

    var quizScores = quizSheet.getRange(2, scorecol, quizLastRow - 1, 1).getValues(); 
    var quizIds = quizSheet.getRange(2, idcol, quizLastRow - 1, 1).getValues();   
    Logger.log(quizScores);
    Logger.log(quizIds);

    // Build a map of ID -> Score
    var quizMap = {};
    Logger.log("Building quiz map from " + quizScores.length + " rows:");
    
    for (var i = 0; i < quizScores.length; i++) {
      var qScore = quizScores[i][0];  // Score from Column C
      var qId = quizIds[i][0];        // ID from Column F

      Logger.log("Row " + (i+2) + " - Score: " + qScore + ", ID: '" + qId + "'");

      // Only store if ID is a valid number
      if (qId !== null && qId !== undefined && qId !== '') {
        var isValidId = !isNaN(qId) && !isNaN(parseFloat(qId));
        if (isValidId) {
          quizMap[qId] = qScore;
          Logger.log("  Added ID mapping: " + qId + " -> " + qScore);
        } else {
          Logger.log("  Skipped invalid ID (not a number): '" + qId + "'");
        }
      }
    }
    
    Logger.log("Final quiz map: " + JSON.stringify(quizMap));
    Logger.log(gradeData)

    // Prepare updates
    var updates = [];
    var matchCount = 0;
    Logger.log("Processing grade sheet data:");
    
    for (var j = 0; j < gradeData.length; j++) {
      var gId = gradeData[j][0];  // Student ID from Grade Sheet

      Logger.log("Student " + (j+1) + " - Grade ID: '" + gId + "'");

      var score = null;
      
      // Try to match by ID (only if both IDs are valid numbers)
      var gradeIdIsValid = !isNaN(gId) && !isNaN(parseFloat(gId)) && gId !== null && gId !== undefined && gId !== '';
      if (gradeIdIsValid && quizMap[gId] !== undefined) {
        score = quizMap[gId];
        matchCount++;
        Logger.log("  MATCH FOUND: Score = " + score);
      } else {
        Logger.log("  NO MATCH FOUND - keeping existing value");
        // If no match found, keep the existing value
        score = gradeSheet.getRange(j + 2, quizcol).getValue();
      }

      updates.push([score]);
    }

    // Write to Grade Sheet column G (column 7)
    if (updates.length > 0) {
      gradeSheet.getRange(2, quizcol, updates.length, 1).setValues(updates);
      Logger.log("Updated " + updates.length + " rows, " + matchCount + " matches found");
    }
    /*
    */
  }
}
