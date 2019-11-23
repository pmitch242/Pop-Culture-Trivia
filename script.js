console.log("hello")

var apiKey = "&apikey=1ad4ce9d"
var testURL = "http://www.omdbapi.com/?t=goonies&apikey=1ad4ce9d"


function getRandomQuestions() {
   $.ajax({
      url: testURL,

   })
}

function randomQuestion1() {
   // need to create 4 random ids for IMDB api
   // need to start with 'tt' and have 7 digit number after that start with '00' ... so really i need a 5 digit random number that starts 'tt00'
   var randomNumber = "";
   var movie1 = "tt0";
   var movie2 = "tt0";
   var movie3 = "tt0";
   var movie4 = "tt0";
   var moviesArray = [movie1, movie2, movie3, movie4]
   var movieIDArray = [];

   function generateRandomNumber() {
      var min = 098901;
      var max = 199999;

      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

      // if my random number is only five digits, I need to add a leading 0 to it
      if (randomNumber < 100000) {
         randomNumber = "0" + randomNumber;
         return randomNumber;
      } else {
         return randomNumber;
      }
   }

   // populating the array with 4 random IDs
   for (var i = 0; i < 4; i++) {
      generateRandomNumber();
      moviesArray[i] += randomNumber
      movieIDArray.push(moviesArray[i]);
   }

   console.log(movieIDArray)

   for (var i = 0; i < 4; i++) {
   $.ajax({
      url: "http://www.omdbapi.com/?i=" + movieID + apiKey,
      method: "GET"
   }).then(
      console.log(response)
   )

}



   // question number one - which year was this movie made in
   // going to need to do a random ajax call for imdb movie
   // is there a way to limit the years? make it a 90s movie quiz?
   // then if you choose the wrong answer, a screen pops that says WRONG and gives the information about the correct movie
   // if you choose the correct answer, a screen pops that says CORRECT and gives the information about the correct movie

}

randomQuestion1();