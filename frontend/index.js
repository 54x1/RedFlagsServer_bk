
$( ".card-section" ).click(function() {
    if ( $( this ).hasClass("ui-draggable-dragging") ) {

}
});

$('.card-section').draggable({
  cursor: "grabbing",
  containment: ".place",
  stack: ".card-section",
  snapTolerance: 20
});


$('.flags').sortable();


$('.card-section').on('touchmove', function(){
// $(this).css({"left"}) =
});
// let socket = io();
let pppperksss;
let qperks = []
let qqperk;
// const socket = io('https://flags-54x1.herokuapp.com/');
const socket = io('https://red-flags-server.herokuapp.com/')
// var perk1val = document.getElementsByClassName('perk3');
// var perk2val = document.getElementsByClassName('perk4');
// // console.log(perk2val.value);
// socket.emit('perks', {
//        perk1: perk1val.value,
//        perk2s: perk2val.value
//    });
socket.on('init', handleInit);
socket.on('gameState', handleGameState);
socket.on('gameOver', handleGameOver);
socket.on('gameCode', handleGameCode);
socket.on('perks', handlePerks);
socket.on('newPerks', handleNewPerks)
// socket.on('pperks', handlePPerks);
socket.on('ppperks', handlePPerks);
socket.on('unknownCode', handleUnknownCode);
socket.on('tooManyPlayers', handleTooManyPlayers);
// socket.on('handlePerks', joinPerks);



function handleNewPerks(data){
console.log("data", data)

}

const gameScreen = document.getElementById('gameScreen');
const initialScreen = document.getElementById('initialScreen');
const newGameBtn = document.getElementById('newGameButton');
const joinGameBtn = document.getElementById('joinGameButton');
const gameCodeInput = document.getElementById('gameCodeInput');
const newPerks = document.getElementById('new-red-flags');
const gamePerk1 = document.getElementById('perk1');
const gameCodeDisplay = document.getElementById('gameCodeDisplay');
const perk1 = document.getElementById('perk1');
const perk2 = document.getElementById('perk2');
newGameBtn.addEventListener('click', newGame);
newPerks.addEventListener('click', newPerksFunc);
// joinGameBtn.addEventListener('click', joinGame);


// console.log();
function newGame() {
  socket.emit('newGame');

// perk();
  init();
}

function newPerksFunc(){
  socket.emit('newPerks');
  // perk1.innerText = perks[0];
  // perk2.innerText = perks[1];
  // pppperksss = perks
  // console.log('heeh', pppperksss)

  // socket.emit('newpperks', pppperksss);

}



$(joinGameBtn).on('click', function(){
  $(gameCodeDisplay).html($(gameCodeInput).val());
  $(perk1).html($(gamePerk1).val());
  socket.emit('perks');
  const code = gameCodeInput.value;
  socket.emit('joinGame', code);
  init();
})

function joinGame() {

  console.log('pppperksssjfunc', qqperk)


  // socket.on('perk1', function (message) {
  //   console.log("question2", message)
  //       });
  
}

function handlePPerks(pperks){
  let perks = pperks
  console.log('pppperkssshh', pperks)
  perk1.innerText = perks[0];
  perk2.innerText = perks[1];
  console.log('hiih', perks)
}


let playerNumber;
let gameActive = false;

function init() {
  initialScreen.style.display = "none";
  gameScreen.style.display = "block";
  //
  // canvas = document.getElementById('canvas');
  // ctx = canvas.getContext('2d');
  //
  // canvas.width = canvas.height = 600;
  //
  // ctx.fillStyle = BG_COLOUR;
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  //
  // document.addEventListener('keydown', keydown);

  $.getJSON('flags.json', function(data) {
    // console.log(data);
    var randInt = Math.floor(Math.random() * (data.flags.length));
    var randInt2 = Math.floor(Math.random() * (data.flags.length));
      var randInt3 = Math.floor(Math.random() * (data.flags.length));
        var randInt4 = Math.floor(Math.random() * (data.flags.length));
    $('.flags >.card-section:first-child').html("").append(data.flags[randInt].card);
    $('.flags >.card-section:nth-child(2)').html("").append(data.flags[randInt2].card);
    $('.flags >.card-section:nth-child(3)').html("").append(data.flags[randInt3].card);
    $('.flags >.card-section:last-child').html("").append(data.flags[randInt4].card);
    // $('.card-section>p:nth-child(3)').append(data.flags[randInt2].card);

  });

  // $.getJSON("perks.json",function(data){
  //     var randIn = Math.floor(Math.random() * (data.perks.length + 1));
  //     var randIn2 = Math.floor(Math.random() * (data.perks.length + 1));
  //     // getPerks(randIn, randIn2, data);
  //
  //
  //     console.log(data);
  //     // alert('heree1');
  //
  // });



  // $.getJSON('perks.json', function(data) {
  // console.log(data);
  //
  // });

  gameActive = true;
}



function paintGame(state) {

}

function handleInit(number) {
  playerNumber = number;
}

function handleGameState(gameState) {
  if (!gameActive) {
    return;
  }


  gameState = "123"
}

function handleGameOver(data) {
  if (!gameActive) {
    return;
  }
  data = JSON.parse(data);

  gameActive = false;

  if (data.winner === playerNumber) {
    // alert('You Win!');
  } else {
    // alert('You Lose :(');
  }
}

function handleGameCode(gameCode) {
  gameCodeDisplay.innerText = gameCode;
}

function handlePerks(perks){
  perk1.innerText = perks[0];
  perk2.innerText = perks[1];
  pppperksss = perks
  console.log('heeh', pppperksss)

  socket.emit('pperks', pppperksss);
}

// function handleGameCode1(gameCode1){
// $.getJSON("perks.json",function(data){
//     var randIn = Math.floor(Math.random() * (data.perks.length));
//     var randIn2 = Math.floor(Math.random() * (data.perks.length));
//     $('body').append('perkData');
// });
// }
function handleUnknownCode() {
  reset();
  alert('Unknown Game Code');
}

function handleTooManyPlayers() {
  reset();
  alert('This game is already in progress');
}


function reset() {
  playerNumber = null;
  // $('.perk1, .perk2').html('');
  gameCodeInput.value = '';
  initialScreen.style.display = "block";
  gameScreen.style.display = "none";
}
