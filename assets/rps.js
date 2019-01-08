 // Initialize Firebase
 var config = {
   apiKey: "",
   authDomain: "rock-paper-scissors-a9000.firebaseapp.com",
   databaseURL: "https://rock-paper-scissors-a9000.firebaseio.com",
   projectId: "rock-paper-scissors-a9000",
   storageBucket: "rock-paper-scissors-a9000.appspot.com",
   messagingSenderId: "332094871871"
 };
 firebase.initializeApp(config);

 var database = firebase.database();

var whichplayer = null

 database.ref().once("value").then(function (snapshot) {
   if (snapshot.val().player1.id) {

     var playerId = prompt("Type your name if you are ready to start");
     database.ref("player2").set({
       id: playerId
     })
      whichplayer = "player2"
      $(".name").html(whichplayer)
   } else {

     var playerId = prompt("Type your name if you are ready to start");
     database.ref("player1").set({
       id: playerId
     })
     whichplayer = "player1"
     $(".name").html(whichplayer)
   }
 })


 // database.ref().set({
 //   player1 : playerId
 // });
 // Save new value to Firebase




 // Creates an array that lists out all of the options (Rock, Paper, or Scissors).
 var Player1Choice = ["r", "p", "s"];

 // Creating variables to hold the number of wins, losses, and ties. They start at 0.
 var wins = 0;
 var losses = 0;
 var ties = 0;

 // Create variables that hold references to the places in the HTML where we want to display things.
 var directionsText = document.getElementById("directions-text");
 var userChoiceText = document.getElementById("userchoice-text");
 var computerChoiceText = document.getElementById("computerchoice-text");
 var winsText = document.getElementById("wins-text");
 var lossesText = document.getElementById("losses-text");
 var tiesText = document.getElementById("ties-text");

 // This function is run whenever the user presses a key.
 document.onkeyup = function (event) {

   // Determines which key was pressed.
   var userGuess = event.key;

   // Randomly chooses a choice from the options array. This is the Computer's guess.
   var computerGuess = Player1Choice[Math.floor(Math.random() * Player1Choice.length)];

   // Reworked our code from last step to use "else if" instead of lots of if statements.

   // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate number
   if ((userGuess === "r") || (userGuess === "p") || (userGuess === "s")) {

     if ((userGuess === "r" && computerGuess === "s") ||
       (userGuess === "s" && computerGuess === "p") ||
       (userGuess === "p" && computerGuess === "r")) {
       wins++;
     } else if (userGuess === computerGuess) {
       ties++;
     } else {
       losses++;
     }

     // Hide the directions
     directionsText.textContent = "";

     // Display the user and computer guesses, and wins/losses/ties.
     userChoiceText.textContent = "You chose: " + userGuess;
     computerChoiceText.textContent = "The computer chose: " + computerGuess;
     winsText.textContent = "wins: " + wins;
     lossesText.textContent = "losses: " + losses;
     tiesText.textContent = "ties: " + ties;
   }
 };