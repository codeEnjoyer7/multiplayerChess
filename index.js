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
      }

      class Queen{
            constructor(team, tile){
                this.team=team;
                this.tile=tile;
                this.symbol="Q"
            }
        }

    class Bishop{
        constructor(team, tile){
            this.team=team;
            this.tile=tile;
            this.symbol="B"
        }

        getMoves(board){
                let availableMoves=[]
                let possibleTile=this.tile;
                while(possibleTile%8!=0){
                    if(board[possibleTile-9]==null){
                        availableMoves.push(possibleTile-9);
                        possibleTile-=9;
                    }
                    else if(board[possibleTile-9].team!=this.team){
                      availableMoves.push(possibleTile-9);
                      break;
                    }
                    else{
                        break;
                    }
                }
                possibleTile=this.tile;
                while((possibleTile+9)%8!=0){
                    if(board[possibleTile+9]==null){
                        availableMoves.push(possibleTile+9);
                        possibleTile+=9;
                    }
                    else if(board[possibleTile+9].team!=this.team){
                      availableMoves.push(possibleTile+9);
                      break;
                    }
                    else{
                        break;
                    }
                }
                possibleTile=this.tile;
                while((possibleTile-7)%8!=0){
                    if(board[possibleTile-7]==null){
                        availableMoves.push(possibleTile-7);
                        possibleTile-=7;
                    }
                    else if(board[possibleTile-7].team!=this.team){
                      availableMoves.push(possibleTile-7);
                      break;
                    }
                    else{
                        break;
                    }
                }
                possibleTile=this.tile;
                while((possibleTile+7)%8!=7){
                    if(board[possibleTile+7]==null){
                        availableMoves.push(possibleTile+7);
                        possibleTile+=7;
                    }
                    else if(board[possibleTile+7].team!=this.team){
                      availableMoves.push(possibleTile+7);
                      break;
                    }
                    else{
                        break;
                    }
                }

                return availableMoves;
            }

    }

    class Knight{
      constructor(team, tile){
        this.team=team;
        this.tile=tile;
        this.symbol="N"
      }

      getMoves(board){
                let availableMoves=[];
                console.log(this.tile);
                const offsets =[
                    {offset: 15, colDifference:-1}, {offset: -15, colDifference:1},
                    {offset: 17, colDifference:1}, {offset: -17, colDifference:-1},
                    {offset: 6, colDifference:-2}, {offset: -6, colDifference:2},
                    {offset: 10, colDifference:2}, {offset: -10, colDifference:-2}
                ]
                for(let i=0; i<offsets.length; i++){
                    if(board[this.tile+offsets[i].offset]==null || board[this.tile+offsets[i].offset].team!=this.team){
                        if((this.tile+offsets[i].offset)%8-this.tile%8==offsets[i].colDifference){
                          availableMoves.push(this.tile+offsets[i].offset)  
                        }
                    }
                }
                console.log(availableMoves);
                return availableMoves;
            }
    }

    class Rook{
        constructor(team, tile,){
            this.team=team;
            this.tile=tile;
            this.symbol="R"
        }

        getMoves(board){
                let availableMoves=[];
                let possibleTile=this.tile;
                while(Math.floor((possibleTile)/8)!=0){
                    if(board[possibleTile-8]==null){
                        availableMoves.push(possibleTile-8)
                        possibleTile-=8;
                    }
                    else if(board[possibleTile-8].team!=this.team){
                        availableMoves.push(possibleTile-8);
                        break;
                    }
                    else{
                        break;
                    }
                    console.log("availableMoves", availableMoves);
                    console.log("this tile:", this.tile);
                }
                possibleTile=this.tile;
                while(Math.floor((possibleTile)/8)!=7){
                    if(board[possibleTile+8]==null){
                        availableMoves.push(possibleTile+8)
                        possibleTile+=8;
                    }
                    else if(board[possibleTile+8].team!=this.team){
                        availableMoves.push(possibleTile+8);
                        break;
                    }
                    else{
                        break;
                    }
                }
                possibleTile=this.tile;
                while(possibleTile%8!=0){
                    if(board[possibleTile-1]==null){
                        availableMoves.push(possibleTile-1)
                        possibleTile-=1;
                    }
                    else if(board[possibleTile-1].team!=this.team){
                        availableMoves.push(possibleTile-1);
                        break;
                    }
                    else{
                        break;
                    }
                }
                possibleTile=this.tile;
                while(possibleTile%8!=7){
                    if(board[possibleTile+1]==null || board[possibleTile+1].team!=this.team){
                        availableMoves.push(possibleTile+1)
                        possibleTile+=1;
                    }
                    else if(board[possibleTile+1].team!=this.team){
                        availableMoves.push(possibleTile+1);
                        break;
                    }
                    else{
                        break;
                    }
                }
                return availableMoves;
            }

    }


    class Pawn{
        constructor(team, tile){
            this.team=team;
            this.tile=tile;
            this.symbol="P";
            this.hasMoved=false;
        }

        getMoves(board){
          let availableMoves=[]
          console.log("row: ",Math.floor(this.tile/8));
          if(this.team==1){
            if(board[this.tile-8]==null){
              availableMoves.push(this.tile-8)
              if(board[this.tile-16]==null && Math.floor(this.tile/8)==6){
                availableMoves.push(this.tile-16)
              }
            }

            if(board[this.tile-7]!=null && board[this.tile-7].team!=this.team){
                    availableMoves.push(this.tile-7)
            }
            if(board[this.tile-9]!=null && board[this.tile-9].team!=this.team){
              availableMoves.push(this.tile-9)
            }
          }
          else{
            if(board[this.tile+8]==null){
              availableMoves.push(this.tile+8)
              if(board[this.tile+16]==null && Math.floor(this.tile /8)==1){
                availableMoves.push(this.tile+16)
              }
            }
            if(board[this.tile+7]!=null && board[this.tile+7].team!=this.team){
              availableMoves.push(this.tile+7)
            }
            if(board[this.tile+9]!=null && board[this.tile+9].team!=this.team){
              availableMoves.push(this.tile+9)
            }
          }
          return availableMoves;
        }
    }

  function boardToString(roomId) {
    let data = roomsData.get(roomId);
    let board = data.board;
    let stringBoard = "";
    let emptySquares = 0;

    for (let tile = 0; tile < 64; tile++) {
      let piece = board[tile];
      if (piece == null) {
        emptySquares++;
      } else {
      if (emptySquares > 0) {
        stringBoard += emptySquares;
        emptySquares = 0;
      }
      stringBoard += (piece.team === 1) ? piece.symbol.toUpperCase() : piece.symbol.toLowerCase();
    }
    if ((tile + 1) % 8 === 0) {
      if (emptySquares > 0) {
        stringBoard += emptySquares;
        emptySquares = 0;
      }
      if (tile < 63) stringBoard += "/";
    }
  }

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
        currentTurn: 0,
        board: data.board
      });

      data = roomsData.get(arg.roomId);
      //server-side game logic goes below here?
      let stringBoard=boardToString(arg.roomId);
      console.log(stringBoard);
      console.log(data.isCreatorFirst);
      if(data.isCreatorFirst==0){
        io.to(data.creatorId).emit("ReturnBoard", {room: arg.roomId,team: 1, currentTurn: data.currentTurn, stringBoard: stringBoard});
        io.to(data.joinerId).emit("ReturnBoard", {room: arg.roomId,team: 2, currentTurn: data.currentTurn, stringBoard: stringBoard});
      }
      else if(data.isCreatorFirst==1){
        io.to(data.creatorId).emit("ReturnBoard", {room: arg.roomId, team: 2, currentTurn: data.currentTurn, stringBoard: stringBoard});
        io.to(data.joinerId).emit("ReturnBoard", {room: arg.roomId, team: 1, currentTurn: data.currentTurn, stringBoard: stringBoard});
      }

      socket.emit('returnJoinResult', true);
    }
    else{
      socket.emit('returnJoinResult', false);
    }
  });

  socket.on("requestMove", (arg, callback) =>{
    let data = roomsData.get(arg.roomId);
    console.log("MOVE REQUESTED");
    console.log("available moves", data.board[arg.fromTile].getMoves(data.board));
    if(data.board[arg.fromTile]!=null && data.board[arg.fromTile].getMoves(data.board).includes(arg.toTile)){ //if it is a valid move
      if(socket.id == data.creatorId && ((data.isCreatorFirst==0 && data.currentTurn%2==0) || (data.isCreatorFirst==1 && data.currentTurn%2==1))){//if its whites turn and they sent a request
        console.log("CREATOR REQUEST VALID")
        data.currentTurn+=1;
        data.board[arg.fromTile].tile=arg.toTile;
        data.board[arg.toTile]=data.board[arg.fromTile];
        data.board[arg.fromTile]=null;
        let stringBoard=boardToString(arg.roomId);
        if(data.isCreatorFirst==0){
          io.to(data.creatorId).emit("ReturnBoard", {room: arg.roomId, team: 1, currentTurn: data.currentTurn, stringBoard: stringBoard});
          io.to(data.joinerId).emit("ReturnBoard", {room: arg.roomId, team: 2, currentTurn: data.currentTurn, stringBoard: stringBoard});
        }
        else{
            io.to(data.creatorId).emit("ReturnBoard", {room: arg.roomId,team: 2, currentTurn: data.currentTurn, stringBoard: stringBoard});
          io.to(data.joinerId).emit("ReturnBoard", {room: arg.roomId,team: 1, currentTurn: data.currentTurn, stringBoard: stringBoard});
        }
      }
      else if(socket.id == data.joinerId && ((data.isCreatorFirst==1 && data.currentTurn%2==0) ||(data.isCreatorFirst==0 && data.currentTurn%2==1))){//if its blacks turn and they sent a request
        console.log("JOINER REQUEST VALID")
        data.currentTurn+=1;
        data.board[arg.fromTile].tile=arg.toTile;
        data.board[arg.toTile]=data.board[arg.fromTile];
        data.board[arg.fromTile]=null;
        stringBoard=boardToString(arg.roomId);
        console.log("new board: ", stringBoard);
        if(data.isCreatorFirst==0){
          io.to(data.creatorId).emit("ReturnBoard", {room: arg.roomId, team: 1, currentTurn: data.currentTurn, stringBoard: stringBoard});
          io.to(data.joinerId).emit("ReturnBoard", {room: arg.roomId, team: 2, currentTurn: data.currentTurn, stringBoard: stringBoard});
        }
        else{
            io.to(data.creatorId).emit("ReturnBoard", {room: arg.roomId,team: 2, currentTurn: data.currentTurn, stringBoard: stringBoard});
          io.to(data.joinerId).emit("ReturnBoard", {room: arg.roomId,team: 1, currentTurn: data.currentTurn, stringBoard: stringBoard});
        }
      }
    }
  });

});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});