var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obsBottom1, obsBottom2, obsBottom3
var obsBottom;
var score= 0;
var gameOver,gameOverImg;
var restart, restartImg;
var PLAY= 1;
var END = 0;
var gameState= PLAY

function preload(){
bgImg = loadImage("assets/bg.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")
restartImg = loadImage("assets/restart.png")
gameOverImg = loadImage("assets/gameOver.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
}



function setup(){

//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

bottomObstaclesGroup= new Group()

gameOver= createSprite(200,200)
gameOver.addImage(gameOverImg)
gameOver.scale=0.25
gameOver.visible= false

restart= createSprite(200,240)
restart.addImage(restartImg)
restart.scale=0.25
restart.visible= false
}

function draw() {
  
  background("black");




        if(gameState===PLAY){
score=score+Math.round(getFrameRate()/60)
        
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;
   spawnObstacles()

   if(balloon.isTouching(bottomGround)|| bottomObstaclesGroup.isTouching(balloon)){
     gameState=END
   }
        }
        if(gameState===END){
          restart.visible= true
          gameOver.visible= true
          balloon.velocityX=0
          bottomObstaclesGroup.setVelocityXEach(0)
          bottomObstaclesGroup.setLifetimeEach(-1);
           balloon.y=200

           if(mousePressedOver(restart)){
             reset()
           }
        }
        drawSprites();
        text("Score: "+score,200,50)
fill("black")
textSize(35)
        
}
function reset(){
gameState=PLAY
restart.visible= false
gameOver.visible= false
bottomObstaclesGroup.destroyEach()
score=0

}
function spawnObstacles(){
  if(World.frameCount%60===0){
    obsBottom = createSprite(400,350,40,40);
    obsBottom.addImage(obsBottom1);
    obsBottom.velocityX=-4
    obsBottom.scale=0.07
    var r= Math.round(random(1,3));
    switch(r){
      case 1: obsBottom.addImage(obsBottom1)
      break;
      case 2: obsBottom.addImage(obsBottom2)
      break;
      case 3: obsBottom.addImage(obsBottom3);
      break;
      default: break;
    } 
bottomObstaclesGroup.add(obsBottom)
  }
}