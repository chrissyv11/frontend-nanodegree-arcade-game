// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances
    // The image/sprite for our enemies, this uses
    // a helper to easily load images
    this.sprite = 'images/enemy-bug.png';
    // CV Set initial location
    this.x = x;
    this.y = y;
    this.xMax = 505;
    // CV Set speed
    this.speed = speed;
};

// CV Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < this.xMax){
      this.x += this.speed * dt;
    }
    else {
      this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player Class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    // CV Set initial location
    this.x = 202;
    this.y = 400;
    // Set length of step
    this.horizStep = 101;
    this.vertStep = 83;
    this.win = false;
};

// CV Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
// CV Handle collision with the Enemy
  for(let enemy of allEnemies){
    var xDiff = Math.abs(this.x - enemy.x);
    var yDiff = Math.abs(this.y - enemy.y);
    if (xDiff < 20 && yDiff < 20) {
      this.resetPlayer();
    }
  }
// CV Check if player has reached river
  if (this.y < 68) {
    this.win = true
    alert('You Win!!!');
    this.resetPlayer();
  }
};

// Player gets reset to bottom of screen
Player.prototype.resetPlayer = function(){
  this.x = 202;
  this.y = 400;
}
// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// CV Handle user input on player.  Receive user input, allowedKeys
//(the key which was pressed) and move the player accordingly (left, right)
// CV Player cannot move off screen
Player.prototype.handleInput = function(input) {
  switch(input){
    case 'left':
      if (this.x > 0){
          this.x -= this.horizStep;
      }
      break;
      case 'right':
      if (this.x < 404) {
        this.x += this.horizStep;
      }
      break;
      case 'up':
      if (this.y > 0) {
          this.y -= this.vertStep;
      }
      break;
      case 'down':
      if (this.y < 332) {
          this.y += this.vertStep;
      }
      break;
    }
};

// Instantiate objects.
// Create several new Enemies and place them in an array called allEnemies
// CV Place the player object in a variable called player
const player = new Player ();
const enemy1 = new Enemy (0, 68, 80);
const enemy2 = new Enemy (0, 151, 100);
const enemy3 = new Enemy (101, 68, 110);

const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
