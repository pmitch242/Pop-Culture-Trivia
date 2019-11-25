var easyMusicURL = "https://opentdb.com/api.php?amount=1&category=12&difficulty=easy&type=multiple"
var mediumMusicURL = "https://opentdb.com/api.php?amount=1&category=12&difficulty=medium&type=multiple"
var hardMusicURL = "https://opentdb.com/api.php?amount=1&category=12&difficulty=hard&type=multiple"

var easyCelebritiesURL = "https://opentdb.com/api.php?amount=1&category=26&difficulty=easy&type=multiple"
var mediumCelebritiesURL = "https://opentdb.com/api.php?amount=1&category=26&difficulty=medium&type=multiple"
var hardCelebritiesURL = "https://opentdb.com/api.php?amount=1&category=26&difficulty=hard&type=multiple"


function easyMusicClick(input) {
   $.ajax({
      url: input,
      method: "GET"
   }).then(
      function (response) {
         console.log(response);

         // creating html elements to hold content
         var questionDiv = $("<div>");
         var answerButton1 = $("<button>");
         var answerButton2 = $("<button>");
         var answerButton3 = $("<button>");
         var answerButton4 = $("<button>");

         // adding placeholder classes to the buttons
         answerButton1.attr("class", "btn btn-primary")
         answerButton2.attr("class", "btn btn-primary")
         answerButton3.attr("class", "btn btn-primary")
         answerButton4.attr("class", "btn btn-primary")

         // getting the question from the AJAX call
         var question = response.results[0].question;

         // creating an empty array variable for the incorrec answers
         var possibleAnswers = [];

         // storing the correct answer in a variable. going to use this variable later in a comparison to say 'if value of the button pressed by the user === correctAnswer, take this action, else, take this action
         var correctAnswer = response.results[0].correct_answer;

         // looping through the object to push the incorrect answers into an array
         for (var i = 0; i < response.results[0].incorrect_answers.length; i++) {
            possibleAnswers.push(response.results[0].incorrect_answers[i]);
         }
         // adding correct answer to the array
         possibleAnswers.push(correctAnswer)

         // randomize possible answers - got this from w3schools
         possibleAnswers.sort(function(a, b){return 0.5 - Math.random()});

         // adding values to my HTML elements
         questionDiv.text(question)
         answerButton1.text(possibleAnswers[0])
         answerButton2.text(possibleAnswers[1])
         answerButton3.text(possibleAnswers[2])
         answerButton4.text(possibleAnswers[3])

         console.log(question)
         console.log(possibleAnswers)

      }
   )
}

easyMusicClick(easyMusicURL);
easyMusicClick(mediumCelebritiesURL)

