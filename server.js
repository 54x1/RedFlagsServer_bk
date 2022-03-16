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
let flagState;
let pperkss;
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
client.on('subFlagCard', subFlagCardHandle)
client.on('joinFlags', subFlagCardHandle)
client.on('newJoinFlag', newJoinFlagHandle)


function handleJoinGame(roomName) {
  const room = io.sockets.adapter.rooms[roomName];

  let allUsers;
  if (room) {
    allUsers = room.sockets;
    console.log("allUsers", allUsers)
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
  
  flagState = ""

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
io.in(roomName).clients((err , clients) => {
  console.log("clients", clients);
  // clients will be array of socket ids , currently available in given room
});

}


function newJoinFlagHandle(){
  if(flagState != null || flagState != ""){
    let flagq =  flagState
    console.log("flagState1", flagq)
    client.emit('newFlagData', flagq);
    // io.to(flagq.room[0].code).emit('subFlagData', flagq);
  }else{
    client.emit('newFlagData');
  }
}
function subFlagCardHandle(data){
  if (data != null){
    flagState = []
  console.log("subFlagData", data.room[1])
    let code = data.room[0]
    let cards = data.room[1]
  flagState.push({room:[{code},{cards}]})
  console.log("flagState2", flagState)
client.emit('subFlagData', data.room[1]);
  client.broadcast.to(data.room[0]).emit('subFlagData', data.room[1]);
  io.to(data.room[0]).emit('subFlagData', data.room[1]);

  }else{
    console.log('data === null')
  }
}
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
 client.on('disconnect', ()=>{
  console.log('disconnect', client.id)
  // flagState = ""

  console.log('disconnect2', io.sockets.adapter.rooms[client.id])
  })

});


server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
})
