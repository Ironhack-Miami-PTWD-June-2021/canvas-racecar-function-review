const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d');
const playerScore = document.getElementById('score');
const carDeets = {
  x: 210,
  y: 530,
  width: 35,
  height: 80,
  src: './images/car.png'
};
let interval = 60;
let animateBackground;
let animateCar;
let animateObstacles;
let generateObstacles;
let score = 0;
let obstacles = [];

const drawBackground = () => {
  const backgroundImage = new Image()
  backgroundImage.src = './images/road.png';

  const background = {x: 0, y: 0};

  context.drawImage(backgroundImage, background.x, background.y, canvas.width, canvas.height);
};

const drawCar = () => {
  const carImage = new Image();
  carImage.src = carDeets.src;

  context.drawImage(carImage, carDeets.x, carDeets.y, carDeets.width, carDeets.height);
};

const drawEverything = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  

    animateBackground = setInterval(() => drawBackground(), interval);
    animateCar = setInterval(() => drawCar(), interval);
    animateObstacles = setInterval(() => drawObstacles(), interval);
    generateObstacles = setInterval(() => createObstacle(), 1000);
};

const drawObstacles = () => {
  obstacles.forEach(obstacle => {
    obstacle.y += 5;
    obstacle.draw();

    if (obstacle.collision()) gameOver();

    if(obstacle.y > canvas.height + 15) {
      score += 1;
      obstacles.shift();
      playerScore.innerHTML = score;
    }
  });
};

const createObstacle = () => {
  const width = 100 + Math.random() * 100;
  const x = canvas.width * Math.random();
  const randomNum = Math.floor(Math.random() * 100);

  if(randomNum % 3 === 0) {
    obstacles.push(new Obstacle(x, width));
  }
};

class Obstacle {
  constructor(x, width) {
    this.x = x;
    this.y = 0;
    this.width = width;
    this.height = 30;
  }

  draw() {
    context.fillStyle = 'red';
    
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  collision() {
    return !(carDeets.x > this.x + this.width || carDeets.x + carDeets.width < this.x || carDeets.y > this.y + this.height || carDeets.y + carDeets.height < this.y);
  }
}

const gameOver = () => {
  console.log('game over');
  clearInterval(animateBackground);
  clearInterval(animateCar);
  clearInterval(animateObstacles);
  clearInterval(generateObstacles);
};

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  function startGame() {
    drawEverything();
  }

  document.addEventListener('keydown', event => {
    // console.log({code: event.code});
    
    switch(event.code) {
      case 'ArrowLeft':
      case 'KeyA':
        console.log('moving left');
        if(carDeets.x > 100) carDeets.x -= 45;
        break;
      case 'ArrowRight':
      case 'KeyD':
        console.log('moving right');
        if(carDeets.x < 385) carDeets.x += 45;
        break;
    }

  });
};
