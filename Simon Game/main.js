//INITIAL DECLARATIONS
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

//MAKES THE REQUIRED SEQUENCE AND EDITS THE TITLE
function nextSequence () {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("h1").text("Level " + level);
}
 

$(".btn").on("click", function (event) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

//CHECKS IF ANSWER IS CORRECT
function checkAnswer (currentLevel) {
    //CORRECT CLICK
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
    }
    else{
    //WRONG CLICK
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press any key to restart.");
        startOver();
    }
    if(userClickedPattern.length===gamePattern.length){
    //FULL CORRECT ANSWER
        setTimeout(nextSequence,900);
    }
}

    
//PLAYS THE BUTTON SOUND ON CLICK / HIGHLIGHT
function playSound(name) {
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

//ANIMATES THE BUTTON CLICK
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//STARTS THE GAME AT LEVEL 1
var started = 0;
$(document).on("keydown", function(){
    if(started==0){
        nextSequence();
        started++;
    }
});

//STARTOVER TO REFRESH ALL VALUES  (DOESNT RESTART THE GAME THO)
function startOver(){
    level = 0;
    gamePattern = [];
    started = 0;
}