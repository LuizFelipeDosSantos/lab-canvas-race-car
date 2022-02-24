let bg;
let car;
let carImage;
let obstacles = [];
let score = 0;
const roadBorderLeft = 60;
const roadBorderRigth = 500 - 60;

//Rect
class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    fill(255,0,0);
    rect(this.x, this.y, this.width, this.height);
  }
}

//Obstacle
class Obstacle extends Rect {
  constructor(x, y, width, height) {
    super(x , y, width, height);
  }
}

//Car
class Car extends Rect {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  draw() {
    image(carImage, this.x, this.y, this.width, this.height);
  }

  moveLeft() {
    this.x -= 5;
  }

  moveRight() {
    this.x += 5;
  }

  isCollidingWithLeftBorder() {
    return (this.x <= roadBorderLeft) ? true : false;
  }
  
  isCollidingWithRigthBorder() {
    return ((this.x + this.width) >= (roadBorderRigth)) ? true : false;
  }

  isCollidingWithObstacle() {
    for (let obs of obstacles) {
      if (this.x < obs.x + obs.width &&
          this.x + this.width > obs.x &&
          this.y < obs.y + obs.height &&
          this.height + this.y > obs.y) {
        return true;
      }
    };
    return false;
  }
}

//Help functions
function createObstacle() {
  const randomX = random(roadBorderLeft, roadBorderRigth - 100);
  let randomWidth = random(100,250);
  if (randomWidth + randomX > roadBorderRigth) {
    randomWidth -= randomWidth + randomX - roadBorderRigth;
  }
  obstacles.push(new Obstacle(randomX, 0, randomWidth, 40));
}

function clearObstacle() {
  obstacles.forEach((obs, i) => {
    if (obs.y > 600) {
      score++;
      obstacles.splice(i, 1);
    }
  });
}

function gameOver() {
  fill(0);
  rect(0,0,500,600);
  textSize(32);
  fill(255,0,0);
  text('Game Over!', 150, 120);
  textSize(32);
  fill(255);
  text('Your final score', 130, 160);
  textSize(32);
  fill(255);
  text(score, 230, 200);
  frameRate(0);
}

//P5 JS functions 
function preload() {
  bg = loadImage('../images/road.png');
  carImage = loadImage('../images/car.png');
}

function setup() {
  const canvas = createCanvas(500,600);
  canvas.parent('game-board');
  car = new Car(225,480,50,100);

  noLoop();
}

function draw() {
  background(bg);
  car.draw();

  if (keyIsDown(LEFT_ARROW) && (!car.isCollidingWithLeftBorder())) {
    car.moveLeft();
  } else if (keyIsDown(RIGHT_ARROW) && (!car.isCollidingWithRigthBorder())) {
    car.moveRight();
  }

  if (obstacles.length > 0) {
    obstacles.forEach((obs) => {
      obs.draw();
      obs.y += 5;
    });
  }

  if (car.isCollidingWithObstacle()) {
    gameOver();
  }

  clearObstacle();
  textSize(32);
  fill(255, 255, 255);
  text('Score: ' + score, 10, 60);
}

//Default function
window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  function startGame() {
    const gameIntro = document.querySelector('.game-intro');
    gameIntro.style.display = 'none';
    
    setInterval(() => {
      createObstacle();
    }, 1500);
    
    loop();
  }
};
