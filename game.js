buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

// Push the pattern the user has clicked to this array
var userClickedPattern = [];

// game level
var level = 0;

// only fire on first keypress to start the game
var started = false;

$(document).keypress(function () {
  if (!started) {
    // Change H1  
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
})

$(".btn").on("click", function (event) {
  // Store the user selection
  var userChosenColour = this.id;

  //  push user pattern to array
  userClickedPattern.push(userChosenColour);

  // Add sound to the sequence the user chooses
  playSound(userChosenColour);

  // Call button press animation
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
})

// Check the answer - gets called in click handler
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

// Need to trigger on keypress because won't play sound without user interaction with document
// START THE GAME
function nextSequence() {
  $("h1").text("Level " + level);
  level++;
  var randomNumber = Math.floor((Math.random() * 4));
  // select random number to generate a colour
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Select button to animate the next button in the sequence
  colourId = $('#' + randomChosenColour);

  // Animate the button in the sequence
  $(colourId).fadeOut(10).fadeIn();

  // PLay the sound effect for the button in the sequence
  var audio = new Audio('sounds/' + randomChosenColour + '.mp3');
  audio.play();

};

function startOver () {
  started = false;
  level = 0;
  gamePattern = [];
}


// function to play sound, called in click event handler, parsing in userchosencolour to change sound file
var playSound = function playSound(name) {
  // Var for sound
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();

}


// animate when button is pressed, called in click handler
function animatePress(currentColour) {
  $('#' + currentColour).addClass("pressed");

  setTimeout(function () {
    $('#' + currentColour).removeClass("pressed");
  }, 100);
}




