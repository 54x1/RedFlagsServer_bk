let socket = io();
// const socket = io('https://red-flags-server.herokuapp.com/')
let pppperksss;
let cards;
const username = {};
let displayUser;
let socketId;
let timerRand;
let d = [];
let da = [];
let pubFlags = [];
let thisFlag;
let voting = false;
let selected = false;
const gameScreen = document.getElementById("gameScreen");
const initialScreen = document.getElementById("initialScreen");
const loginSection = document.getElementById("login-section");
const newGameBtn = document.getElementById("newGameButton");
const joinGameBtn = document.getElementById("joinGameButton");
const loginGameBtn = document.getElementById("loginGameButton");
const gameCodeInput = document.getElementById("gameCodeInput");
const newPerks = document.getElementById("fa-redo");
const gamePerk1 = document.getElementById("perk1");
const gameCodeDisplay = document.getElementById("gameCodeDisplay");
const perk1 = document.getElementById("perk1");
const perk2 = document.getElementById("perk2");
newGameBtn.addEventListener("click", newGame);
newPerks.addEventListener("click", newPerksFunc);

$(".loginForm").submit(function (e) {
  e.preventDefault();
});

// $('.public-flags').hide()

socket.on("socketio", socketio);

function socketio(data) {
  console.log("socket.io", data);
  socketId = data;
}
socket.on("init", init);
// socket.on('gameState', handleGameState);
// socket.on('gameOver', handleGameOver);
// socket.on('gameCode', handleGameCode);
socket.on("perks", handlePerks);
socket.on("ppperks", handlePPerks);
//socket.on('newPerks', handleNewPerks)

// socket.on('unknownCode', handleUnknownCode);
// socket.on('tooManyPlayers', handleTooManyPlayers);
// socket.on('flagData', flagData);
socket.on("subFlagData", subFlagData);
socket.on("subFlagDataSelf", subFlagDataSelf);
// socket.on("unknownData", unknownData)
// // socket.on("flagStateData", subFlagData)
socket.on("newFlagData", newFlagData);
// socket.on("userEmit", newUserData )
// socket.on("userLeft", displayName)
socket.on("startVote", startVoteData);
socket.on("removeCard", removeCard);
socket.on("removeCardSelf", removeCardSelf);
socket.on("newFlagCard", newFlagCard);
socket.on("playerdc", playerdc);
socket.on("removeFlag", removeFlagData);
socket.on("userJoined", userJoinedData);
socket.on("userJoinedDisplay", userJoinedDisplay);
// socket.on('leaderboardDisplayData', leaderboardDisplayData)
// socket.on("subFlagDataRandom", subFlagDataRandom);
// socket.on('subFlagDataRand', subFlagDataRandData)
socket.on("chooseWinnerDisplay", chooseWinnerDisplay);
socket.on("isVotingData", isVotingData);
socket.on("randTime", randTimeData)
socket.on('testff', testff)

function testff(data) {
  console.log("datatestff", data)
}

function randTimeData(data){
timerRand = data
}
function chooseWinnerDisplay(data) {
  console.log("datazzz", data);
  $(".red-flag-row").html(
    "<p class='red-flag-msg'><b>'" + data + "'" + " is choosing</b></p>"
  );
}

function isVotingData(data) {
  voting = data;
  console.log("isVotingData", voting);
}
/*
function subFlagDataRandom(data) {
  console.log("called2", $(".user span").html());
  console.log("subFlagDataRandomzzz", data);
  // console.log('cards', $('.public-card-section .card-section').html())
  da.push(data);
  for (let i = 0; i < data.length; i++) {
    if (
      [...new Set(da)].filter(
        (cc) => cc[i][0].code.code === gameCodeDisplay.innerText
      ).length !== 0
    ) {
      $(".public-flags").css({ display: "flex" });
    }
    // console.log('here', d.length, data.length)
    [...new Set(da)]
      .filter(
        (cc) =>
          cc[i][0].code.code === gameCodeDisplay.innerText &&
          cc[i][2].user.user !== us
      )
      .map((m) =>
        $(".public-flags").append(
          '<div class="card-section text-center">' +
            m[i][1].cards.cards +
            "</div>"
        )
      );
  }
  // let b = pubFlags.filter(vv => vv)
  // $('.public-flags').append(
  // "<div class='card-section text-center'>"+
  // 	da.filter(bb => bb.room[0].code[0].code.code === gameCodeDisplay.innerText).filter(
  // 	bb=> !b.includes(
  // 		bb.room[0].code[1].cards.cards
  // 		))[0].room[0].code[1].cards.cards+
  // "</div>")

  $(".game-container").show();
  $(".flag-section").hide();
  cards = $(".card-section").html();
  // $('.home-section .public-flags').append("<div class='card-section text-center'>"+ $(this).html()+"</div>")
  console.log("cards", cards);
  let code = gameCodeDisplay.innerText;
  let user = $(".user span").html();
  socket.emit("FlagCards", {
    room: [{ code }, { cards }, { user }, { socketId }],
  });

  data = { room: [{ code }, { cards }, { user }, { socketId }] };
  console.log("dataz", data);
  $("#gameScreen .red-flag-row").html(
    "<p class='red-flag-msg'><b>Waiting on others </b></p>"
  );
  $(this).remove();
  let countFlags = $(".public-flags .card-section").length + 1;
  console.log("countFlag", countFlags);
  socket.emit("countFlags", [countFlags, gameCodeDisplay.innerText]);
}
*/

// function leaderboardDisplayData(data){
// let d = []
// d.push(data)
// console.log(d)
// // d.each(function(i){
// 	// console.log(d[i])

// // })
// 	$('.leaderboard-section ol').append("<li><mark>"+data+"</mark><small>0</small></li>")

// }
function userJoinedDisplay(data) {
  $(".alert").fadeIn();

  $(".alert").append(
    "<div class='alert-success' role='alert'>" + data + " has joined</div>"
  );
  $(".leaderboard-section ol").append(
    "<li><mark>" + data + "</mark><small>0</small></li>"
  );
  console.log("userJoinedDisplay", data);
  $(".leaderboard-section li mark").each(function () {
    let user = $(this).text();
    let code = gameCodeDisplay.innerText;
    let room = { room: [{ code }, { user }] };
    socket.emit("leaderboard", room);
  });
  user = "";
  room = "";

  $(".alert-success")
    .fadeTo(1300, 300)
    .slideUp(300, function () {
      $(".alert-success").slideUp(300);
      $(".alert").hide(200);
    });
}

function userJoinedData(data) {
  let dd = [];
  dd.push(data);
  console.log("userJoinedData", dd);
  $(".leaderboard-section ol").append(
    "<li><mark><b>" + data + "</b></mark><small>0</small></li>"
  );
}

$(document).on("click", ".fa-trophy", function () {
  $(".game-container").hide();
  $(".leaderboard-section").show();
});

function removeFlagData(data) {
console.log('z', data)
console.log("dadada", da );
 
a = da.filter(e => e.room[0].code[0].code === data);
a.forEach(f => da.splice(da.findIndex(e => e.room[0].code[0].code  === f.room[0].code[0].code  ),1));

console.log("dadada", a );
 
// function removeItemAll(arr, value) {
//   var i = 0;
//   while (i < arr.length) {
//     if (arr[i] === value) {
//       arr.splice(i, 1);
//     } else {
//       ++i;
//     }
//   }
//   return arr;
// }

//   da.filter(
//     (e) => e.room[0].code[0].code.code === gameCodeDisplay.innerText && e.room[0].code[1].cards.cards !== data
//   );


// //   b
// //   c
//   console.log("datad", da.filter(
//     (e) => e.room[0].code[0].code.code === gameCodeDisplay.innerText && e.room[0].code[1].cards.cards !== data[0].room[0].code[1].cards.cards
//   ))
// if (d[0].length > 0){
//   for  (let i = 0; i < d[0].length; i++) {
//   c = d.filter(
//     (e) => e[i][0].code.code === gameCodeDisplay.innerText
//   );
//   c.forEach((f) =>
//     d.splice(
//       d.findIndex(
//         (e) =>  e[i][0].code.code === f[i][0].code.code
//       ),
//       1
//     )
//   );
//   }
// }

  // da.filter(cc => cc.room[0].code[0].code.code === gameCodeDisplay.innerText).remove(cc.room[0].code[1].cards.cards)

}

function playerdc(data) {
  console.log("pfunc", $(".leaderboard-section mark").text());

  $(".leaderboard-section mark").each(function () {
    if ($(this).text() === data) {
      $(this).parent().remove();
    }
  });
}

function removeCard(data, text) {

  console.log("remdaat", data, text);
  console.log("bb", String(data[0]));
  console.log("aa", $(".public-flags .card-section").text());
  $("#gameScreen .red-flag-row .red-flag-msg").html(
    "<b>Waiting on next round</b>"
  );
  $("#gameScreen .public-flags").before(
    '<p class="red-flag-msg"><b>Winner FLAG</b></p>'
  );
  $(".public-flags .card-section").each(function () {
    let remName = $(this).html();
    if (remName !== String(data[0])) {
      console.log("this", $(this).html());
      $(this).remove();
    }
  });
}

function removeCardSelf(data, text) {
  // $('.red-flag-row').html('<div class="red-flag-section text-danger text-center"><p id="sign" style="cursor: pointer;"><i class="text-danger far fa-plus-square"></i></p></div></div>')
  console.log("remdaat", data, text);
  console.log("bb", String(data[0]));
  console.log("aa", $(".public-flags .card-section").text());
  // $('#gameScreen .red-flag-row .red-flag-msg').html("<b>Waiting on next round</b>")
  // $('#gameScreen .public-flags').before('<p class="red-flag-msg"><b>Winner FLAG</b></p>')
  $(".public-flags .card-section").each(function () {
    let remName = $(this).html();
    if (remName !== String(data[0])) {
      console.log("this", $(this).html());
      $(this).remove();
    }
  });
}

function newFlagCard() {
  let code = gameCodeDisplay.innerText;
  $.getJSON("flags.json", function (data) {
    console.log("dataflags", data);
    var randInt4 = Math.floor(Math.random() * data.flags.length);
    $(".flag-section .flags").append(
      '<div class="card-section text-center" data-toggle="modal" data-target="#exampleModal">' +
        data.flags[randInt4].card +
        "</div>"
    );
  });
  $("#sign").unbind("click");
  $("#sign").css({ cursor: "pointer" });
  $(".public-flags").hide();
  $(".public-flags .card-section").remove();
  $("#sign").html('<i class="text-danger far fa-plus-square"></i>');
  console.log("end newflagcard here");
  $("#new-red-flags-next-game, .red-flag-msg").remove();
  $(".red-flag-row").html(
    '<div class="red-flag-section text-danger text-center"><p id="sign" style="cursor: pointer;"><i class="text-danger far fa-plus-square"></i></p></div></div>'
  );
  socket.emit("newRoundClear", code);
  // voting === false
}

$(document).on("click", "#new-red-flags-next-game", function () {
  // voting === false
  let code = gameCodeDisplay.innerText;
  socket.emit("newRound", code, d);
  socket.emit("newRoundClean", code);
  socket.emit('newTimer', [code, timerRand])
  console.log("clicked right here");
  $(this).remove();
  $(".red-flag-row").html(
    '<div class="red-flag-section text-danger text-center"><p id="sign" style="cursor: pointer;"><i class="text-danger far fa-plus-square"></i></p></div></div>'
  );
  $("#new-red-flags-next-game, .red-flag-msg").remove();
});

function startVoteData() {
  console.log("voting time");
  socket.emit("chooseWinner", [
    $(".user span").html(),
    gameCodeDisplay.innerText,
  ]);
  $(".public-flags .card-section").css({
    "background-color": "#c82333",
    color: "white",
  });
  $(".red-flag-row").html(
    '<p class="red-flag-msg"><b>Choose the winner FLAG</b></p>'
  );

  $(document).on("click", ".public-flags .card-section", function () {
    if ($(this).css("background-color") == "rgb(200, 35, 51)") {
      remCard = [$(this).html(), gameCodeDisplay.innerText];
      text = "Winner FLAG";
      socket.emit("removeCard", remCard, text);
      $(".public-flags .card-section").css({
        "background-color": "white",
        color: "black",
      });
      $("#gameScreen .public-flags").before(
        '<p class="red-flag-msg"><b>Winner FLAG</b></p>'
      );
      $("#gameScreen .red-flag-row .red-flag-msg").remove();
      $("#gameScreen .red-flag-row").append(
        '<div id="new-red-flags-next-game" class="btn btn-danger"><span class="title">Next Round</span><i class="bottom-right fas fa-arrow-right"></i></div>'
      );
    }
  });
  voting = true;
  socket.emit("isVoting", voting, gameCodeDisplay.innerText);
}

usernameGen();
// function displayName(data){
// 	console.log("dataxxxx", data)
// }

function usernameGen() {
  var id = namesData() + new Date().getUTCMilliseconds();

  displayUser = id;
  $(".user span").html(displayUser);
}

function namesData() {
  var adjs = [
      "autumn",
      "hidden",
      "bitter",
      "misty",
      "silent",
      "empty",
      "dry",
      "dark",
      "summer",
      "icy",
      "delicate",
      "quiet",
      "white",
      "cool",
      "spring",
      "winter",
      "patient",
      "twilight",
      "dawn",
      "crimson",
      "wispy",
      "weathered",
      "blue",
      "billowing",
      "broken",
      "cold",
      "damp",
      "falling",
      "frosty",
      "green",
      "long",
      "lucky",
      "lingering",
      "bold",
      "little",
      "morning",
      "muddy",
      "old",
      "red",
      "rough",
      "still",
      "small",
      "sparkling",
      "throbbing",
      "shy",
      "wandering",
      "withered",
      "wild",
      "black",
      "young",
      "holy",
      "solitary",
      "fragrant",
      "aged",
      "snowy",
      "proud",
      "floral",
      "restless",
      "divine",
      "polished",
      "ancient",
      "purple",
      "lively",
      "nameless",
    ],
    nouns = [
      "waterfall",
      "river",
      "breeze",
      "moon",
      "rain",
      "wind",
      "sea",
      "morning",
      "snow",
      "lake",
      "sunset",
      "pine",
      "shadow",
      "leaf",
      "dawn",
      "glitter",
      "forest",
      "hill",
      "cloud",
      "meadow",
      "sun",
      "glade",
      "bird",
      "brook",
      "butterfly",
      "bush",
      "dew",
      "dust",
      "field",
      "fire",
      "flower",
      "firefly",
      "feather",
      "grass",
      "haze",
      "mountain",
      "night",
      "pond",
      "darkness",
      "snowflake",
      "sliver",
      "sound",
      "sky",
      "shape",
      "town",
      "thunder",
      "violet",
      "water",
      "wildflower",
      "wave",
      "water",
      "resonance",
      "sun",
      "wood",
      "dream",
      "cherry",
      "tree",
      "fog",
      "frost",
      "voice",
      "paper",
      "frog",
      "smoke",
      "star",
    ];

  return (
    adjs[Math.floor(Math.random() * (adjs.length - 1))] +
    "_" +
    nouns[Math.floor(Math.random() * (nouns.length - 1))]
  );
}
$("#genNewUser").click(function () {
  usernameGen();
});
socket.on("disconnect", () => {
  console.log("here", displayUser);

  // socket.emit('playerDis', displayUser)
  $(".alert").fadeIn();

  $(".alert").append(
    "<div class='alert-secondary' role='alert'>" +
      displayUser +
      " has left</div>"
  );
  $(".alert-secondary")
    .fadeTo(1300, 300)
    .slideUp(300, function () {
      $(".alert-secondary").slideUp(300);
      $(".alert").hide(200);
    });
  console.log("playerdc", displayUser);
  socket.emit("player", displayUser, gameCodeDisplay.innerText);
});

// function newUserData(data, c){

// console.log("datac1 called", data.username.name, c)
// displayUser = data.username.name
// socket.emit('player', displayUser, gameCodeDisplay.innerText)
// }

function newFlagData(data) {
  if (voting) {
    console.log("votin", voting);
    $("#sign").bind("click", function () {
      return false;
    });
    $("#sign").css({ cursor: "not-allowed" });
    $("#sign").html('<i class="text-secondary far fa-plus-square"></i>');
  } else {
    $("#sign").unbind("click");
    $("#sign").css({ cursor: "pointer" });
  }
  console.log("vvote", voting);
  
  let us =  $(".user span").html()
	console.log("called1",  us)
	console.log('newFlagData', [...new Set(data)])
	d.push([...new Set(data)])

	
	// 	// console.log('here', d.length, data.length)
	// 	[...new Set(d)].filter(cc =>  cc[i][0].code.code === gameCodeDisplay.innerText  && cc[i][2].user.user !== us).map(
	// 	m =>   $('.public-flags').append("<div class='card-section text-center'>"+m[i][1].cards.cards+"</div>")
	// 	)
	// }
// if ($([...new Set(data)]).length > 0){
 $([...new Set(data)]).each(function (i){
   		if ([$(this)].filter(cc => cc[0].code === gameCodeDisplay.innerText).length !== 0){
		$('.public-flags').css({"display":"flex"})
      }
   $('.public-flags').append("<div class='card-section text-center'>"+
[$(this)].filter(cc => cc[0].code === gameCodeDisplay.innerText).map(m=> m[1].cards)+"</div>")
  })
// }
//   let us = $(".user span").html();
//   console.log("called1", us);
//   console.log("newFlagData", [...new Set(data)]);
//   d.push([...new Set(data)]);
// console.log("ddd",d)
//   for (let i = 0; i < [...new Set(d)].length; i++) {
//     if(
//        [...new Set(d)].filter(
//         (cc) => cc[i].room[0].code.code === gameCodeDisplay.innerText
//       ).length !== 0
//     ) {
//       $(".public-flags").css({ display: "flex" });
//     }
//     [...new Set(d)].filter(
//         (cc) =>
//           cc[i].room[0].code.code === gameCodeDisplay.innerText &&
//           cc[i].room[2].user.user !== us
//       )
//       .map((m) => $(".public-flags").append(
//           '<div class="card-section text-center">' +
//             m[i].room[0].code[1].cards.cards +
//             "</div>"
//         )
//       )
        
//   }
}


function subFlagDataSelf(data) {
  console.log("ddzz", data)
  console.log("called3", $(".user span").html());


	if (data !== ""){
	da.push(data)
  }
	$('.public-flags .card-section').each(function (){
pubFlags.push($(this).text())
	})
  
  newDa = [...new Set(da)]
   let b = pubFlags.filter(vv => vv) 
// newDa.filter(bb => bb.room[0].code[0].code.code === gameCodeDisplay.innerText).filter(
// 		bb=> !b.includes(
// 			bb.room[0].code[1].cards.cards
			// ))[0][0].code[1].cards.cards
// map( m => $('.public-flags').append("<div class='card-section text-center'>"+m+"</div>")
let newFlagArr = [...new Set(newDa)].filter(bb => bb.room[0].code[0].code === gameCodeDisplay.innerText).filter(bb=> !b.includes(bb.room[0].code[1].cards))
let newFlagArrSet = [...(newFlagArr)]
   $('.public-flags').append("<div class='card-section text-center'>"+
   newFlagArr.map(m=>m.room[0].code[1].cards)+"</div>")
      console.log('subFlagDatazself', da)
      console.log('subFlagDatazselfd',  newDa)
	  console.log('zz', newFlagArrSet 
    )
}


function subFlagData(data) {
    console.log("called2", $(".user span").html());


	da.push(data)
	$('.public-flags .card-section').each(function (){
pubFlags.push($(this).text())
	})
  
  newDa = [...new Set(da)]
   let b = pubFlags.filter(vv => vv) 
// newDa.filter(bb => bb.room[0].code[0].code.code === gameCodeDisplay.innerText).filter(
// 		bb=> !b.includes(
// 			bb.room[0].code[1].cards.cards
			// ))[0][0].code[1].cards.cards
// map( m => $('.public-flags').append("<div class='card-section text-center'>"+m+"</div>")

  if (newDa.filter(bb => bb.room[0].code[0].code).filter(bb=> !b.includes(bb.room[0].code[1].cards)).map(m=>m.room[0].code[1].cards).length !== 0){
$('.public-flags').css({"display":"flex"})
       }

   $('.public-flags').append("<div class='card-section text-center'>"+
 newDa.filter(bb => bb.room[0].code[0].code).filter(bb=> !b.includes(bb.room[0].code[1].cards)).map(m=>m.room[0].code[1].cards)+"</div>")
  

// $('.public-flags').append(
// 	"<div class='card-section text-center'>"
// 	+newDa.filter(bb => bb.room[0].code[0].code).filter(bb=> !b.includes(bb.room[0].code[1].cards))+
// 	"</div>")
      console.log('subFlagDatazselfz', newDa)
      console.log('subFlagDatazselfdz', b)
	  console.log('zzz', newDa.filter(bb => bb.room[0].code[0].code).filter(bb=> !b.includes(bb.room[0].code[1].cards)).map(m=>m.room[0].code[1].cards)
      )
  // console.log("called2", $(".user span").html());

  // $(".public-flags").css({ display: "flex" });
  // da.push(data);
  // $(".public-flags .card-section").each(function () {
  //   pubFlags.push($(this).text());
  // });

  // newDa = [...new Set(da)];
  // let b = pubFlags.filter((vv) => vv);

  // // map( m => $('.public-flags').append("<div class='card-section text-center'>"+m+"</div>")
  // $(".public-flags").append(
  //   '<div class="card-section text-center">' +
  //     newDa
  //       .filter(
  //         (bb) => bb.room[0].code[0].code.code === gameCodeDisplay.innerText
  //       )
  //       .filter((bb) => !b.includes(bb.room[0].code[1].cards.cards))[0].room[0].code[1].cards.cards +
  //     "</div>"
  // );

  // console.log(
  //   "nnnn",
  //   newDa
  //       .filter(
  //         (bb) => bb.room[0].code[0].code.code === gameCodeDisplay.innerText
  //       )
  //       .filter((bb) => !b.includes(bb.room[0].code[1].cards.cards))[0].room[0].code[1].cards.cards
  // );

  // console.log(
  //   "subFlagDatazx",
  //   newDa.filter(
  //     (cc) => cc.room[0].code[0].code.code === gameCodeDisplay.innerText
  //   )
  // );
  // //   console.log('zzzz',  newDa.filter(cc => cc.room[0].code[1].cards.cards).some(pubFlags.filter(vv => vv)))
  // console.log(
  //   "zzzzzx",
  //   pubFlags.filter((vv) => vv)
  // );

  // console.log(
  //   "subFlagDatazzz",
  //   newDa
  //     .filter(
  //       (bb) => bb.room[0].code[0].code.code === gameCodeDisplay.innerText
  //     )
  //     .filter((bb) => !b.includes(bb.room[0].code[1].cards.cards))[0].room[0]
  //     .code[1].cards.cards
  // );
}

$(".leaderboard-section .fa-times").click(function () {
  $(".leaderboard-section").hide();
  $(".game-container").show();
});

function colorCountCards(RandCard) {
  $(".game-place .flags .card-section").each(function (i) {
    // let numCards = $('.game-place .flags .card-section').length
    // let RandCard = Math.floor(Math.random() * numCards) + 1
    setTimeout(function () {
      console.log(i);

      $(".game-place .flags .card-section:nth-child(" + (i + 1) + ")").css({
        "background-color": "#dae0e5",
        color: "rgb(200, 35, 51)",
      });

      $(".game-place .flags .card-section:nth-child(" + (--i + 1) + ")").css({
        "background-color": "white",
        color: "black",
        border: "3px solid #c82333",
      });
      if (i === 2) {
        $(".game-place .flags .card-section:nth-child(4)").css({
          "background-color": "#dae0e5",
          color: "rgb(200, 35, 51)",
        });
      } else if (i !== 2) {
        $(".game-place .flags .card-section:nth-child(4)").css({
          "background-color": "white",
          color: "black",
          border: "3px solid #c82333",
        });

        // console.log('here')
      }
    }, i * 100);
    setTimeout(function () {
      console.log(i);

      $(".game-place .flags .card-section:nth-child(" + (i + 1) + ")").css({
        "background-color": "#dae0e5",
        color: "rgb(200, 35, 51)",
        border: "3px solid #dae0e5",
      });

      $(".game-place .flags .card-section:nth-child(" + (--i + 1) + ")").css({
        "background-color": "white",
        color: "black",
        border: "3px solid #dae0e5",
      });
      if (i === 2) {
        $(".game-place .flags .card-section:nth-child(4)").css({
          "background-color": "#dae0e5",
          color: "rgb(200, 35, 51)",
          border: "3px solid #dae0e5",
        });
      } else if (i !== 2) {
        $(".game-place .flags .card-section:nth-child(4)").css({
          "background-color": "white",
          color: "black",
          border: "3px solid #dae0e5",
        });

        // console.log('here')
      }
    }, 400 + i * 100);
    //    console.log('iii',colorCountCardsTimer*i*2)
    setTimeout(function () {
      $(".game-place .flags .card-section").css({
        "background-color": "#dae0e5",
        color: "rgb(200, 35, 51)",
        border: "3px solid #dae0e5",
      });
    }, 800);

    setTimeout(function () {
      $(".game-place .flags .card-section").css({
        "background-color": "white",
        "rgb(200, 35, 51)": "black",
        border: "3px solid #dae0e5",
      });
    }, 1000);
    setTimeout(function () {
      $(".game-place .flags .card-section").css({
        "background-color": "#dae0e5",
        color: "rgb(200, 35, 51)",
        border: "3px solid #dae0e5",
      });
    }, 1200);

    setTimeout(function () {
      $(".game-place .flags .card-section").css({
        "background-color": "white",
        color: "black",
        border: "3px solid #dae0e5",
      });
    }, 1400);

    setTimeout(function () {
      $(".game-place .flags .card-section:nth-child(" + RandCard + ")").css({
        "background-color": "rgb(200, 35, 51)",
        color: "white",
        border: "3px solid #dae0e5",
      });
    }, 1600);
  });
}

function startTimer(duration) {
  let count = 0;
  let timer = duration;
  let minutes, seconds;
  let numCards = $(".game-place .flags .card-section").length;
  let RandCard = Math.floor(Math.random() * numCards) + 1;

  let setTime = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    $(".time").text("Select a Red Flag " + minutes + ":" + seconds);

    if (--timer === -1 && selected === false) {
      $(".time").text("Waiting for others");
      $(".flags .card-section").bind("click", function () {
        return false;
      });
      $(".flags .card-section").css({ cursor: "not-allowed" });
      clearInterval(setTime);
      colorCountCards(RandCard);
    }

    if (timer === 8 && count === 0 && selected === false) {
      if (confirm("More Time?") == true) {
        timer = 20;
        count++;
      } else {
        console.log("no extra time");
      }
    }

    if (timer === -1 && selected === false) {
      let numCards = $(".game-place .flags .card-section").length;
      let RandCard = Math.floor(Math.random() * numCards) + 1;
      console.log("timer", timer);
      let Rcards = $(
        ".game-place .flags .card-section:nth-child(" + RandCard + ")"
      ).text();
      let cards = Rcards;
      let code = gameCodeDisplay.innerText;
      let user = $(".user span").html();
      setTimeout(function () {
        socket.emit("RandomCard", {
          room: [{ code }, { cards }, { user }, { socketId }],
        });

        data = { room: [{ code }, { cards }, { user }, { socketId }] };
        console.log("dataRandz", data);
      }, 3000);
    }
  }, 1000);
}

$(document).on("click", ".fa-plus-square", function () {
  $(".game-container").hide();
  $(".flag-section").show();
  $(".public-flags").css({ display: "flex" });
  $(".perk1").html(perk1.innerText);
  $(".perk2").html(perk2.innerText);

  let time = 5;
//   startTimer(time);
});

$(document).on("click", ".game-place .flags .card-section ", function () {
   thisFlag = $(this).text()
   if($('.modal-footer .confirm').length < 1){
 $('.modal-footer').append('<button type="button" class="btn confirm btn-danger" data-dismiss="modal">Confirm</button>')
 }
 
})
 $(document).on("click", ".cancel", function () {
  console.log('emptythisFlag')
  })
  
  $(document).on("click", ".modal-content:not('.modal.fade.show')", function () {
    console.log("herere")
  });

$(document).on("click", ".confirm", function () {
  socket.emit('timer', gameCodeDisplay.innerText)
  if (thisFlag !== ""){
  console.log("timer", timerRand)
let timerrr;
$("timerRand").each(function (i){
var difference =  Math.abs(i-i[i]);
console.log("difference", difference)
})
 function genRandNum(){
  let min = 500;
  let max = 800;

  let rand =  Math.floor(Math.random() * (max - min)) + min;
    return rand
}
 if ( genRandNum() < timerRand-300 || genRandNum() < timerRand+300 ){
  timerrr = timerRand
 }
 else{
     timerrr = genRandNum() + 300
 }
 


    
      
      console.log("selected", selected);
      $(".game-container").show();
      $(".flag-section").hide();
      cards = thisFlag;
      // $('.home-section .public-flags').append("<div class='card-section text-center'>"+ $(this).html()+"</div>")
      console.log("cards", cards);
      $(".red-flag-row").html(
        '<p class="red-flag-msg"><b>Waiting for others</b></p>'
      );

      let code = gameCodeDisplay.innerText;
      let user = $(".user span").html();
socket.emit('FlagCards', {room:[{code},{cards},{user}, {socketId}]})

      data = { room: [{ code }, { cards }, { user }, { socketId }] };
      console.log("dataz", data);
      // socket.emit('subFlagCard', data)
      $("#sign").bind("click", function () {
        return false;
      });
      $("#sign").css({ cursor: "not-allowed" });
      $("#sign").html('<i class="text-secondary far fa-plus-square"></i>');


     $('.flag-section .card-section').each(function (){
      if($(this).text() === cards){
        $(this).remove()
      }
     })     
      setTimeout(() => {
      let countFlags = $('.public-flags .card-section').length;

      socket.emit("countFlags", [countFlags, gameCodeDisplay.innerText]);
      console.log('countFlags', countFlags)
    }, timerrr);
  // }
  }
  // }, timerrr, console.log("timerRand2", timerrr));
});

// gone
$(document).on("click", ".fa-times-circle", function () {
  if (confirm("Are You Sure?") == true) {
    socket.emit("flag", $(".red-flag-section .card-section").html());

    console.log("hereflag", $(".red-flag-section .card-section").html());
    $(this).remove();
    $(".red-flag-section .card-section, #sign").remove();

    $(".flags .card-section").css({ "pointer-events": "auto" });
    $(".flags .card-section").css({ cursor: "pointer" });
  }
});

// function flagData(data){
// 	$(".flags").children().unbind('click');
// 	console.log("flagdatafrontend", data)
// 	$(".home-section .public-flags").append("<div class='card-section'>"+data+"</div>")
// }

// let prev = null
// function checkss(number, data){
// 	if(number == prev){
// 		number = Math.floor(Math.random() * data) + 1
// 		console.log("cn2", number)
// 		return number
// 	}
// 	 else{
// 			console.log('cn', num)
// 			prev = num
// 			return num
// 		}
// }
// function ss(data) {
// 	let number = Math.floor(Math.random() * data) + 1;

// 	if(number == prev){
// 		checkss(number, data)
// 	}
// 	 else{
// 		prev = number

// 			return number
// 		}
// }

function handleNewPerks(data) {
  let countFlags = $(".public-flags .card-section").length + 1;
  let s = ss(2);

  if (s == null) {
    console.log(prev);
  } else {
    console.log(s);
  }

  // console.log("data", data)
  let perks = data;
  perk1.innerText = perks[0];
  perk2.innerText = perks[1];
}

// console.log();
function newGame() {
  socket.emit("newGame");

  // perk();
}

function newPerksFunc() {
  socket.emit("newPerks");
  // perk1.innerText = perks[0];
  // perk2.innerText = perks[1];
  // pppperksss = perks
  // console.log('heeh', pppperksss)

  // socket.emit('newpperks', pppperksss);
}

// function unknownData(data){

// if (data != 'True'){
// 	console.log('dataun', data);
// }
// return data
// }

// function getRandomInt(userCount) {
//   console.log(Math.floor(Math.random() * (userCount+1)))
//   return Math.floor(Math.random() * (userCount+1));

// }

$(loginGameBtn).on("click", function () {
  // let userCount = 1
  // getRandomInt(userCount)
  user = displayUser;
  console.log("displayUser", displayUser);
  if (user) {
    loginSection.style.display = "none";
    initialScreen.style.display = "block";
    username["name"] = user;
    console.log("username", username);
  }
});
$(joinGameBtn).on("click", function () {
  const code = gameCodeInput.value;
  socket.emit("joinGame", code);
});

function handlePPerks(pperks) {
  let perks = pperks;
  console.log("pppperkssshh", pperks);
  perk1.innerText = perks[0];
  perk2.innerText = perks[1];
  console.log("hiih", perks);
}

let playerNumber;
let gameActive = false;

function init(roomName) {
  const code = roomName;
  $(gameCodeDisplay).html(roomName);
  $(perk1).html($(gamePerk1).val());
  socket.emit("perks");

  let socketId = socket.id;
  socket.emit("newUser", { socketId, code, username });
  socket.emit("newJoinFlag");

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

  $.getJSON("flags.json", function (data) {
    // console.log(data);
    var randInt = Math.floor(Math.random() * data.flags.length);
    var randInt2 = Math.floor(Math.random() * data.flags.length);
    var randInt3 = Math.floor(Math.random() * data.flags.length);
    var randInt4 = Math.floor(Math.random() * data.flags.length);
    $(".flags >.card-section:first-child")
      .html("")
      .append(data.flags[randInt].card);
    $(".flags >.card-section:nth-child(2)")
      .html("")
      .append(data.flags[randInt2].card);
    $(".flags >.card-section:nth-child(3)")
      .html("")
      .append(data.flags[randInt3].card);
    $(".flags >.card-section:last-child")
      .html("")
      .append(data.flags[randInt4].card);
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
}

function handleGameCode(gameCode) {
  gameCodeDisplay.innerText = gameCode;
  let socketId = socket.id;
  // socket.emit('newUser', {socketId, gameCode, username})
}

function handlePerks(perks) {
  perk1.innerText = perks[0];
  perk2.innerText = perks[1];
  pppperksss = perks;
  console.log("heeh", pppperksss);

  socket.emit("pperks", pppperksss);
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

  socket.emit("unknown");
  alert("Unknown Game Code");
}

function handleTooManyPlayers() {
  reset();
  alert("This game has max players");
}

function reset() {
  playerNumber = null;
  // $('.perk1, .perk2').html('');
  gameCodeInput.value = "";
  initialScreen.style.display = "block";
  gameScreen.style.display = "none";
}
