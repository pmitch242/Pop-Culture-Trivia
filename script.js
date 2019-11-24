var easyMusicURL = "https://opentdb.com/api.php?amount=1&category=12&difficulty=easy&type=multiple"

 



$("#someID").on("click", function(event) {
event.preventDefault();


$.ajax({
   url: easyMusicURL,
   method: "GET"
}).then (
   function (response) {
      console.log(response);
      var easyMusicQuestion = response.results[0].question;
      console.log(easyMusicQuestion)

      var answersArray = 
   }
)

})

