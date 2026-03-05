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

      data = roomsData.get(arg.roomId);
      //server-side game logic goes below here?

      class King{
        constructor(team, r, c){
            this.team=team;
            this.r=r;
            this.c=c;
            this.symbol="k"
        }
        getTeam(){
          return this.team;
        }
        drawSelf(){
            if(this.team==1){
                ctx.drawImage(sprites,-5,-5,151,155,this.c*64,this.r*64,64,64); //white king
            }
            else if(this.team==2){
                ctx.drawImage(sprites,-5,161,151,155,this.c*64,this.r*64,64,64); //black king
            }
        }
      }

      class Queen{
            constructor(team, r, c,){
                this.team=team;
                this.r=r;
                this.c=c;
                this.symbol="q"
            }
        getTeam(){
          return this.team;
        }
            drawSelf(){
                if(this.team==1){
                    ctx.drawImage(sprites,161,-5,161,155,this.c*64,this.r*64,64,64); //white queen
                }
                else if(this.team==2){
                    ctx.drawImage(sprites,161,165,161,155,this.c*64,this.r*64,64,64); //black queen
                }
            }
        }

    class Bishop{
        constructor(team, r, c){
            this.team=team;
            this.r=r;
            this.c=c;
            this.symbol="b"
        }
        getTeam(){
          return this.team;
        }
        drawSelf(){
            if(this.team==1){
                ctx.drawImage(sprites,327,-5,161,155,this.c*64,this.r*64,64,64); //white bishop
            }
            else if(this.team==2){
                ctx.drawImage(sprites,327,165,161,155,this.c*64,this.r*64,64,64); //black bishop
            }
        }
    }

class Knight{
        constructor(team, r, c){
            this.team=team;
            this.r=r;
            this.c=c;
            this.symbol="n"
        }
        getTeam(){
          return this.team;
        }
        drawSelf(){
            if(this.team==1){
                ctx.drawImage(sprites,497,-5,161,155,this.c*64,this.r*64,64,64); //white pawn
            }
            else if(this.team==2){
                ctx.drawImage(sprites,497,165,161,155,this.c*64,this.r*64,64,64); //black pawn
            }
        }
    }

  class Rook{
        constructor(team, r, c){
            this.team=team;
            this.r=r;
            this.c=c;
            this.symbol="r"
        }
        getTeam(){
          return this.team;
        }
        drawSelf(){
            if(this.team==1){
                ctx.drawImage(sprites,669,-5,161,155,this.c*64,this.r*64,64,64); //white pawn
            }
            else if(this.team==2){
                ctx.drawImage(sprites,669,165,161,155,this.c*64,this.r*64,64,64); //black pawn
            }
        }
    }


    class Pawn{
        constructor(team, r, c){
            this.team=team;
            this.r=r;
            this.c=c;
            this.symbol="p";
        }

        getTeam(){
          return this.team;
        }

        drawSelf(){
            if(this.team==1){
                ctx.drawImage(sprites,837,-5,161,155,this.c*64,this.r*64,64,64); //white pawn
            }
            else if(this.team==2){
                ctx.drawImage(sprites,837,165,161,155,this.c*64,this.r*64,64,64); //black pawn
            }
        }
    }

      let doesCreatorGoFirst = Math.floor(Math.random() * 2);
      let board=[
        [new Rook(2,0,0), new Knight(2,0,1), new Bishop(2,0,2), new Queen(2,0,3), new King(2,0,4), new Bishop(2,0,5), new Knight(2,0,6), new Rook(2,0,7)],
        [new Pawn(2,1,0), new Pawn(2,1,1), new Pawn(2,1,2), new Pawn(2,1,3), new Pawn(2,1,4),new Pawn(2,1,5), new Pawn(2,1,6), new Pawn(2,1,7),],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [new Pawn(1,6,0), new Pawn(1,6,1), new Pawn(1,6,2), new Pawn(1,6,3), new Pawn(1,6,4),new Pawn(1,6,5), new Pawn(1,6,6), new Pawn(1,6,7)],
        [new Rook(1,7,0), new Knight(1,7,1), new Bishop(1,7,2), new Queen(1,7,3), new King(1,7,4), new Bishop(1,7,5), new Knight(1,7,6), new Rook(1,7,7)]
      ];

      let stringBoard ="";
      for(let r=0; r<8; r++){
        let emptySquares=0;
        for(let c=0; c<8; c++){
         // console.log(board[r][c]);
         // console.log(emptySquares);
          if(board[r][c]==null){
            emptySquares+=1;
            if(emptySquares==8){
              stringBoard+=emptySquares;
            }
          }
          
          else if(board[r][c]!=null){
            if(emptySquares>0){
              stringBoard=stringBoard+emptySquares
              emptySquares=0;
            }

            if(board[r][c].getTeam()==1){
              stringBoard+=board[r][c].symbol;
            }
            else if(board[r][c].getTeam()==2){
              stringBoard+=board[r][c].symbol.toUpperCase();
            }
          }

        }
        stringBoard+="/"
      }
      stringBoard=stringBoard.slice(0,-1);
      console.log(stringBoard);

      if(doesCreatorGoFirst==1){
        io.to(data.creatorId).emit("ReturnBoard", 1, stringBoard);
        io.to(data.joinerId).emit("ReturnBoard", 2, stringBoard);
      }
      else if(doesCreatorGoFirst==0){

        io.to(data.creatorId).emit("ReturnBoard", 2, stringBoard);
        io.to(data.joinerId).emit("ReturnBoard", 1, stringBoard);
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