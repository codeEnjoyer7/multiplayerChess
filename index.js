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
    const roomId = nanoid(6);
    socket.join(roomId);

    roomsData.set(roomId, {
      creatorId: arg
    });

    console.log(roomId);
    socket.emit('returnRoomId', roomId);

  });

  socket.on("JoinRoom", (arg, callback) => {
    console.log("TEST!");
    console.log(arg);
    socket.join(arg.roomId);
    const data = roomsData.get(arg.roomId);
    data.joinerId = arg;

    console.log(`Room ${'test_room'} Creator:`, data.creatorId);
    console.log(`Room ${'test_room'} Joiner:`, data.joinerId);
  });

});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});