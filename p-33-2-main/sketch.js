const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var balls = [];
var plinkos = [];
var divisions = [];
var particles = [];
var line;
var gameState = "PLAY";
var ball;

var divisionHeight = 300;

var count = 0;
var score = 0;

function setup() {
  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height, width, 20);

  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(
      new Division(k, height - divisionHeight / 2, 10, divisionHeight)
    );
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 375));
  }
}

function draw() {
  background("black");
  Engine.update(engine);

  textSize(35);
  text("Score : " + score, 20, 40);
  fill(255);

  textSize(35);
  text(" 500 ", 5, 550);
  text(" 500 ", 80, 550);
  text(" 500 ", 160, 550);
  text(" 500 ", 240, 550);
  text(" 100 ", 320, 550);
  text(" 100 ", 400, 550);
  text(" 100 ", 480, 550);
  text(" 200 ", 560, 550);
  text(" 200 ", 640, 550);
  text(" 200 ", 720, 550);

  ground.display();
  if (gameState == "END") {
    background("black");
    fill("red");
    textSize(100);
    text("Game Over", 200, 400);
  }
  for (var k = 0; k < plinkos.length; k++) {
    plinkos[k].display();
  }

  if (ball != null) {
    ball.display();

    if (ball.body.position.y > 700) {
      if (ball.body.position.x < 300) {
        score = score + 500;
        ball = null;
        if (count >= 5) gameState = "END";
      } else if (ball.body.position.x < 600 && ball.body.position.x > 301) {
        score = score + 100;
        ball = null;
        if (count >= 5) gameState = "END";
      } else if (ball.body.position.x < 900 && ball.body.position.x > 601) {
        score = score + 200;
        ball = null;
        if (count >= 5) gameState = "END";
      }
    }
  }

  for (var i = 0; i < divisions.length; i++) {
    divisions[i].display();
  }
}

function mousePressed() {
  if (gameState !== "END") {
    count++;
    ball = new Ball(mouseX, 50, 10, 10);
  }
}
