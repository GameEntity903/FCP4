const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var Jack,JackImg;
var score,ground;
var coin,coinn;
var randnox,randnoy;
var coinG,rockG;
var rock,rockk;
var GameState,play,end,win;

function preload()
{
	JackImg = loadImage("Jack.png");
	coinn = loadImage("Coin.png");
	rockk = loadImage("Rock.png")
}

function setup() {
	createCanvas(displayWidth-12, displayHeight-125);
	Jack = createSprite(200,500,40,40);
	Jack.addImage(JackImg);
	Jack.scale = 0.6
	engine = Engine.create();
	world = engine.world;
	ground = createSprite(displayWidth/2,595,displayWidth,2);
	coinG = new Group();
	score = 0;
	rockG = new Group();
	play = 1;
	end = 0;
	win = 2;
	GameState = play;
	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  if(GameState === play){
	if (keyIsDown(32)){
		Jack.y = Jack.y -30;
		Jack.velocityY = 15;
		}
		if (Jack.isTouching(ground)){
			Jack.velocityY = 0;
		}
		if (frameCount%50==0){
			coinspawn();
		}
		if (score>=5 && frameCount%100==0){
			rockspawn();
		}
		for(var i=0;i<coinG.maxDepth();i=i+1){
			var C=coinG.get(i);
			if(C!=null&&Jack.isTouching(C)){
			  C.destroy();
			  score=score+1;
			  textSize(40);
			  fill("red");
			  text("GG",Jack.x-20,Jack.y-100);
			}
		  }
		  for(var i=0;i<rockG.maxDepth();i=i+1){
			var R=rockG.get(i);
			if(R!=null&&Jack.isTouching(R)){
			  R.destroy();
			  score=score-5;
			  if (keyIsDown(32)){
	    Jack.y = Jack.y -30;
	    Jack.velocityY = 15;
	}
	console.log(score);
	if (Jack.isTouching(ground)){
		Jack.velocityY = 0;
	}
	if (frameCount%50==0){
		coinspawn();
	}
	if (score>=5 && frameCount%100==0){
		rockspawn();
	}
	for(var i=0;i<coinG.maxDepth();i=i+1){
		var C=coinG.get(i);
		if(C!=null&&Jack.isTouching(C)){
		  C.destroy();
		  score=score+1;
		  textSize(40);
		  fill("red");
		  text("GG",Jack.x-20,Jack.y-100);
		}
	  }
	  for(var i=0;i<rockG.maxDepth();i=i+1){
		var R=rockG.get(i);
		if(R!=null&&Jack.isTouching(R)){
		  R.destroy();
		  score=score-5;
		  textSize(40);
		  fill("red");
		  text("OH NO!!!",Jack.x-20,Jack.y-100);
		}
	  }
	if (keyIsDown(32)){
	Jack.y = Jack.y -30;
	Jack.velocityY = 15;
	}
	if (Jack.isTouching(ground)){
		Jack.velocityY = 0;
	}
	if (frameCount%50==0){
		coinspawn();
	}
	if (score>=5 && frameCount%100==0){
		rockspawn();
	}
	for(var i=0;i<coinG.maxDepth();i=i+1){
		var C=coinG.get(i);
		if(C!=null&&Jack.isTouching(C)){
		  C.destroy();
		  score=score+1;
		  textSize(40);
		  fill("red");
		  text("GG",Jack.x-20,Jack.y-100);
		}
	  }
	  for(var i=0;i<rockG.maxDepth();i=i+1){
		var R=rockG.get(i);
		if(R!=null&&Jack.isTouching(R)){
		  R.destroy();
		  score=score-5;
		  textSize(40);
		  fill("red");
		  text("OH NO!!!",Jack.x-20,Jack.y-100);
		}
	  }
	}
    }
	if (score === 50){
		GameState = win;
		Jack.velocityY = 0
		textSize(40);
		fill("red");
		text("You Win !!!",displayWidth/2,displayHeight/2);
		coinG.destroyEach();
		rockG.destroyEach();
	}	
  }
  else if(score < 0) {
	GameState = end;
	coinG.destroyEach();
	rockG.destroyEach();
	textSize(40);
	fill("red");
	text("You Lose !!!",displayWidth/2,displayHeight/2);

  }

  drawSprites();
  textSize(20);
  fill("red");
  text("Score : " + score,displayWidth-150,60);
  
}

function coinspawn(){
	randnox = Math.round(random(600,900));
	randnoy = Math.round(random(80,560));
	coin = createSprite(randnox,randnoy,20,20);
	coin.addImage(coinn);
	coin.scale = .3;
	coin.velocityX = -4-frameCount/300;
	coin.lifetime = coin.velocityX/displayWidth
	coinG.add(coin);
}
function rockspawn(){
	randnoy = Math.round(random(80,560));
	rock = createSprite(displayWidth,randnoy,20,20);
	rock.addImage(rockk);
	rock.scale = .15;
	rock.velocityX = -4-frameCount/300;
	rock.lifetime = rock.velocityX/displayWidth
	rockG.add(rock);
}