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

      class King{
        constructor(team, tile){
            this.team=team;
            this.tile=tile;
            this.symbol="K"
        }
        getTeam(){
          return this.team;
        }
      }

      class Queen{
            constructor(team, tile){
                this.team=team;
                this.tile=tile;
                this.symbol="Q"
            }
        getTeam(){
          return this.team;
        }
        }

    class Bishop{
        constructor(team, tile){
            this.team=team;
            this.tile=tile;
            this.symbol="B"
        }
        getTeam(){
          return this.team;
        }
    }

    class Knight{
        constructor(team, tile){
            this.team=team;
            this.tile=tile;
            this.symbol="N"
        }
        getTeam(){
          return this.team;
        }
    }

    class Rook{
        constructor(team, tile,){
            this.team=team;
            this.tile=tile;
            this.symbol="R"
        }
        getTeam(){
          return this.team;
        }
    }


    class Pawn{
        constructor(team, tile){
            this.team=team;
            this.tile=tile;
            this.symbol="P";
            this.hasMoved=false;
        }

        getTeam(){
          return this.team;
        }

        getMoves(board){
          let availableMoves=[]
          if(board[this.tile-8]==null){
            availableMoves.push(this.tile-8)
            if(board[this.tile-16]==null && this.hasMoved==false){
              availableMoves.push(this.tile-16)
            }
          }
          return availableMoves;
        }
    }

    function boardToString(roomId){
      let data = roomsData.get(roomId);
      let board=data.board;
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
            stringBoard+=board[tile].symbol.toLowerCase();
          }

        }
        if((tile+1)%8==0){
          stringBoard+="/"
        }
      }
        stringBoard=stringBoard.slice(0,-1);
        return stringBoard;
    }

io.on('connection', (socket) => {

  socket.on("CreateRoom", (arg, callback) => {
    const roomId = nanoid(6);
    socket.join(roomId);
    let isCreatorFirst = Math.floor(Math.random() * 2);
    roomsData.set(roomId, {
      creatorId: arg,
      isCreatorFirst : isCreatorFirst,
      board : [new Rook(2,0), new Knight(2,1), new Bishop(2,2), new Queen(2,3), new King(2,4), new Bishop(2,5), new Knight(2,6), new Rook(2,7), new Pawn(2,8), new Pawn(2,9), new Pawn(2,10), new Pawn(2,11), new Pawn(2,12),new Pawn(2,13), new Pawn(2,14), new Pawn(2,15), null,null,null,null,null,null,null,null, null,null,null,null,null,null,null,null, null,null,null,null,null,null,null,null, null,null,null,null,null,null,null,null, new Pawn(1,48), new Pawn(1,49), new Pawn(1,50), new Pawn(1,51), new Pawn(1,52),new Pawn(1,53), new Pawn(1,54), new Pawn(1,55), new Rook(1,56), new Knight(1,57), new Bishop(1,58), new Queen(1,59), new King(1,60), new Bishop(1,61), new Knight(1,62), new Rook(1,63)]
    });

    socket.emit('returnRoomId', roomId);

  });

  socket.on("JoinRoom", (arg, callback) => {
    if(io.sockets.adapter.rooms.has(arg.roomId)){

      let data = roomsData.get(arg.roomId);
      roomsData.set(arg.roomId, {
        creatorId: data.creatorId,
        joinerId: arg.joinerId,
        isCreatorFirst: data.isCreatorFirst,
        currentTurn: 1,
        board: data.board
      });

      data = roomsData.get(arg.roomId);
      //server-side game logic goes below here?

      let stringBoard=boardToString(arg.roomId);
      console.log(stringBoard);

      if(data.isCreatorFirst==1){
        io.to(data.creatorId).emit("ReturnBoard", {room: arg.roomId,team: 1, isMyTurn: true, stringBoard: stringBoard});
        io.to(data.joinerId).emit("ReturnBoard", {room: arg.roomId,team: 2, isMyTurn: false, stringBoard: stringBoard});
      }
      else if(data.isCreatorFirst==0){
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
    let data = roomsData.get(arg.roomId);
    if(data.board[arg.fromTile].getMoves(data.board).includes(arg.toTile)){ //if it is a valid move
      if(socket.id == data.creatorId && (data.isCreatorFirst && data.currentTurn%2==1) || (!data.isCreatorFirst && data.currentTurn%2==0)){//if its whites turn and they sent a request
        console.log("CREATOR REQUEST VALID")
      }
      else if(socket.id == data.joinerId && (data.isCreatorFirst && data.currentTurn%2==0) ||(!data.isCreatorFirst && data.currentTurn%2==1) ){//if its blacks turn and they sent a request
        console.log("JOINER REQUEST VALID")
      }
    }
  });

});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});