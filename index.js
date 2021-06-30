var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$(document).keypress(function(event) {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

})

var click =1;
$(".btn").click(function() {
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  animatePress(userChoosenColor);
  playSound(userChoosenColor);
  checkAnswer(click);
  click=click+1;

})


function nextSequence() {
  userClickedPattern =[];
  click = 1;
  level = level + 1;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.random() * 3;
  randomNumber = Math.round(randomNumber);
  var randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  $("#" + randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);

}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");

  }, 0.1);
}

function checkAnswer(currentLevel) {

for(var i=0;i<currentLevel;i++)
{
  if(gamePattern[i]!=userClickedPattern[i])
  {
    $("#level-title").text("GameOver Press Any key to continue");
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    setTimeout(function()
  {
    $("body").removeClass("game-over");
  })
  startOver();
break;

  }
  if(i==level-1)
  {
    setTimeout(function()
  {
    nextSequence();
  },1000)
  }


}

}
function startOver()
{
  level = 0;
  gamePattern=[];
  started = false;
}
