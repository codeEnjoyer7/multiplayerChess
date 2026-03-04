let c = document.getElementById("chessBoard")
let ctx = c.getContext("2d");
const sprites = new Image();
sprites.src="betterSpriteSheet.png"

sprites.onload = function() {

    class King{
        constructor(team, r, c){
            this.team=team;
            this.r=r;
            this.c=c;
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
            constructor(team, r, c){
                this.team=team;
                this.r=r;
                this.c=c;
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


    let board=[
        [new Rook(2,0,0), new Knight(2,0,1), new Bishop(2,0,2), new Queen(2,0,3), new King(2,0,4), new Bishop(2,0,5), new Knight(2,0,6), new Rook(2,0,7)],
        [new Pawn(2,1,0), new Pawn(2,1,1), new Pawn(2,1,2), new Pawn(2,1,3), new Pawn(2,1,4),new Pawn(2,1,5), new Pawn(2,1,6), new Pawn(2,1,7),],
        [],
        [],
        [],
        [],
        [new Pawn(1,6,0), new Pawn(1,6,1), new Pawn(1,6,2), new Pawn(1,6,3), new Pawn(1,6,4),new Pawn(1,6,5), new Pawn(1,6,6), new Pawn(1,6,7)],
        [new Rook(1,7,0), new Knight(1,7,1), new Bishop(1,7,2), new Queen(1,7,3), new King(1,7,4), new Bishop(1,7,5), new Knight(1,7,6), new Rook(1,7,7)]
    ];

    for(let r=0; r<8; r=r+1){
        for(let c=0; c<8; c=c+1){
            if(r%2==0 && c%2==1 || r%2==1 && c%2==0){
                ctx.fillStyle="rgb(118,150,86)"
            }
            else{
            ctx.fillStyle="rgb(238,238,210)" 
            }
            ctx.fillRect(c*64,r*64,64,64);
            console.log(board[r][c]);
            if(board[r][c]!=null){
                board[r][c].drawSelf();
            }
            console.log(r);
        }
    }
}