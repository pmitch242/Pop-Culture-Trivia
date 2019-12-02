//creating empty variables
var category = "";
var difficulty = "";
var possiblePoints = 0;
var userScore = 0;
var gameTime = 9999;
var correctAnswer = "";

// creating empty array
var namePull = [];
var scorePull = [];
var datePull = [];

// selecting html elements
var startPageDiv = $("#start-page")
var timerSpan = $("#timerValue")
var userScoreDiv = $("#user-score-div")
var gameSectionDiv = $("#game-section")
var questionAnswerDiv = $("#question-answer-section")
var gameOverDiv = $("#game-over")
var userScoreFinalDiv = $("#user-score-final")
var questionDiv = $("#question-text")
var answerBtn1 = $("#answer-1")
var answerBtn2 = $("#answer-2")
var answerBtn3 = $("#answer-3")
var answerBtn4 = $("#answer-4")



function highScorePage() {
   // store localStorage into arrays

   nameDisplay = localStorage.getItem("name");
   scoreDisplay = localStorage.getItem("score");
   dateDisplay = localStorage.getItem("date");

   nameDisplay = JSON.parse(nameDisplay);
   scoreDisplay = JSON.parse(scoreDisplay);
   dateDisplay = JSON.parse(dateDisplay);

   if (nameDisplay != null) {
      for (var i = 0; i < nameDisplay.length; i++) {

         // =====Varibles=====
         var scoreTBody = $(".scores-tbody")
         var row = $("<tr>");
         var nameColumn = $("<td>");
         var scoreColumn = $("<td>");
         var dateColumn = $("<td>");

         nameColumn.text(nameDisplay[i]);
         row.append(nameColumn);

         scoreColumn.text(scoreDisplay[i]);
         row.append(scoreColumn);

         dateColumn.text(dateDisplay[i]);
         row.append(dateColumn);

         scoreTBody.append(row);

      }
   }
}

// starting Oage function
function startingPage() {

   // fading in the start screens, game section fading in just prior to the start page, using a timeout to create that effect
   gameSectionDiv.fadeIn(250);
   setTimeout(function() {startPageDiv.fadeIn(500)}, 150);

   // =====Variables=====
   var startButton = $("#start-button")

   startButton.click(function (element) {
      element.preventDefault();

      // =====Varibles=====
      var userName = $("#user-name").val();
      console.log(userName);

      // Prevents user from leaving input blank
      if (userName.trim() === "") {
         $("#myForm :input").prop("disabled", true);
         var notificationDiv = $("<div>");
         notificationDiv.attr("class", "notification");
         notificationDiv.text("Please enter a name, do not leave blank!");

         var exitButton = $("<button>");
         exitButton.attr("class", "delete");

         notificationDiv.append(exitButton);
         startPageDiv.append(notificationDiv);

         exitButton.click(function () {
            notificationDiv.css("display", "none");
            $("#myForm :input").prop("disabled", false);
         })
         // start game 
      } else {
         startPageDiv.fadeOut(250);

         //start timer 
         startTimer();

         // store user name in varible
         var nameHeader = $("#name-header");
         nameHeader.text("Good Luck " + userName + "!");

         // store user name in localStorage
         namePull = JSON.parse(localStorage.getItem("name") || "[]");
         namePull.push(userName);
         localStorage.setItem("name", JSON.stringify(namePull));
      }


   });

}

// setting intitial value of timerSpan to gameTime
timerSpan.text("Timer: " + gameTime)

function generateQuestion(event) {
   event.preventDefault();

   var thisButton = $(this);
   var thisButtonData = thisButton.attr("data-game");

   console.log(thisButton.attr("data-game"));

   // this switch statement determines the URL that we're going to use in the API
   switch (thisButtonData) {
      case "easy-music":
         category = "12";
         difficulty = "easy";
         possiblePoints = 100;
         break;
      case "medium-music":
         category = "12";
         difficulty = "medium";
         possiblePoints = 300;
         break;
      case "hard-music":
         category = "12";
         difficulty = "hard";
         possiblePoints = 500;
         break;
      case "easy-film":
         category = "11";
         difficulty = "easy";
         possiblePoints = 100;
         break;
      case "medium-film":
         category = "11";
         difficulty = "medium";
         possiblePoints = 300;
         break;
      case "hard-film":
         category = "11";
         difficulty = "hard";
         possiblePoints = 500;
         break;
      case "easy-celebs":
         category = "26";
         difficulty = "easy";
         possiblePoints = 100;
         break;
      case "medium-celebs":
         category = "26";
         difficulty = "medium";
         possiblePoints = 300;
         break;
      case "hard-celebs":
         category = "26";
         difficulty = "hard";
         possiblePoints = 500;
         break;
      case "easy-tv":
         category = "14";
         difficulty = "easy";
         possiblePoints = 100;
         break;
      case "medium-tv":
         category = "14";
         difficulty = "medium";
         possiblePoints = 300;
         break;
      case "hard-tv":
         category = "14";
         difficulty = "hard";
         possiblePoints = 500;
         break;
      case "easy-cartoon":
         category = "32";
         difficulty = "easy";
         possiblePoints = 100;
         break;
      case "medium-cartoon":
         category = "32";
         difficulty = "medium";
         possiblePoints = 300;
         break;
      case "hard-cartoon":
         category = "32";
         difficulty = "hard";
         possiblePoints = 500;
         break;
      case "easy-books":
         category = "10";
         difficulty = "easy";
         possiblePoints = 100;
         break;
      case "medium-books":
         category = "10";
         difficulty = "medium";
         possiblePoints = 300;
         break;
      default:
         category = "10";
         difficulty = "hard";
         possiblePoints = 500;
   }

   console.log(category);
   console.log(difficulty);

   // query URL for the AJAX call
   var queryURL = "https://opentdb.com/api.php?amount=1&category=" + category + "&difficulty=" + difficulty + "&type=multiple";

   console.log(queryURL);

   $.ajax({
      url: queryURL,
      method: "GET"
   }).then(
      function (response) {

         // getting the question from the AJAX call
         var question = response.results[0].question;

         // creating an empty array variable for the incorrec answers
         var possibleAnswers = [];

         // storing the correct answer in a variable. going to use this variable later in a comparison to say 'if value of the button pressed by the user === correctAnswer, take this action, else, take this action
         correctAnswer = response.results[0].correct_answer;
         console.log(correctAnswer)

         // looping through the object to push the incorrect answers into an array
         for (var i = 0; i < response.results[0].incorrect_answers.length; i++) {
            possibleAnswers.push(response.results[0].incorrect_answers[i]);
         }
         // adding correct answer to the array
         possibleAnswers.push(correctAnswer)

         // randomize possible answers - got this from w3schools
         possibleAnswers.sort(function (a, b) { return 0.5 - Math.random() });

         // adding values to HTML elements
         questionDiv.html(question)
         answerBtn1.html(possibleAnswers[0]);
         answerBtn2.html(possibleAnswers[1]);
         answerBtn3.html(possibleAnswers[2]);
         answerBtn4.html(possibleAnswers[3]);

         // fade out, fade in
         gameSectionDiv.fadeOut(150)
         setTimeout(function() {questionAnswerDiv.fadeIn(150)}, 150);

         // this is where we'll have to collect the user's choice of answer and compare that to the correctAnswer variable
         $(".answer-option").on("click", function (event) {
            event.preventDefault();

            var thisAnswer = $(this)
            if (thisAnswer.text() === correctAnswer) {
               userScore = userScore + possiblePoints;
               userScoreDiv.text(userScore)
            } else {
               userScore = userScore - possiblePoints;
               userScoreDiv.text(userScore)
            }

            thisButton.css("display", "none");
            questionAnswerDiv.fadeOut(150);
            setTimeout(function() { gameSectionDiv.fadeIn(150)}, 150);
            possiblePoints = 0;
         })
      }
   )
}
function startTimer() {
   $(".game-category").on("click", generateQuestion);
   var timerInterval = setInterval(function () {
      gameTime--;
      timerSpan.text("Timer: " + gameTime);

      // this is where we set the end of the game
      if (gameTime === 0) {
         clearInterval(timerInterval)

         userScoreFinalDiv.text("Your score: " + userScore)

         // store user score in localStorage
         scorePull = JSON.parse(localStorage.getItem("score") || "[]");
         scorePull.push(userScore);
         localStorage.setItem("score", JSON.stringify(scorePull));

         // store date and time in localStorage
         var currentDate = moment().format('L LT');
         datePull = JSON.parse(localStorage.getItem("date") || "[]");
         datePull.push(currentDate);
         localStorage.setItem("date", JSON.stringify(datePull));

         // fading out, fading in sections
         gameSectionDiv.fadeOut(250);
         questionAnswerDiv.fadeOut(250);
         setTimeout(function() {gameOverDiv.fadeIn(250)}, 250);

         // =====Varibles=====
         var winGiphyURL = "https://api.giphy.com/v1/gifs/search?api_key=u9OvLuwupZYRbeoXLfTbguCAA1Z6E3Lk&q=win&limit=25&offset=0&rating=PG-13&lang=en";
         var loseGiphyURL = "https://api.giphy.com/v1/gifs/search?api_key=u9OvLuwupZYRbeoXLfTbguCAA1Z6E3Lk&q=lose&limit=25&offset=0&rating=PG-13&lang=en";

         if (userScore > 0) {
            // Giphy Ajax call
            $.ajax({
               url: winGiphyURL,
               method: "GET"
            }).then(function (giphyData) {
               console.log(giphyData);

               // create elements to append giphy to
               var giphyDiv = $("#giphy-div");
               var giphy = $("<img>");
               // pick a giphy at random from the giphyData array
               giphy.attr("src", giphyData.data[Math.floor(Math.random() * 25)].images.fixed_height.url);
               giphyDiv.append(giphy);

            });
         }

         else {
            // Giphy Ajax call
            $.ajax({
               url: loseGiphyURL,
               method: "GET"
            }).then(function (giphyData) {
               console.log(giphyData);

               // create elements to append giphy to
               var giphyDiv = $("#giphy-div");
               var giphy = $("<img>");
               // pick a giphy at random from the giphyData array
               giphy.attr("src", giphyData.data[Math.floor(Math.random() * 25)].images.fixed_height.url);
               giphyDiv.append(giphy);
            });
         }
      }

   }, 1000)
}

// function timerStart() {
//    timerInterval;
// }

// highscore page
highScorePage();

// start game 
startingPage();

console.log(timerSpan);

// $(".game-category").on("click", generateQuestion);
// $("#start-button").on("click", startTimer);

// ajaxCall(easyMusicURL);
// ajaxCall(mediumCelebritiesURL)

// you get the jeoporday-style
// you get 18 choices - 6 categories and 3 different questions (100, 300, 500) for each category
// user presses 'start game'
// a 60-second timer starts
// you can answer as many questions as possible in the time
// if you get an answer right, you get the points for the category
// if youy get the answer wrong, you lose the points for the category
// game ends when 60 seconds is over OR if user answers all the questions
// then you get a 'here's your score' screen
// Score is at the top

// we need a funciton to start the game that will be triggered by an on-click event - colin, done
// we need to write function that takes in the user's selection for an answer and compares it to the correct answer - phill, done
// we need a timer that counts down for 60 seconds (can change that depending on gameplay) - colin, done
// we need a user score that increases and decreases depending on the user's response -phill, done
// a way to determine how many points each question is worth - if this.attr("data-game", "easy-music") set a variable possiblePoints = 1, etc., etc., lots of if else - colin, done
// develop the giphy ajax - phill, done
// Store highscores - phill, done


