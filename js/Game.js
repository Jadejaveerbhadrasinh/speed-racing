class Game {
  constructor() 
  {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
  }

  updateState(state)// this funtion writes gamestate value into the database
  {
   db.ref("/").update({gameState: state});
  }

  getState()//this function reads game state value from the database   
  {
    var gameStateRef = db.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  start() 
  {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width/2-100,height-100);
    car1.addImage("car1",car1_img);
    car1.scale = 0.07;
    
    car2 = createSprite(width/2+100,height-100);
    car2.addImage("car2",car2_img);
    car2.scale = 0.07;

    cars = [car1,car2];

    fuels = new Group();
    powerCoins = new Group();
    obstacles = new Group();

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
      { x: width / 2, y: height - 5300, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
    ];

    this.addSprites(fuels,4,fuelImage,0.02);
    this.addSprites(powerCoins,18,powerCoinImage,0.09);
    this.addSprites(obstacles,obstaclesPositions.length,obstacle1Image,0.04,obstaclesPositions);

  }

  addSprites(spriteGroup,numberofSprites,spriteImage,scale,positions = [])
  {
    for (var i = 0; i < numberofSprites; i++)
    {
      var x, y;

      if(positions.length > 0)
      {
        x = positions[i].x;
        y = positions[i].y;
        spriteImage  = positions[i].image;
      }
      else
      {
        x =random(width / 2 + 150,width / 2 -150);
        y = random(-height *4.5,height -400);

        var sprite = createSprite(x,y);
        sprite.addImage("sprite",spriteImage);
        sprite.scale = scale;
        spriteGroup.add(sprite);
      }

    }
  }

  handleElements() 
  {
    form.hideForm();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200,40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230,100);

    this.leadeboardTitle.html("leaderboard");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 -60,40);

    this.leader1.class("leadersText");
    this.leader1.position(width/3-50,80);

    this.leader2.class("leadersText");
    this.leader2.position(width/3-50,130);
  }

  play()//this funtion gets call when the gamestate value becomes 1


{
 
  this.handleResetButton();

    this.handleElements();
    Player.getPlayersInfo();
    if(allPlayers !== undefined)
    {
      image(track,0,-height*5,width,height*6);
      this.showLeaderboard();
      var index = 0;
      for(var plr in allPlayers)
      {
        index = index+1;

        var x = allPlayers[plr].positionX;
        var y = height-allPlayers[plr].positionY;

        cars[index-1].position.x = x;
        cars[index-1].position.y = y;

        if(index === player.index)
        {
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);

          this.handleFuel(index);
          this.handlePowerCoins(index);

          camera.position.x = cars[index-1].position.x;
          camera.position.y = cars[index-1].position.y;
        }
      }

      this.handlePlayerControls();
      drawSprites();
    }
  }
  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;    This tag is used for displaying four spaces.
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  handleResetButton()
  {
    this.resetButton.mousePressed(()=>
    {
      db.ref("/").set({playerCount: 0 , gameState:0, players:{} });
      window.location.reload();
    })
  }

handlePlayerControls()
{
  if(keyIsDown(UP_ARROW))
  {
    player.positionY = player.positionY + 10;
    player.updatePlayerPosition();
  }

  if(keyIsDown(LEFT_ARROW) && player.positiionX > width/3 -50);
  {
    player.positionX = player.positionX -5;
    player.updatePlayerPosition();
  }
  
  if(keyIsDown(RIGHT_ARROW) && player.positiionX < width/2 + 250);
  {
    player.positionX = player.positionX +5;
    player.updatePlayerPosition();
  }
}

handleFuel(index)
{
  cars[index - 1].overlap(fuels,function(collector,collected)
  {
    player.fuel = 185;
    collected.remove();
  });
}
  
handlePowerCoins(index)
{
  cars[index - 1].overlap(powerCoins,function(collector,collected)
    {
      player.score = player.score + 21;
      player.updatePlayerPosition();
      collected.remove();

    });
}
  }