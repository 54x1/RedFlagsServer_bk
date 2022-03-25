// const io = require('socket.io')();
const { makeid } = require('./utils');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { flags } = require('socket.io/lib/namespace');
const cli = require('nodemon/lib/cli');
const { count } = require('console');

const publicPath = path.join(__dirname, '/frontend/');

let jsonData = require(path.join(__dirname, '/frontend/perks.json'));

// console.log(jsonData);
const port = process.env.PORT || 3000
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

const users = {}

let pp
let flagState = [];
let pperkss;
let gameData = []
let game = []

const clientRooms = {};
app.use(express.static(publicPath));
io.on('connection', client => {
  

  client.emit('socketio', client.id)
  client.on('removeCard', removeCardHandle)
  client.on('newUser', newUserHandle)
  client.on('userLeft', userLeftHandle)
  // client.on('keydown', handleKeydown);
  client.on('newGame', handleNewGame);
  client.on('joinGame', handleJoinGame);
  client.on('pperks', pperksHandle);
  client.on('newpperks', newpperksHandle);
  client.on('perks', perksHandle);
  client.on('newPerks', newPerksHandle);
  client.on('flag', handleFlag);
  client.on('unknown', handleUnknown);
// client.on('subFlagCard', subFlagCardHandle)
client.on('FlagCards', FlagCardsHandle)
client.on('newJoinFlag', newJoinFlagHandle)
client.on('newJoinFlagData', newJoinFlagDataHandle)
client.on('countFlags', countFlagsData)
client.on('player', playerData)
client.on('newRound', handleNewRound)
client.on("playerDis", playerDis)

function handleJoinGame(roomName) {

  console.log("clientSocket", users)
  const room = io.sockets.adapter.rooms[roomName];
console.log('room', room)

// console.log('data222', client.rooms)
// console.log('datazzz222', io.nsps['/'].adapter.rooms[roomName])


  let allUsers;
  if (room) {
    allUsers = room.sockets;
    console.log("allUsers", allUsers)
  }

  let numClients = 0;
  if (allUsers) {
    numClients = Object.keys(allUsers).length;
    console.log(numClients)
  }

  if (numClients === 0) {
    client.emit('unknownCode');
    return;
  } else if (numClients > 4) {
    client.emit('tooManyPlayers');
    return;
  }

  clientRooms[client.id] = roomName;

  console.log('client', clientRooms[client.id])

  client.join(roomName);


  client.number = 2;
  client.emit('init', 2);

}



function userLeftHandle(data){
console.log("datazzz", data)
}


function handleNewRound(code){
  handlePerks()
  console.log("pp", pp)
  client.emit('perks', pp);
  client.emit('newFlagCard')
  client.broadcast.to(code).emit('newFlagCard')
  client.broadcast.to(code).emit('perks', pp)
}
function handleNewGame() {
  var length = 6;
  let roomName = makeid(length);
  clientRooms[client.id] = roomName;
  client.emit('gameCode', roomName);
  console.log("roomNamez", clientRooms[client.id])
  client.join(roomName);
  handlePerks()
  console.log("pp", pp)
  client.emit('perks', pp);


  client.number = 1;
  client.emit('init', 1);
  // client.emit('perk', perks())
  // const clients = io.sockets.adapter.rooms[roomName].sockets;   

    console.log("users", users)
    client.emit('newUser', users)
    client.broadcast.to(roomName).emit('newUser', users)


}

function removeCardHandle(data, text){
  client.emit('removeCard', data)
  client.broadcast.to(data[1]).emit('removeCard', data, text)
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
function countFlagsData(data){
  let userCount = 0
  let gameuser = []
  const room = io.sockets.adapter.rooms[data[1]];
  if(room){
  let players = Object.keys(room.sockets).length
  let flags =  data[0]
  console.log("flagdata", room)
console.log("flagusers", data[1], data[0])
  if (players == flags && players > 1){
  console.log("match")
  let userobj = Object.values(users)
  console.log("userobj", userobj)
  for ( i = 0; i < userobj.length; i++){
    if (userobj[i].gameCode ===  data[1] || userobj[i].code ===  data[1]){
      // userCount++
      // console.log("countTimes", userCount)
      gameuser.push(userobj[i])
  }
}
console.log(gameuser.length, data[0])
let s = ss(gameuser.length)
let startv
if (s == null){
  console.log(prev)
  startv = prev
}else{
  console.log(s)
    startv = s
}

startv--
    console.log("astartv", startv)
    console.log("gameuser", gameuser[startv].socketId, gameuser[startv] )
    io.to(gameuser[startv].socketId).emit('startVote');
// userCount = 0
gameuser = ""
}else{
  console.log("Try again")
}

  }

}

function newUserHandle(username){
  console.log("usernamevv1", username)
users[client.id] = username 

console.log("usernamez1", username.username.name)
client.emit('userEmit', username, client.id)

}

function newJoinFlagDataHandle(cards){
  console.log("newJoinFlagDataHandle", cards)
}

function newJoinFlagHandle(){
  console.log("newJoinFlagHandle", flagState)
console.log('call')
codeStr = flagState
console.log("codeStr", flagState)
    if(flagState[0] != null){

      client.emit('subFlagData', flagState)
    }else if (flagState != null){
      // codeStr = String(flagState.room[0].code[0].code.code)
      console.log("flagState != null")
      // client.emit('subFlagData', flagState)
    }
}
      // client.emit('newFlagData', );

  //   let flagq =  flagState
  //   console.log("flagState1", flagq)
  //   client.emit('newFlagData', flagq);
  //   // io.to(flagq.room[0].code).emit('subFlagData', flagq);
  // }else{
  //   client.emit('newFlagData');
  // }


function FlagCardsHandle(data){
  console.log("subFlagDataHDCH", data)
  if (data != null){
      let code = data.room[0]
      let cards = data.room[1]
      let user = data.room[2]
      let socketId = data.room[3]
// push data to global list 
    flagState.push({room:[{code},{cards},{user},{socketId}]})
    console.log("flagStatepush",  flagState)
    codeStr = String(Object.values(code))
    console.log("codeStr", codeStr)
    client.emit('subFlagData', {room:[{code:[{code},{cards},{user}, {socketId}]}]})
    client.broadcast.to(codeStr).emit('subFlagData', {room:[{code:[{code},{cards},{user},{socketId}]}]})
}
}
// function subFlagCardHandle(data){
//   console.log("subFlagDataSFCH", data)
//     if (data != null){
//       let code = data.room.code
//         let cards = data.room.cards
  
//       flagState.push({room:[{code:[{code},{cards}]}]})
//       console.log("flagStatezz", flagState)
//       // client.emit('subFlagData', flagState)
//   }else{
//     console.log('data === null')
//   }
// }
  function handleUnknown(){
    client.emit('unknownData', {data: "True"});
  }
  function handleFlag(data){
    if (data != null){
console.log('flagdatabkend', data)
client.emit('flagData', data);
  }
}

function handlePerks(){
  let data = jsonData;
    var randIn = Math.floor(Math.random() * (data.perks.length));
    var randIn2 = Math.floor(Math.random() * (data.perks.length));
    var perkData1 = (data.perks[randIn].card);
    var perkData2 = (data.perks[randIn2].card);
    var perks = [perkData1, perkData2];
    console.log(perks)
    pp = perks;
    return perks;
  // function perks(){
    
  // }
  // let pp = perks();
  // pperkss = pp;
  // 
  // return pp

 }

 function newPerksHandle(){
   console.log('here22')
  handlePerks()
  console.log('pp33', pp)
  client.broadcast.emit('newPerks', pp);
  client.emit('newPerks', pp);
}
function newpperksHandle(data){
console.log("dataNPH", data)
}

function pperksHandle(data){
  console.log("pp", pp)
console.log('is here after press new game/', data)
pperkss = pp
}

 function perksHandle(){
console.log('pperkss', pp)
client.emit('ppperks', pp)

 }
let playerdc;
 function playerData(displayUser){
   
   playerdc = displayUser
// client.emit('userLeft', displayUser);
  // client.broadcast.to(codez).emit('userLeft', displayUser);
   console.log('called playerDC', playerdc)
   return playerdc;
 }

function playerDis(data, code){
client.emit("playerdc". data)
client.broadcast.to(code).emit('playerdc', data)
} 
 client.on('disconnect', ()=>{

  console.log('disconnect', String(Object.keys(users)))   
let name = Object.values(users)
console.log("name", name.length, name)
// let res = name.includes(n => n === )
delete users[client.id]
console.log("be4flagState", flagState)
if (flagState[0] != null){

let ff = [flagState].filter(f => f[0].room[3].socketId.socketId != client.id)
flagState = ff
}

client.emit('removeCard')
// console.log("res", res)
console.log("usersdc", users)
console.log("flagStatedc", flagState)
// client.emit("playerDis", )
  })
});


server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
})
