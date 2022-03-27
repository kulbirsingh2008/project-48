
var gun,gun_img;
var last;
var ball1,ball1_img,ball2_img;
var ball1Group,bulletGroup;
var gameOver,GO_img;

var PLAY = 1
var END = 0;

var score=0;
var life = 3;
var gameState= PLAY

function preload(){

  gun_img = loadImage("gun.png");
  bullet_img = loadImage("bullet1.png");
  ball1_img = loadImage("ball1.png");
  ball2_img = loadImage("ball2.png");
  GO_img = loadImage("gameOver.png");

}

function setup() {
 createCanvas(1000,800)

 gun = createSprite(200,400,20,20);
 gun.addImage("gun",gun_img);
 gun.scale = 0.1;

 last = createSprite(40,400,80,800);

 ball1Group = new Group();
 bulletGroup = new Group();

 gameOver = createSprite(500,400,10,10);
 gameOver.addImage("gameOver",GO_img);

}

function draw() {
   background(255,25,255)
   textSize(25)
   fill("black")
   text("Score: "+ score, 500,30);
   text("Life: "+ life,500,50 )

   if(gameState === PLAY){

    gun.y = World.mouseY;

    gameOver.visible = false;
     
   Sball1();

   if(keyWentDown("space")){
      Sbullet();
   }

   ball1Group.collide(bulletGroup,invisible)

   if(ball1Group.collide(last)){
     life = life-1;
   }

   if(life === 0){
     gameState = END;
   }
   
  }else if(gameState === END){

    ball1Group.visible = false;
    gameOver.visible = true;

    ball1Group.velocityX = 0;
    ball1Group.velocityY = 0;

    text("Press R To Restart",500,200)

    if(keyDown("r")){
      reset();
    }

  }
   drawSprites();
}

function invisible() {
  ball1Group.lifetime = 0;
  score = score+1;
  console.log(remove);
}

function Sbullet() {
  var bullet= createSprite(100, 100, 60, 10);
  bullet.addImage(bullet_img);
  bullet.x = 300;
  bullet.y=gun.y;
  bullet.velocityX = 4;
  bullet.lifetime = 400;
  bullet.scale = 0.2;

  bulletGroup.add(bullet);
}

function Sball1() {
  if(frameCount % 60 === 0) {
    var ball1 = createSprite(1000,Math.round(random(800)),110,310);
    ball1.scale = 0.05;
    ball1.velocityX = -3;
    imageMode(CENTER)

     var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: ball1.addImage(ball1_img);
              break;
      case 2: ball1.addImage(ball2_img);
              break;
      default: break;
    }
  
   ball1.lifetime = 400;

   ball1Group.add(ball1);

  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  ball1Group.destroyEach();
  bulletGroup.destroyEach();
  life = 3;
  score = 0;
}