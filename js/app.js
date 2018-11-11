// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // CV Set initial location
    this.x = x;
    this.y = y;
    // CV Set speed
    this.speed = speed;
};

// CV Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    this.speed = Math.floor(Math.random() * 3 + 1);
    if(this.x > 505){
      this.x = 0;
    }
    // CV Handle collision with the Player
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    // CV Set initial location
    this.x = 252;
    this.y = 596;
    // Set length of step
    this.horizStep = 101;
    this.vertStep = 83;
};

// CV Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // CV Handle collision with the Player
};

Player.prototype.resetPlayer = function(){
  this.x = 252;
  this.y = 596;
}
// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// CV Handle user input on player.  Receive user input, allowedKeys
//(the key which was pressed) and move the player accordingly (left, right)
// CV Player cannot move off screen (check for that and handle)
// CV When player reaches water, game is reset by moving player to initial location
// CV Write a separate reset Player method
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

// Now instantiate your objects.
// Create several new Enemies and place them in an array called allEnemies
// Place all enemy objects in an array called allEnemies
// CV Place the player object in a variable called player
const player = new Player ();
const enemy1 = new Enemy ();
const enemy2 = new Enemy ();
const enemy3 = new Enemy ();
//player.render();
//enemy1.render();
//enemy2.render();
//enemy3.render();
const allEnemies = [enemy1, enemy2, enemy3];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
