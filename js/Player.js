class Player
 {

  constructor()
  {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0;
    this.score = 0;
    this.fuel = 185;

  }



  addPlayer()// this function writes the players info into the database
  {
    var playerIndex = "players/player" + this.index;

    if (this.index === 1) 
    {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    db.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY
    });
  }

  getCount()//this fumction reads player count value from the database
   {
    var playerCountRef = db.ref("playerCount");
    playerCountRef.on("value",function(data) {
      playerCount = data.val();
    });
  }

  updateCount(count)//this funtion writes player count value into the database
  {
    db.ref("/").update({playerCount: count});
  }

  static getPlayersInfo() // this funtion reads all the players info from the databse 
  {
   var playerInfoRef = db.ref("players");
   playerInfoRef.on("value",function(data)
   {
    allPlayers = data.val();
   });
  }
 

 updatePlayerPosition()
 {
   var playerIndex = "players/player"+ this.index;
   db.ref(playerIndex).update({
     positionX: this.positionX,
     positionY: this.positionY,
     rank: this.rank,
     score: this.score
   });
 }

 getdistance()// this function reads the posx and posy of the player from the database
 {
   var playerDistanceRef = db.ref("players/player"+ this.index);
   playerDistanceRef.on("value", data => {
     var data =  data.val();
     this.positionX = data.positionX;
     this.positionY = data.positionY;
   });
 }
}