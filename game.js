var randomChosenColor,randomNumber,buttonColors,userChosenColor;var gamePattern=[];var userClickedPattern=[];buttonColors=["blue","red","green","yellow"];var started=!1;var level=0,temp=0;$(document).keypress(function(){if(!started){$("#level-title").text("Level "+level);nextSequence();started=!0;$(".again").text("")}});function playSound(name){var audio=new Audio("sounds/"+name+".mp3");audio.play()}
$(".btn").click(function()
