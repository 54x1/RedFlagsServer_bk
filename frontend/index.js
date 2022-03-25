
// let socket = io();
const socket = io('https://red-flags-server.herokuapp.com/')
let pppperksss;
let cards;
const username = {};
let displayUser;
let socketId
const gameScreen = document.getElementById('gameScreen');
const initialScreen = document.getElementById('initialScreen');
const loginSection = document.getElementById('login-section');
const newGameBtn = document.getElementById('newGameButton');
const joinGameBtn = document.getElementById('joinGameButton');
const loginGameBtn = document.getElementById('loginGameButton');
const gameCodeInput = document.getElementById('gameCodeInput');
const newPerks = document.getElementById('fa-redo');
const gamePerk1 = document.getElementById('perk1');
const gameCodeDisplay = document.getElementById('gameCodeDisplay');
const perk1 = document.getElementById('perk1');
const perk2 = document.getElementById('perk2');
newGameBtn.addEventListener('click', newGame);
newPerks.addEventListener('click', newPerksFunc);

$('.loginForm').submit(function(e){
  e.preventDefault()
})


socket.on('socketio', socketio)

function socketio(data){
console.log('socket.io', data)
socketId = data
}
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
// socket.on("flagStateData", subFlagData)
socket.on("newFlagData", newFlagData)
socket.on("userEmit", newUserData )
socket.on("userLeft", displayName)
socket.on("startVote", startVoteData)
socket.on("removeCard", removeCard)
socket.on("newFlagCard", newFlagCard)
socket.on("playerdc", playerdc)
socket.on("removeCard", removeCardData)
socket.on("testff", testff)
function testff(data){
console.log("datatestff", data)
}

function removeCardData(data){

}

function playerdc(data){
  $('.user').append("<p>Player: "+data+" has left</p>")
  console.log(data)
}

function removeCard(data, text){
  console.log("remdaat", data, text)
  console.log('bb', String(data[0]))
  console.log('aa', $('.public-flags .card-section').text() )
  $('.public-flags .text-danger').html(text)
  $('.public-flags .card-section').each(function (){
    let remName = $(this).html()
    if (remName == String(data[0])){
      console.log($(this))
      $('.public-flags .card-section').not($(this)).remove();
    }
  })
  

}
function newFlagCard(){
  $.getJSON('flags.json', function(data) {
    console.log("dataflags", data)
    var randInt4 = Math.floor(Math.random() * (data.flags.length));
$('.game-place .flags').append("<div class='card-section text-center'>"+data.flags[randInt4].card+"</div>");
});
$("#sign").unbind('click');
$("#sign").css( {"cursor":"pointer"});
$('.public-flags .text-danger').html("FLAG")
$('.public-flags .card-section').remove()
$('#sign').html('<i class="text-danger far fa-plus-square"></i>')
console.log("end newflagcard here")
}

$(document).on('click', '#new-red-flags-next-game', function() {
  let code = gameCodeDisplay.innerText
  socket.emit('newRound', code)
console.log("clicked right here")
$(this).remove()
$('#new-red-flags-next-game').remove()
})

function startVoteData(){
  console.log("voting time")
$('.public-flags .card-section').css({"background-color":"#c82333", "color":"white"})
  $('.public-flags .text-danger').html("Choose the winning FLAG")


$(document).on('click', '.public-flags .card-section', function() {
  if( $(this).css('background-color') == 'rgb(200, 35, 51)') {
  remCard =  [$(this).html(), gameCodeDisplay.innerText, displayUser]
text = "Winner FLAG"
  socket.emit('removeCard', remCard, text )
$('.public-flags .card-section').css({"background-color":"white", "color":"black"})
$('.public-flags .text-danger').html("Winner FLAG")
$('#gameScreen .col-centered').append('<div id="new-red-flags-next-game" class="btn btn-danger"><span class="title">Next Round</span><i class="bottom-right fas fa-arrow-right"></i></div>')
  }
})
}

usernameGen()
function displayName(data){
  console.log("dataxxxx", data)
}


function usernameGen(){
  var id =  haiku() + new Date().getUTCMilliseconds();

displayUser = id
$('.user span').html(displayUser)
// return id

}
function haiku(){
  var adjs = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry",
  "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring",
  "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered",
  "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green",
  "long", "lucky", "lingering", "bold", "little", "morning", "muddy", "old",
  "red", "rough", "still", "small", "sparkling", "throbbing", "shy",
  "wandering", "withered", "wild", "black", "young", "holy", "solitary",
  "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine",
  "polished", "ancient", "purple", "lively", "nameless"]

  , nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea",
  "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn",
  "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird",
  "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower",
  "firefly", "feather", "grass", "haze", "mountain", "night", "pond",
  "darkness", "snowflake", "sliver", "sound", "sky", "shape", "town",
  "thunder", "violet", "water", "wildflower", "wave", "water", "resonance",
  "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper",
  "frog", "smoke", "star"];

  return adjs[Math.floor(Math.random()*(adjs.length-1))]+"_"+nouns[Math.floor(Math.random()*(nouns.length-1))];
}
$('#genNewUser').click(function(){
  usernameGen() 
})
socket.on("disconnect", () => {
  
  console.log('here', displayUser)

  socket.emit('playerDis', displayUser)
});

function newUserData(data, c){
  
console.log("datac1 called", data.username.name, c)
displayUser = data.username.name
socket.emit('player', displayUser, gameCodeDisplay.innerText)
}
function newFlagData(data){
  console.log('newFlagData', data)
  // if (data.room[0].code.code)
  $('.public-flags').append("<div class='card-section text-center'>"+data[0].room[0].code[1].cards.cards+"</div>")
}
function subFlagData(data){
  console.log('subFlagDatam', data)
  console.log("called")
  console.log("data.length", data.length)
if (data.length == null || data.length == 0){
  console.log('subFlagDatam.length', data)

    if (data.room[0].code[0].code.code === gameCodeDisplay.innerText){
console.log("dataoneset", data)
  $('.public-flags').append("<div class='card-section text-center'>"+data.room[0].code[1].cards.cards+"</div>")
//        )

    }
  
  // })
  // data.filter(cc =>  cc.room[0].code[0].code.code === gameCodeDisplay.innerText ).map(
  //   m => $('.public-flags').append("<div class='card-section text-center'>"+m.room[0].code[1].cards.cards[0]+"</div>")
  //   )
}
else{
  console.log("data.filter", data)
 data.filter(cc =>  cc[0].room[0].code.code === gameCodeDisplay.innerText ).map(m => console.log("map", m)
         )

        //  $('.public-flags').append("<div class='card-section text-center'>"+m.room[0].cards.cards+"</div>"
    // if (data[i].room[0].code[0].code.code){
  

    // }
  
  // })
}
}



  
$(document).on('click', '.fa-plus-square', function() {
$('.game-container').hide()
$('.flag-section').show()
$('.perk1').html(perk1.innerText)
$('.perk2').html(perk2.innerText)
console.log('fa-plus-square')
})

$(document).on('click', '.flags .card-section', function() {
  if (confirm('Submit this FLAG?') == true) {
    $('.game-container').show()
$('.flag-section').hide()
cards = $(this).text()
// $('.home-section .public-flags').append("<div class='card-section text-center'>"+ $(this).html()+"</div>")
console.log("cards", cards)
let code = gameCodeDisplay.innerText
let user = $(".user span").html()
socket.emit('FlagCards', {room:[{code},{cards},{user}, {socketId}]})

data = {
  room:[
    {
      code:[
        {
          code
        }
    ]
  },
  {
    cards: [
      {
        cards
      }
    ]
  }
  ]
  }
  console.log('dataz', data)
// socket.emit('subFlagCard', data)
$("#sign").bind('click', function(){ return false; });
$("#sign").css( {"cursor":"not-allowed"});  
$('#sign').html('<i class="text-secondary far fa-plus-square"></i>')
    $(this).remove()
    let countFlags = $('.public-flags .card-section').length + 1
    console.log("countFlag", countFlags)
    socket.emit("countFlags", [countFlags, gameCodeDisplay.innerText])

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

let prev = null
function checkss(number, data){
  if(number == prev){
    number = Math.floor(Math.random() * data) + 1
    console.log("cn2", number)
    return number
  }
   else{
      console.log('cn', num)
      prev = num
      return num
    }
}
function ss(data) {
  let number = Math.floor(Math.random() * data) + 1;

  if(number == prev){
    checkss(number, data)
  }
   else{
    prev = number
    
      return number     
    }
}

function handleNewPerks(data){

let countFlags = $('.public-flags .card-section').length + 1
let s = ss(2)

if (s == null){
  console.log(prev)
}else{
  console.log(s)
}


  // console.log("data", data)
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


// function getRandomInt(userCount) {
//   console.log(Math.floor(Math.random() * (userCount+1)))
//   return Math.floor(Math.random() * (userCount+1));

// }




$(loginGameBtn).on('click', function(){
  // let userCount = 1
  // getRandomInt(userCount)
  user = displayUser
  console.log("displayUser", displayUser)
  if (user){
  loginSection.style.display = "none"
  initialScreen.style.display = "block"
  username["name"] = user
  console.log("username", username)
  }
})
$(joinGameBtn).on('click', function(){
$
  $(gameCodeDisplay).html($(gameCodeInput).val());
  $(perk1).html($(gamePerk1).val());
  socket.emit('perks');
  const code = gameCodeInput.value;
  socket.emit('joinGame', code);
  let socketId = socket.id
socket.emit('newUser', {socketId, code, username})
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
  let socketId = socket.id
  socket.emit('newUser', {socketId, gameCode, username})
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
