// const io = require('socket.io')();
const { makeid } = require('./utils');


const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/frontend/');

let jsonData = require(path.join(__dirname, '/frontend/perks.json'));

console.log(jsonData);
const port = process.env.PORT || 3000
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

let pp

const state = {};
const clientRooms = {};
app.use(express.static(publicPath));
io.on('connection', client => {

console.log("connected")
  // client.on('keydown', handleKeydown);
  client.on('newGame', handleNewGame);
  client.on('joinGame', handleJoinGame);
  client.on('pperks', pperksHandle);
  client.on('newpperks', newpperksHandle);
  client.on('perks', perksHandle);
  client.on('newPerks', newPerksHandle);
  client.on('flag', handleFlag);
  client.on('unknown', handleUnknown);

  function handleUnknown(){
    client.emit('unknownData', {data: "True"});
  }
  function handleFlag(data){
console.log('flagdatabkend', data)
client.emit('flagData', data);
  }

  let pperkss;
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
console.log("data", data)
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
  function handleJoinGame(roomName) {
    const room = io.sockets.adapter.rooms[roomName];

    let allUsers;
    if (room) {
      allUsers = room.sockets;
    }

    let numClients = 0;
    if (allUsers) {
      console.log("users", Object.keys(allUsers).length)
      numClients = Object.keys(allUsers).length;
    }

    if (numClients === 0) {
      client.emit('unknownCode');
      return;
    } else if (numClients > 4) {
      client.emit('tooManyPlayers');
      return;
    }

    clientRooms[client.id] = roomName;

    client.join(roomName);
    client.number = 2;
    client.emit('init', 2);

    //  handlePerks()

    // io.sockets.in(roomName).emit('handlePerks',  handlePerks());
  }


  function handleNewGame() {
    


    var length = 6;
    let roomName = makeid(length);
    clientRooms[client.id] = roomName;
    client.emit('gameCode', roomName);

    client.join(roomName);

    client.number = 1;
    client.emit('init', 1);
    // client.emit('perk', perks())
    handlePerks()
    console.log("pp", pp)
     
  // io.sockets.in(roomName).emit('perks', pp);
  client.emit('perks', pp);
  }



  // function handleKeydown(keyCode) {
  //   // const roomName = clientRooms[client.id];
  //   // if (!roomName) {
  //   //   return;
  //   // }
  //   // try {
  //   //   keyCode = parseInt(keyCode);
  //   // } catch(e) {
  //   //   console.error(e);
  //   //   return;
  //   // }
  //   //
  //   // const vel = getUpdatedVelocity(keyCode);
  //   //
  //   // if (vel) {
  //   //   state[roomName].players[client.number - 1].vel = vel;
  //   // }
  // }
});

// function startGameInterval(roomName) {
//   const intervalId = setInterval(() => {
//     const winner = gameLoop(state[roomName]);

//     if (!winner) {
//       emitGameState(roomName, state[roomName])
//     } else {
//       emitGameOver(roomName, winner);
//       state[roomName] = null;
//       clearInterval(intervalId);
//     }
//   }, 1000 / FRAME_RATE);
// }

// function emitGameState(room, gameState) {
//   // Send this event to everyone in the room.
//   io.sockets.in(room)
//     .emit('gameState', JSON.stringify(gameState));
// }

// function emitGameOver(room, winner) {
//   io.sockets.in(room)
//     .emit('gameOver', JSON.stringify({ winner }));
// }

server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
})
