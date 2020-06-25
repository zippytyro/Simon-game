// jshint esversion:6
// variables declarations
var randomChosenColor, randomNumber, buttonColors, userChosenColor;
var gamePattern = [];
var userClickedPattern = [];
buttonColors = ["blue", "red", "green", "yellow"];

var started = false;
var level = 0,
    temp = 0;

// event handler for keypress
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $(".again").text("");
    }
});
// playing sound which resembles to color of the btn
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
// event handling (Click)
$(".btn").click(function () {
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

// checking the correct answer for pattern
function checkAnswer(currentLevel) {
    if ((userClickedPattern[currentLevel]) === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1080);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200); // 200 milliseconds
        $("#level-title").text("You Lose!");
        $(".again").text("Press 'Start' to play again.");
        score();
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    temp += 10;
    $("#level-title").text("Level " + level);

    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];

    playSound(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(150).fadeIn(100);
    gamePattern.push(randomChosenColor);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    temp = 0;
    level = 0;
    gamePattern = [];
    started = false;
    document.getElementById('highestLevel').style.display = "block";
}
// click event for button so as to be optimized for mobile and tablet devices.
$("button").click(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $(".again").text("");
    }
});

function score() {
    $('#highestLevel').text("Your score: " + temp);
}
