
// let socket = io();
let pppperksss;
let cards = []
const socket = io('https://red-flags-server.herokuapp.com/')
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
socket.on('flagData', flagData);
socket.on('subFlagData', subFlagData);
socket.on("unknownData", unknownData)
socket.on("flagStateData", subFlagData)
socket.on("newFlagData", newFlagData)
socket.on("disconnecting", () => {
  console.log("socket.rooms", socket.rooms); // the Set contains at least the socket ID
});
function newFlagData(data){
  console.log('newFlagData', data)
  // if (data.room[0].code.code)
  $('.public-flags').append("<div class='card-section text-center'>"+data[0].room[0].code[1].cards.cards+"</div>")
}
function subFlagData(data){
  console.log("subFlagData1", data)
if(data[0] != null){
console.log("subFlagData", data)
$(data).each(function (i){
  data[i].room[0].code[0].code.code.filter(c => c.includes(gameCodeDisplay.value)).map(d => console.log("d", d), $('.public-flags').append("<div class='card-section text-center'>"+d[i].room[0].code[1].cards.cards+"</div>"))
  console.log('insde each here', String(data[i].room[0].code[0].code.code, gameCodeDisplay.value))
  // if (ddd){
  // console.log('insde if here')
  // 
  // }else{
  //   console.log(data[i].room[0].code[1].cards.cards)
  // }
})

}
else{
  $('.public-flags').append("<div class='card-section text-center'>"+data.room[0].code[1].cards.cards+"</div>")
}

}


$(document).on('click', '.fa-plus-square', function() {
$('.home-section').hide()
$('.flag-section').show()
$('.perk1').html(perk1.innerText)
$('.perk2').html(perk2.innerText)


// alert("You have submitted your flag!")
// $('#sign').html("<i class='text-danger fas fa-times-circle'></i>")
// $(".flags").children().bind('click', function(){ return false; });
// $(".flags .card-section").css( {"cursor":"not-allowed"});
// console.log( $('.red-flag-section .card-section').html())
// socket.emit('subFlagCard', $('.red-flag-section .card-section').html())
})
$(document).on('click', '.flags .card-section', function() {
  if (confirm('Submit this FLAG?') == true) {
    $('.home-section').show()
$('.flag-section').hide()
cards.push($(this).text())
// $('.home-section .public-flags').append("<div class='card-section text-center'>"+ $(this).html()+"</div>")
console.log("cards", cards)
let code = gameCodeDisplay.innerText
socket.emit('FlagCards', {room:[{code},{cards}]})
$("#sign").bind('click', function(){ return false; });
$("#sign").css( {"cursor":"not-allowed"});
$('#sign').html('<i class="text-secondary far fa-plus-square"></i>')
    $(this).remove()
  }
  // // $(this).click(function (){
  //   console.log($('.red-flag-section .card-section').html())
  //   if($('.red-flag-section .card-section').length){
  //   $('.flags').append("<div class='card-section text-center'>"+$('.red-flag-section .card-section').html()+"</div>")
  //   }
  //   // socket.emit('flag', $(this).html());

  //   $(this).remove()
  // //   <p class="sign">
  // //   <i class="text-danger far fa-plus-square"></i>
  // // </p>
  // $('.red-flag-section').html("<p id='sign'><i class='text-danger far fa-plus-square'></i></p><div class='card-section'>"+$(this).html()+"</div>")
  //   // $('.red-flag-section').append("<p id='sign'><i class='text-danger fas fa-times-circle'></i></p><div class='card-section'>"+$(this).html()+"</div>")

  // // })

});

$(document).on('click', '.fa-times-circle', function() {
  if (confirm('Are You Sure?') == true) {
    socket.emit('flag', $('.red-flag-section .card-section').html());

    console.log("hereflag", $('.red-flag-section .card-section').html())
    $(this).remove()
    $(".red-flag-section .card-section, #sign").remove()
  
    $(".flags .card-section").css({"pointer-events": "auto"});
    $(".flags .card-section").css( {"cursor":"pointer"});
  }


});

function flagData(data){
  $(".flags").children().unbind('click');
  console.log("flagdatafrontend", data)
  $(".home-section .public-flags").append("<div class='card-section'>"+data+"</div>")
}



function handleNewPerks(data){
  console.log("data", data)
  let perks = data;
  perk1.innerText = perks[0];
  perk2.innerText = perks[1];
  }
  
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

function unknownData(data){

if (data != 'True'){
  console.log('dataun', data);
}
return data
}


$(joinGameBtn).on('click', function(){

  $(gameCodeDisplay).html($(gameCodeInput).val());
  $(perk1).html($(gamePerk1).val());
  socket.emit('perks');
  const code = gameCodeInput.value;
  socket.emit('joinGame', code);
  // if($('.public-flags .card-section').length){
  //   console.log('text', $('.red-flag-section .card-section').html())
  //   socket.emit('newJoinFlagData', $('.red-flag-section .card-section').html())
  //   }else{
      socket.emit('newJoinFlag')
    // }

  console.log('un', unknownData())
  // if (unknownData() == 'True'){
  init();
  // }
})

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
  
  socket.emit('unknown');
  alert('Unknown Game Code');
}

function handleTooManyPlayers() {
  reset();
  alert('This game has max players');
}



function reset() {
  playerNumber = null;
  // $('.perk1, .perk2').html('');
  gameCodeInput.value = '';
  initialScreen.style.display = "block";
  gameScreen.style.display = "none";
}
