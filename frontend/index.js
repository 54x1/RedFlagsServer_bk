
let socket = io();
// const socket = io('https://red-flags-server.herokuapp.com/')
let pppperksss;
let cards;
const username = {};
let displayUser;
let socketId
let d = []
let da = []
let pubFlags = []
let voting = false
let selected = false
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

// $('.public-flags').hide()

socket.on('socketio', socketio)

function socketio(data){
console.log('socket.io', data)
socketId = data
}
socket.on('init', init);
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
socket.on("userJoined", userJoinedData)
socket.on("userJoinedDisplay", userJoinedDisplay)
socket.on('leaderboardDisplayData', leaderboardDisplayData)
socket.on('subFlagDataRandom', subFlagDataRandom)
socket.on('chooseWinnerDisplay', chooseWinnerDisplay)
socket.on("testff", testff)

function testff(data){
console.log("datatestff", data)
}

if (voting === true){
  $("#sign").bind('click', function(){ return false; });
$("#sign").css( {"cursor":"not-allowed"});  
$('#sign').html('<i class="text-secondary far fa-plus-square"></i>')
}



function chooseWinnerDisplay(data){
console.log("datazzz",  data)
$('.public-flags .text-danger').html("'"+data+"'" + " is choosing the winner FLAG")
}


function subFlagDataRandom(data){
 console.log("called2",  $(".user span").html())
  console.log('subFlagDataRandomzzz', data)
// console.log('cards', $('.public-card-section .card-section').html())
// if (data.length == null || data.length == 0){
  da.push(data)
    da.filter(cc => cc.room[0].code[0].code.code === gameCodeDisplay.innerText && cc.room[0].code[1].cards.cards !== $('.public-flags .card-section').html()).map(
      m =>   $('.public-flags').append("<div class='card-section text-center'>"+m.room[0].code[1].cards.cards+"</div>")
      )



      $('.game-container').show()
      $('.flag-section').hide()
      cards = $('.card-section').html()
      // $('.home-section .public-flags').append("<div class='card-section text-center'>"+ $(this).html()+"</div>")
      console.log("cards", cards)
      let code = gameCodeDisplay.innerText
      let user = $(".user span").html()
      socket.emit('FlagCards', {room:[{code},{cards},{user}, {socketId}]})
      
      data = {room:[{code},{cards},{user}, {socketId}]}
        console.log('dataz', data)
      $("#sign").bind('click', function(){ return false; });
      $("#sign").css( {"cursor":"not-allowed"});  
      $('#sign').html('<i class="text-secondary far fa-plus-square"></i>')
          $(this).remove()
          let countFlags = $('.public-flags .card-section').length + 1
          console.log("countFlag", countFlags)
          socket.emit("countFlags", [countFlags, gameCodeDisplay.innerText])
      
}
function leaderboardDisplayData(data){
let d = []
d.push(data)
console.log(d)
// d.each(function(i){
  // console.log(d[i])

// })
  $('.leaderboard-section ol').append("<li><mark>"+data+"</mark><small>0</small></li>") 
  
}
function userJoinedDisplay(data){
 
  $('.alert').fadeIn()


  $('.alert').append( "<div class='alert-success' role='alert'>"+data+" has joined</div>") 
  $('.leaderboard-section ol').append("<li><mark>"+data+"</mark><small>0</small></li>") 
  console.log("userJoinedDisplay", data)
  $('.leaderboard-section li mark').each(function (){

let user = $(this).text()
let code = gameCodeDisplay.innerText
let room = {room:[{code}, {user}]}
    socket.emit("leaderboard",room)

  })
  user = ""
  room = ""

  $(".alert-success").fadeTo(1300, 300).slideUp(300, function(){
    $(".alert-success").slideUp(300);
});
}
function userJoinedData(data){
  let d = []
  d.push(data)
  console.log("userJoinedData", d)
  $('.leaderboard-section ol').append("<li><mark><b>"+data+"</b></mark><small>0</small></li>")

}

$(document).on('click', '.fa-trophy', function() {
  $('.game-container').hide()
$('.leaderboard-section').show()
})
function removeCardData(data){



  b = da.filter(e => e.room[0].code[0].code.code === gameCodeDisplay.innerText);
  b.forEach(f => da.splice(da.findIndex(e => e.room[0].code[0].code.code === f.room[0].code[0].code.code),1));


  
 
// da.filter(cc => cc.room[0].code[0].code.code === gameCodeDisplay.innerText).remove(cc.room[0].code[1].cards.cards)
console.log("rem", data)
console.log("da", da)
console.log("b", b)
}

function playerdc(data){
  console.log('pfunc', $('.leaderboard-section mark').text())

  $('.leaderboard-section mark').each(function (){
if ($(this).text() === data){
  $(this).parent().remove()
}
  })



  $('.alert').fadeIn()

  $('.alert').append("<div class='alert-secondary' role='alert'>"+data+" has left</div>")
  console.log("playerdcfunc", data)
  $(".alert-secondary").fadeTo(1300, 300).slideUp(300, function(){
    $(".alert-secondary").slideUp(300);
});
}

function removeCard(data, text){
  console.log("remdaat", data, text)
  console.log('bb', String(data[0]))
  console.log('aa', $('.public-flags .card-section').text() )
  $('.public-flags .text-danger').html(text)
  $('.public-flags .card-section').each(function (){
    let remName = $(this).html()
    if (remName !== String(data[0])){
      console.log("this", $(this).html())
      $(this).remove();
    }
  })
  

}
function newFlagCard(){
  let code = gameCodeDisplay.innerText
  $.getJSON('flags.json', function(data) {
    console.log("dataflags", data)
    var randInt4 = Math.floor(Math.random() * (data.flags.length));
$('.game-place .flags').append("<div class='card-section text-center'>"+data.flags[randInt4].card+"</div>");
});
$("#sign").unbind('click');
$("#sign").css( {"cursor":"pointer"});
$('.public-flags .text-danger').html("RED FLAGS")
$('.public-flags .card-section').remove()
$('#sign').html('<i class="text-danger far fa-plus-square"></i>')
console.log("end newflagcard here")
socket.emit('newRoundClear', code)
// voting === false
}

$(document).on('click', '#new-red-flags-next-game', function() {
  // voting === false
  let code = gameCodeDisplay.innerText
  socket.emit('newRound', code, d)
console.log("clicked right here")
$(this).remove()
$('#new-red-flags-next-game').remove()
})

function startVoteData(){
  console.log("voting time")
  socket.emit('chooseWinner', [$(".user span").html(), gameCodeDisplay.innerText])
$('.public-flags .card-section').css({"background-color":"#c82333", "color":"white"})
  $('.public-flags .text-danger').html("Choose the winner FLAG")
$(document).on('click', '.public-flags .card-section', function() {
  if( $(this).css('background-color') == 'rgb(200, 35, 51)') {
  remCard =  [$(this).html(), gameCodeDisplay.innerText]
text = "Winner FLAG"
  socket.emit('removeCard', remCard, text )
$('.public-flags .card-section').css({"background-color":"white", "color":"black"})
$('.public-flags .text-danger').html("Winner FLAG")
$('#gameScreen .col-centered').append('<div id="new-red-flags-next-game" class="btn btn-danger"><span class="title">Next Round</span><i class="bottom-right fas fa-arrow-right"></i></div>')
  }
})
voting === true;
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
  $('.alert').fadeIn()

  $('.alert').append("<div class='alert-secondary' role='alert'>"+displayUser+" has left</div>")
  $(".alert-secondary").fadeTo(1300, 300).slideUp(300, function(){
    $(".alert-secondary").slideUp(300);
});
  console.log("playerdc", displayUser)
socket.emit('player', displayUser, gameCodeDisplay.innerText)
});

function newUserData(data, c){
  
console.log("datac1 called", data.username.name, c)
displayUser = data.username.name
socket.emit('player', displayUser, gameCodeDisplay.innerText)
}
function newFlagData(data){
  // $('.public-flags').show()
  console.log('vvote', voting)
  let us =  $(".user span").html()
  console.log("called1",  $(".user span").html())
  console.log('newFlagData', [...new Set(data)])
  d.push(data)
  
  for (let i=0; i< data.length; i++){
    // console.log('here', d.length, data.length)
    [...new Set(d)].filter(cc =>  cc[i][0].code.code === gameCodeDisplay.innerText  && cc[i][2].user.user !== us).map(
    m =>   $('.public-flags').append("<div class='card-section text-center'>"+m[i][1].cards.cards+"</div>")
    )
  }
}
function subFlagData(data){

  console.log("called2",  $(".user span").html())


  $('.public-flags').show()
// console.log('cards', $('.card-section').html())
// if (data.length == null || data.length == 0){
  da.push(data)

  pubFlags.push($('.public-flags .card-section').text())
  newDa = [...new Set(da)]
  newDa.filter(cc => cc.room[0].code[0].code.code === gameCodeDisplay.innerText && pubFlags.filter(vv => cc.room[0].code[1].cards.cards !== vv)).map(
      m =>   $('.public-flags').append("<div class='card-section text-center'>"+m.room[0].code[1].cards.cards+"</div>")
      )
      console.log('subFlagDataz', newDa)



     

  
//     try{
//       if (data.room[0].code[0].code.code.length > 1){
//       // data.room[0].code[0].code.code === gameCodeDisplay.innerText
// console.log("dataoneset", data)
//   $('.public-flags').append("<div class='card-section text-center'>"+data.room[0].code[1].cards.cards+"</div>")
// //        )
//       }
//     }
  
//   // })

// catch {
//   try{
//   if ((data[0][0].room[0].code.code > 1 )){
//   // data[0][0].room[0].code.code === gameCodeDisplay.innerText
//   console.log('here[0][0]', data)
//     $('.public-flags').append("<div class='card-section text-center'>"+data[0][0].room[1].cards.cards+"</div>")
// // cc[0].room[0].code.code === gameCodeDisplay.innerText
//         //  
//     // if (data[i].room[0].code[0].code.code){
  

//     // }
  
//   // })
// }
// // }
// }
// catch{

//     console.log('here < ')
// }
// }
}

$('.leaderboard-section .fa-times').click(function (){
  $('.leaderboard-section').hide()
  $('.game-container').show()
})

function colorCountCards(RandCard){
  $('.game-place .flags .card-section').each(function (i){
    // let numCards = $('.game-place .flags .card-section').length
    // let RandCard = Math.floor(Math.random() * numCards) + 1
      setTimeout(function(){
        console.log(i)

        $('.game-place .flags .card-section:nth-child('+(i+1)+')').css({'background-color':"#dae0e5", "color": "rgb(200, 35, 51)"})

        $('.game-place .flags .card-section:nth-child('+(--i+1)+')').css({'background-color':"white", "color": "black", "border": "3px solid #c82333"})
        if (i === 2){
          $('.game-place .flags .card-section:nth-child(4)').css({'background-color':"#dae0e5", "color": "rgb(200, 35, 51)"})
          
            
        }else if (i !== 2){
          $('.game-place .flags .card-section:nth-child(4)').css({'background-color':"white", "color": "black", "border": "3px solid #c82333"})
     
          // console.log('here')
         
       
        }

   }, i*100)
         setTimeout(function(){
        console.log(i)

        $('.game-place .flags .card-section:nth-child('+(i+1)+')').css({'background-color':"#dae0e5", "color": "rgb(200, 35, 51)", "border": "3px solid #dae0e5"})

        $('.game-place .flags .card-section:nth-child('+(--i+1)+')').css({'background-color':"white", "color": "black", "border": "3px solid #dae0e5"})
        if (i === 2){
          $('.game-place .flags .card-section:nth-child(4)').css({'background-color':"#dae0e5", "color": "rgb(200, 35, 51)", "border": "3px solid #dae0e5"})
          
            
        }else if (i !== 2){
          $('.game-place .flags .card-section:nth-child(4)').css({'background-color':"white", "color": "black", "border": "3px solid #dae0e5"})
     
          // console.log('here')
         
       
        }

   }, 400+i*100)
//    console.log('iii',colorCountCardsTimer*i*2)
   setTimeout(function(){
    $('.game-place .flags .card-section').css({'background-color':"#dae0e5", "color": "rgb(200, 35, 51)", "border": "3px solid #dae0e5"})
}, 800)

setTimeout(function(){
  $('.game-place .flags .card-section').css({'background-color':"white", "rgb(200, 35, 51)": "black", "border": "3px solid #dae0e5"})
}, 1000)
setTimeout(function(){
  $('.game-place .flags .card-section').css({'background-color':"#dae0e5", "color": "rgb(200, 35, 51)", "border": "3px solid #dae0e5"})
}, 1200)

setTimeout(function(){
$('.game-place .flags .card-section').css({'background-color':"white", "color": "black", "border": "3px solid #dae0e5"})
},1400)

  setTimeout(function(){
   
  $('.game-place .flags .card-section:nth-child('+RandCard+')').css({'background-color':"rgb(200, 35, 51)", "color": "white", "border": "3px solid #dae0e5"})

    }, 1600)

  })



}

function startTimer(duration) {
  let count = 0
  let timer = duration
  let minutes, seconds;
    let numCards = $('.game-place .flags .card-section').length
    let RandCard = Math.floor(Math.random() * numCards) + 1

    let setTime = setInterval(function () {

        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

         $('.time').text("Select a Red Flag "+minutes + ":" + seconds);
        
        if (--timer === -1 && selected === false) {
            $('.time').text("Waiting for others");
            $(".flags .card-section").bind('click', function(){ return false; });
$(".flags .card-section").css( {"cursor":"not-allowed"});  
            clearInterval(setTime)
            colorCountCards(RandCard)
   }

        if (timer === 8 && count === 0 && selected === false){
         
          if (confirm('More Time?') == true) {      
          timer = 20;
          count++
          }else{
            console.log('no extra time')
          }
        }



        if (timer === -1 && selected === false){
          let numCards = $('.game-place .flags .card-section').length
          let RandCard = Math.floor(Math.random() * numCards) + 1
          console.log('timer', timer)
          let Rcards = $('.game-place .flags .card-section:nth-child('+RandCard+')').text()
          let cards = Rcards
          let code = gameCodeDisplay.innerText
          let user = $(".user span").html()
          setTimeout(function(){
          socket.emit('RandomCard', {room:[{code},{cards},{user}, {socketId}]})
          
          data = {room:[{code},{cards},{user}, {socketId}]}
            console.log('dataRandz', data)
          }, 3000)
        }
 
        
    }, 1000);
}
  
$(document).on('click', '.fa-plus-square', function() {
$('.game-container').hide()
$('.flag-section').show()
$('.public-flags').show()
$('.perk1').html(perk1.innerText)
$('.perk2').html(perk2.innerText)


let time = 5
startTimer(time);
})

$(document).on('click', '.flags .card-section', function() {

  if (confirm('Submit this FLAG?') == true) {
    selected = true
     console.log("selected", selected)
    $('.game-container').show()
$('.flag-section').hide()
cards = $(this).text()
// $('.home-section .public-flags').append("<div class='card-section text-center'>"+ $(this).html()+"</div>")
console.log("cards", cards)
let code = gameCodeDisplay.innerText
let user = $(".user span").html()
socket.emit('FlagCards', {room:[{code},{cards},{user}, {socketId}]})

data = {room:[{code},{cards},{user}, {socketId}]}
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
  const code = gameCodeInput.value;
socket.emit('joinGame', code);

let us =  $(".user span").html()
console.log('the d', d)
// && cc[i][2].user.user !== us
for (let i=0; i< d.length; i++){

c = d.filter(cc =>  cc[i][0].code.code === gameCodeDisplay.innerText  );
c.forEach(f => d.splice(d.findIndex(e => e[i][1].cards.cards === f[i][1].cards.cards),1));  
console.log('cc', c)
}

  // if($('.public-flags .card-section').length){
  //   console.log('text', $('.red-flag-section .card-section').html())
  //   socket.emit('newJoinFlagData', $('.red-flag-section .card-section').html())
  //   }else{
    // }

  console.log('un', unknownData())
  // if (unknownData() == 'True'){
  // init();
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

function init(roomName) {

  const code = roomName;
  $(gameCodeDisplay).html(roomName);
  $(perk1).html($(gamePerk1).val());
  socket.emit('perks');

  let socketId = socket.id
socket.emit('newUser', {socketId, code, username})
  socket.emit('newJoinFlag')

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
  // socket.emit('newUser', {socketId, gameCode, username})
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