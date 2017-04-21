var game = false;
var strict = false;
var started = false;
var pattern = [];
var player = [];
var lightUp;
var sound1 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var sound2 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var sound3 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var sound4 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var wrong = new Audio("https://www.myinstants.com//media/sounds/incorrect.swf.mp3")


var pressButton = document.getElementsByClassName("press");
for (var i = 0; i < pressButton.length; i++){
  pressButton[i].addEventListener("click", function(event){
    if (game === true){
      game = false;
      console.log("you clicked", event.target.id)
      player.push(parseInt(event.target.id));
      setTimeout(function(){
        checkMatches();
      }, 300)
    }
  })
}

var startButton = document.getElementById("start");
startButton.addEventListener("click", function(){
  if (started === false){
    console.log("start clicked");
    started = true;
    start();
  }
});

var strictButton = document.getElementById("strict");
strictButton.addEventListener("click", function(){
  if (strict === true){
    strict = false;
    console.log("strict mode off");
  } else {
    console.log("strict mode on")
    strict = true;
  }
});

var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function(){
  console.log("game reset")
  started = false;
  game = false;
  clearInterval(lightUp);
  pattern = [];
  player = [];
  document.getElementById("start").checked = false;
  if (document.getElementById("counter").innerText !== "Game Over"){
    document.getElementById("counter").innerText = "Press Start";
  }
});

function start(){
  console.log("game started")
  pattern = [];
  var spin = [0, 1, 3, 2];
  var i = 0;
  var spinIt;
  spinIt = setInterval(function(){
    var spinning = document.getElementById(spin[i]);
    spinning.classList.add("lit");
    setTimeout(function(){
      spinning.classList.remove("lit");
    }, 100);
    spin.push(spin[i]);
    i++;
    if (spin.length >= 20){
      clearInterval(spinIt);
      setTimeout(function (){
          addOne();
      }, 100)
    }
  }, 100)
}

function addOne(){
  game = false;
  pattern.push(Math.floor(Math.random() * 4));
  console.log("pattern lengthened")
  document.getElementById("counter").innerText = pattern.length;
  playPattern();
}

function playPattern(){
  const buttons = Array.from(document.querySelectorAll(".press"));
  buttons.forEach(function(button){
    button.style.pointerEvents = "none";
  })
  console.log("the pattern is", pattern);
  var i = 0;
  lightUp = setInterval(function(){
    var litButton = document.getElementById(pattern[i]);
    litButton.classList.add("lit");
    var sound = "sound" + (parseInt(pattern[i])+1);
    window[sound].play();
    setTimeout(function(){
      litButton.classList.remove("lit");
    }, 800)
    i++;
    if (i >= pattern.length){
      clearInterval(lightUp);
      setTimeout(function(){
        buttons.forEach(function(button){
          button.style.pointerEvents = "auto";
        });
        yourTurn();
      }, 800)
    }
  }, 1000)
}

function yourTurn(){
  console.log("now it's your turn")
  game = true;
  player = [];
}

function checkMatches(){
  console.log("checking for matches", player, pattern)
  for (var i = 0; i < player.length; i++){
    console.log("i'm comparing", pattern[i], player[i]);
    if (player[i] !== pattern[i]){
      console.log("wrong", player, "doesn't match", pattern);
      wrong.play();
      if (strict === true){
        console.log("You lose.  Good day, sir.");
        document.getElementById("counter").innerText = "Game Over";
        resetButton.click();
        return player;
      } else {
        player = [];
        playPattern();
        return player;
      }
    }
  }
  if (player.length === pattern.length){
    console.log("you got it right")
    if (pattern.length === 10){
      console.log("You won the game!");
      document.getElementById("counter").innerText = "You Won!";
      started = false;
      return player;
    } else {
      addOne();
    }
  }
  game = true;
}

function mouseDown(id){
  if (game === true){
    document.getElementById(id).classList.add("lit");
    var sound = "sound" + (parseInt(id)+1);
    window[sound].play();
  }
}

function mouseUp(id){
  if (game === true){
    document.getElementById(id).classList.remove("lit");
  }
}