let lives = 3;

const char = document.getElementsByClassName("char");
// -----ENEMY------

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // coordinates
    this.x = x;
    this.y = y;

    //random speed func
    this.speed = Math.random()*(600 - 150)+150;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x <= 505) {  //canvas.width = 505
        this.x +=  this.speed * dt;//if the enemy is inside of the canvas chancge the position of the x plus speed
    } else {
        this.x = -10;//if the enemy reaches the margin start again from the outside of the canvas
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// -----PLAYER------
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// --------
var Player = function(charSelect, x, y){
    this.sprite = charSelect || '';
    this.lives = 3;
    this.x = 200;
    this.y = 400;
}

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.y <= 0){
        $(function () {
            $(document).ready(function () {
                $('#winningModal').modal("show")
            })
        });
    }
    // ----UPP----
    if(this.pressedKey === "up" && this.y > 0){//x>0 checks the left edge
        this.y -= 90;
    }
        if(this.y < 0){
             this.x = 200;
             this.y = 400; 
             $(function () {
                $(document).ready(function () {
                    $('#winningModal').modal("show")
                })
            });  
        }
    // ----DOWN----
    if(this.pressedKey === "down" && this.y < 400){//x<400 checks the right edge whith player in the center of the square
        this.y +=  90;
    }
    // ----LEFT----
    if(this.pressedKey === "left" && this.x > 0){//y>0 checks the top edge
        this.x -= 100;
    }
    // ----RIGHT----
    if(this.pressedKey === "right" && this.x < 400){//y<400 checks the bottom edge 
        this.x += 100;
    }
    this.pressedKey= null;//allows just one key press
};

    

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

Player.prototype.handleInput= function(event){
    this.pressedKey=event
}

document.addEventListener('keyup', function(event) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[event.keyCode]);
});



