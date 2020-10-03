$(document).ready(function () {
    //alert("ready");  
    var buttonColours = ["red", "blue", "green", "yellow"];
    var gamePattern = [];
    var playingGame = false;
    var level = 0;
    var userClickedPattern = []; 
  

    function checkAnswer() {
        var match = true;
        for (let index = 0; index < gamePattern.length; index++) {
            if (userClickedPattern[index] != gamePattern[index])
            {
                match = false;
                break;
            } 
        }
        return match;
    }
 
    function animatePress(currentColor)
    {
        $("#" + currentColor).delay(500).addClass("pressed").delay(500).queue(function(next){
            $(this).removeClass("pressed");
            next();
        });
    } 

     function playSound(fileToPlay)
    {
        var audio = new Audio("sounds/" + fileToPlay + ".mp3");
        audio.play();
    }  

    $(".btn").click(function() {
       // alert("click");
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
       
        answerOk = true;
        // check if users answer is ok so far
        for (let index = 0; index < userClickedPattern.length; index++) {
            if (userClickedPattern[index] != gamePattern[index])
            {
                answerOk = false;
                break;
            } 
        }

        if (answerOk) {
            if (userClickedPattern.length == gamePattern.length)
            {
                nextSequence();
            }
        } else {

            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            animatePress("blue");
            animatePress("green");
            animatePress("red");
            animatePress("yellow");

            $("h1").text("GAME OVER - WRONG ANSWER");
            playingGame = false;
            gamePattern = [];
            userClickedPattern = [];        

        }

       

    });

    function nextSequence() {
        //alert("nextSequence");
        level++;
        $("h1").text("Level " + level);

        userClickedPattern = [];

        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
       
        // alert("nextSequence, randomChosenColour:" + randomChosenColour);
        
        //alert("gamePattern.length =" + gamePattern.length)

        for (let index = 0; index < gamePattern.length; index++) {
            //alert("gamePattern index" + index + " is: " + gamePattern[index]);
            setTimeout(function(){ playSound(gamePattern[index]); }, 1000 * (index + 1));
            setTimeout(function(){ animatePress(gamePattern[index]); }, 1000 * (index + 1));
        }
        

    } 
    
    $('h1').click(function (e) { 

        // alert("keydown");
        // alert("playingGame = " + playingGame);
        if (playingGame === false) {
            playingGame = true;
            // alert("calling nextSequence");
            nextSequence();  
        }
    });
    

    $('body').keydown(function (e) { 

        // alert("keydown");
        // alert("playingGame = " + playingGame);
        if (playingGame === false) {
            playingGame = true;
            // alert("calling nextSequence");
            nextSequence();  
        }
    });

   /*  $(document).keypress(function(e) {
        alert("keypress");
    }); */

});
