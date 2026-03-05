const express = require('express');
const path = require('path');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const { nanoid } = require('nanoid');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const roomsData = new Map();

io.on('connection', (socket) => {
  //socket.join("testRoom");
  console.log(socket.rooms);

  socket.on("CreateRoom", (arg, callback) => {
    console.log(arg);
    const roomId = nanoid(6);
    socket.join(roomId);

    roomsData.set(roomId, {
      creatorId: arg
    });

    //console.log(roomsData.get(roomId));
    socket.emit('returnRoomId', roomId);

  });

  socket.on("JoinRoom", (arg, callback) => {
    if(io.sockets.adapter.rooms.has(arg.roomId)){

      let data = roomsData.get(arg.roomId);
      roomsData.set(arg.roomId, {
        creatorId: data.creatorId,
        joinerId: arg.joinerId
      });

      console.log(roomsData.get(arg.roomId));
      data = roomsData.get(arg.roomId);

      let doesCreatorGoFirst = Math.floor(Math.random() * 2);
      //the code below for whether or not the creator goes first is basically pseudocode right now
      if(doesCreatorGoFirst==1){
        io.to(data.creatorId).emit("ReturnWhitePerspective");
        console.log("TEST");
        io.to(data.joinerId).emit("ReturnBlackPerspective");
      }
      else if(doesCreatorGoFirst==0){

        io.to(data.creatorId).emit("ReturnBlackPerspective");
        io.to(data.joinerId).emit("ReturnWhitePerspective");
      }

      socket.emit('returnJoinResult', true);
    }
    else{
      socket.emit('returnJoinResult', false);
    }
  });

});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});