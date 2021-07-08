var tower 
var door,doorGroup
var climber,climberGroup
var ghost
var START
var END
var gamestate = "START"

function setup(){
  
  createCanvas(windowWidth,windowHeight)
  
  tower = createSprite(windowWidth/2,windowHeight/2);
  tower.addImage(towerImg);
  tower.velocityY = 3;
  
  ghost = createSprite(windowWidth/2,windowHeight/2,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;
  
  doorGroup = new Group();

  climberGroup = new Group();

}

function preload(){
  
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
  
}

function draw(){
  
  background("black");
  
  if(gamestate === "START"){
  
  //spookySound.play();
    
  if (tower.y > windowWidth/2){
    tower.y = tower.y/2;
  }
  
  if(keyDown("space")){
    
    ghost.velocityY = -2;
    
  }
  
  ghost.velocityY = ghost.velocityY + 0.5;
  
  if(keyDown(RIGHT_ARROW)){
    
    ghost.x = ghost.x + 2;
    
  }
  
  if(keyDown(LEFT_ARROW)){
    
    ghost.x = ghost.x - 2;
    
  }
  
  if(climberGroup.isTouching(ghost)){
    
    ghost.collide(climberGroup);
    
  }
    
  if(ghost.y > windowHeight || ghost.y < 0){
    gamestate = "END";
  } 
    
  }
  
  else if(gamestate == "END"){
    
  tower.destroy();
  ghost.destroy();
  climberGroup.destroyEach();
  doorGroup.destroyEach();
    
  textSize(50) 
  fill("yellow")  
  text("GAME OVER",windowWidth/4,windowHeight/2);
  
  }
  
  spawnDoors();
  
  drawSprites();
  
}
function spawnDoors(){
  
  if(frameCount % 150 ==0 ){
  door = createSprite(Math.round(random(windowWidth/6,windowWidth - 200)),50,50,10);
  door.addImage(doorImg);
  door.velocityY = 3;
    
  climber = createSprite(door.x,door.y + 50,50,10);
  climber.addImage(climberImg);
  climber.velocityY = 3;
    
  climberGroup.add(climber);
    
  doorGroup.add(door);
    
  ghost.depth = door.depth;
  ghost.depth = door.depth + 2;
  }
  
}