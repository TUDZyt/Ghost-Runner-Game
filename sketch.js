var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 300)
  ghost.addImage(ghostImg)
  ghost.scale = 0.3

  climbersGroup = new Group();
  doorsGroup = new Group();
  invisibleBlockGroup = new Group()
  
}

function draw() {
  background(200);
  
  if (gameState === "play"){
    console.log(ghost.y)

    doorSpawn()

    if(tower.y > 400){
      tower.y = 300
    }

    if (keyDown("space")){
      ghost.velocityY = -7
    }
    ghost.velocityY = ghost.velocityY + 0.8
    
    if (ghost.isTouching(climbersGroup))
    {
      ghost.velocityY = 0
    }

    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600)
    {
      ghost.destroy()
      textSize(30)
      text("GAME OVER!", 300, 300)
      tower.velocityY = 0
      doorsGroup.setVelocityYEach(0)
      doorsGroup.destroyEach()
      climbersGroup.setVelocityYEach(0)
      climbersGroup.destroyEach()
      invisibleBlockGroup.setVelocityYEach(0)
      invisibleBlockGroup.destroyEach()
    }
  }




  drawSprites()
}

function doorSpawn()
{
  if (frameCount % 240 === 0){
    door = createSprite(random(100, 500), 0)
    door.addImage(doorImg)
    door.velocityY = 1
    door.lifetime = 800
    doorsGroup.add(door)

    climber = createSprite(door.x, 50)
    climber.addImage(climberImg)
    climber.velocityY = 1
    climber.lifetime = 800
    climbersGroup.add(climber)

    invisibleBlock = createSprite(door.x, 50, climber.width, 10)
    invisibleBlock.debug = true
    invisibleBlock.velocityY = 1
    invisibleBlock.lifetime = 800
    invisibleBlock.visible = false
    invisibleBlockGroup.add(invisibleBlock)

    ghost.depth = door.depth
    ghost.depth+=1
  }
}
