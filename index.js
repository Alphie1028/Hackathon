const inc = 10; //speed
const ballRadius = 5;
let x, y;
let wDown = false;
let aDown = false;
let sDown = false;
let dDown = false;
let balls = []; // stores shooting balls
let x2;
let y2;
let angle;
let squares = []; //stores the squares

//sets up the canvas
function setup() {
  createCanvas(400, 400);
  noStroke();
  x = width / 2; //sets x and y to the center of canvas
  y = height / 2;
  // makes 5 random squares
    for (let i = 0; i < 5; i++) {
        squares.push({
        x: random(width),
        y: random(height),
        size: 20,
        speedX: random(-2, 2),
        speedY: random(-2, 2),
        });
    }
}
//function that draws all the shapes
function draw() {
  background(16, 55, 84);
  fill(51, 171, 177);
  ellipse(x, y, 50, 50);
  
  stroke(51, 171, 177);
  strokeWeight(5);
  let angle = atan2(mouseY - y, mouseX - x);// Calculate the angle between the line from the ball to the mouse and the x-axis
  let x2 = x + 50 * cos(angle);// Calculate the x-coordinate of the end point of the line
  let y2 = y + 50 * sin(angle);// Calculate the y-coordinate of the end point of the line
  line(x, y, x2, y2);// Draw the line from the ball to the mouse
  
  // Draw the shooting balls
  fill(255, 0, 0);
  for (let i = 0; i < balls.length; i++) {
    ellipse(balls[i].x, balls[i].y, ballRadius * 2, ballRadius * 2);
    balls[i].x += balls[i].speed * cos(balls[i].angle);// Update the x-coordinate of the ball based on its speed and angle
    balls[i].y += balls[i].speed * sin(balls[i].angle);// Update the y-coordinate of the ball based on its speed and angle
  }
  
  if (wDown) {
    y -= inc;
  }
  if (aDown) {
    x -= inc;
  }
  if (sDown) {
    y += inc;
  }
  if (dDown) {
    x += inc;
  }
for (let i = 0; i < squares.length; i++) {
    rect(squares[i].x, squares[i].y, squares[i].size, squares[i].size);
    //update square position
    squares[i].x += squares[i].speedX;
    squares[i].y += squares[i].speedY;
    //check for bouncing off walls
    if (squares[i].x > width || squares[i].x < 0) {
        squares[i].speedX *= -1;
    }
    if (squares[i].y > height || squares[i].y < 0) {
        squares[i].speedY *= -1;
    }
    //check for collision with balls and squares
    for (let j = 0; j < balls.length; j++) {
        let distance = dist(balls[j].x, balls[j].y, squares[i].x, squares[i].y);
        if (distance < ballRadius + squares[i].size / 2) {
            //remove squares when hit
            squares.splice(i, 1);
            balls.splice(j, 1);
        }
    }
}
//if balls are gone, make new ones
if (squares.length === 0) {
  for (let i = 0; i < 5; i++) {
    squares.push({
      x: random(width),
      y: random(height),
      size: 20,
      speedX: random(-2, 2),
      speedY: random(-2, 2),
    });
  }
}
}
//controlls the player/shoots balls
function keyPressed() {
  if (key == 'w') {
    wDown = true;
  }
  if (key == 'a') {
    aDown = true;
  }
  if (key == 's') {
    sDown = true;
  }
  if (key == 'd') {
    dDown = true;
  }
  if (key == ' ') {
  angle = atan2(mouseY - y, mouseX - x);
  x2 = x + 50 * cos(angle);
  y2 = y + 50 * sin(angle);
  balls.push({
    x: x2,
    y: y2,
    angle: angle,
    speed: 5,
  });
}
}

function keyReleased() {
  if (key == 'w') {
    wDown = false;
  }
  if (key == 'a') {
    aDown = false;
  }
  if (key == 's') {
    sDown = false;
  }
  if (key == 'd') {
    dDown = false;
  }
}




