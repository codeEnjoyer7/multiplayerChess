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

  socket.on("CreateRoom", (arg, callback) => {
    const roomId = nanoid(6);
    socket.join(roomId);

    roomsData.set(roomId, {
      creatorId: arg
    });

    socket.emit('returnRoomId', roomId);

  });

  socket.on("JoinRoom", (arg, callback) => {
    if(io.sockets.adapter.rooms.has(arg.roomId)){

      let data = roomsData.get(arg.roomId);
      roomsData.set(arg.roomId, {
        creatorId: data.creatorId,
        joinerId: arg.joinerId
      });

      data = roomsData.get(arg.roomId);
      //server-side game logic goes below here?

      class King{
        constructor(team, tile){
            this.team=team;
            this.tile=tile;
            this.symbol="k"
        }
        getTeam(){
          return this.team;
        }
      }

      class Queen{
            constructor(team, tile){
                this.team=team;
                this.tile=tile;
                this.symbol="q"
            }
        getTeam(){
          return this.team;
        }
        }

    class Bishop{
        constructor(team, tile){
            this.team=team;
            this.tile=tile;
            this.symbol="b"
        }
        getTeam(){
          return this.team;
        }
    }

    class Knight{
        constructor(team, tile){
            this.team=team;
            this.tile=tile;
            this.symbol="n"
        }
        getTeam(){
          return this.team;
        }
    }

    class Rook{
        constructor(team, tile,){
            this.team=team;
            this.tile=tile;
            this.symbol="r"
        }
        getTeam(){
          return this.team;
        }
    }


    class Pawn{
        constructor(team, tile){
            this.team=team;
            this.tile=tile;
            this.symbol="p";
        }

        getTeam(){
          return this.team;
        }
    }

      let doesCreatorGoFirst = Math.floor(Math.random() * 2);
      let board=[new Rook(2,0,0), new Knight(2,0,1), new Bishop(2,0,2), new Queen(2,0,3), new King(2,0,4), new Bishop(2,0,5), new Knight(2,0,6), new Rook(2,0,7), new Pawn(2,1,0), new Pawn(2,1,1), new Pawn(2,1,2), new Pawn(2,1,3), new Pawn(2,1,4),new Pawn(2,1,5), new Pawn(2,1,6), new Pawn(2,1,7), null,null,null,null,null,null,null,null, null,null,null,null,null,null,null,null, null,null,null,null,null,null,null,null, null,null,null,null,null,null,null,null, new Pawn(1,6,0), new Pawn(1,6,1), new Pawn(1,6,2), new Pawn(1,6,3), new Pawn(1,6,4),new Pawn(1,6,5), new Pawn(1,6,6), new Pawn(1,6,7), new Rook(1,7,0), new Knight(1,7,1), new Bishop(1,7,2), new Queen(1,7,3), new King(1,7,4), new Bishop(1,7,5), new Knight(1,7,6), new Rook(1,7,7)];

      let stringBoard ="";
      let emptySquares=0;
      for(let tile=0; tile<64; tile++){
        if(board[tile]==null){
          emptySquares+=1;
          if(emptySquares==8){
              stringBoard+=emptySquares;
              emptySquares=0;
          }
        }
          
        else if(board[tile]!=null){
          if(emptySquares>0){
            stringBoard=stringBoard+emptySquares
            emptySquares=0;
          }

          if(board[tile].getTeam()==1){
            stringBoard+=board[tile].symbol;
          }
          else if(board[tile].getTeam()==2){
            stringBoard+=board[tile].symbol.toUpperCase();
          }

        }
        if((tile+1)%8==0){
          stringBoard+="/"
        }
      }
      stringBoard=stringBoard.slice(0,-1);
      //console.log(arg);
      
      if(doesCreatorGoFirst==1){
        io.to(data.creatorId).emit("ReturnBoard", {room: arg.roomId,team: 1, isMyTurn: true, stringBoard: stringBoard});
        io.to(data.joinerId).emit("ReturnBoard", {room: arg.roomId,team: 2, isMyTurn: false, stringBoard: stringBoard});
      }
      else if(doesCreatorGoFirst==0){
        io.to(data.creatorId).emit("ReturnBoard", {room: arg.roomId, team: 2, isMyTurn: false, stringBoard: stringBoard});
        io.to(data.joinerId).emit("ReturnBoard", {room: arg.roomId, team: 1, isMyTurn: true, stringBoard: stringBoard});
      }

      socket.emit('returnJoinResult', true);
    }
    else{
      socket.emit('returnJoinResult', false);
    }
  });

  socket.on("requestMove", (arg, callback) =>{
    console.log(arg);
  });

});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});