/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make 
 * writing app.js a little simpler to work with.
 */

var Engine = (function (global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        current = "charScreen",
        playerCharacter = '',
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    document.getElementById("gameCanvas").appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {

        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        if (current == "on") {
            updateEntities(dt);
            checkCollisions();
        }
    }
    function checkCollisions() {

        allEnemies.forEach(function (enemy) {
            if (player.x >= enemy.x - 25 && player.x <= enemy.x + 25) {
                if (player.y >= enemy.y - 25 && player.y <= enemy.y + 25) {
                    player.lives--
                    player.x = 200;
                    player.y = 400;
                }
            }if (player.lives == 0) {
                current = "off"
                $(function () {
                    $(document).ready(function () {
                        $('#finalModal').modal("show").on('click', function(e){
                            if(e.target.id == "yes"){
                                current = "on";
                                reset();
                            }else{
                                current="charScreen"
                            }
                        })
                    })
                });
            }
            
        });
    }

    

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function (enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
            'images/water-block.png',   // Top row is water
            'images/stone-block.png',   // Row 1 of 3 of stone
            'images/stone-block.png',   // Row 2 of 3 of stone
            'images/stone-block.png',   // Row 3 of 3 of stone
            'images/grass-block.png',   // Row 1 of 2 of grass
            'images/grass-block.png'    // Row 2 of 2 of grass
        ],
            numRows = 6,
            numCols = 5,
            row, col;

        // Before drawing, clear existing canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        // LIVES
        ctx.fillStyle = "rgba(210,255,82,1)";
        ctx.font = "22px Verdana";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Lives: " + player.lives, 210, 64);

            if (current == "charScreen") {
                charSelection();
                renderSelectionScreen();
            } else if (current == "on") {
                renderEntities();
            } else {
                renderFinalScreen();
            }
    }
    
 
    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    // CHARACTER SELECTION

    function charSelection(){
        $(function () {
            $(document).ready(function () {
                $('#introModal').modal("show")
            })
        });

        for (let i = 0; i < char.length; i++) {
            char[i].addEventListener("click", function(e){
                    current="on";
                    player.selection = e.target.alt
                    charArr = [
                        ["1", 'images/char-boy.png'],
                        ["2", 'images/char-cat-girl.png'],
                        ["3", 'images/char-horn-girl.png'],
                        ["4", 'images/char-pink-girl.png'],
                        ["5", 'images/char-princess-girl.png']
                    ];
                        for (i=0; i< charArr.length; i++) {
                                if (charArr[i][0] === player.selection) {
                                    playerCharacter = charArr[i][1]
                                }
                            } 
                            reset();
                         })
                    }
                }

    //--------

    function renderSelectionScreen(){
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "32px Helvetica";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText("Selecting  charcarter", 250, 475);
    }
    function renderFinalScreen(){
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "32px Helvetica";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText("You loose", 250, 475);
    }
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function (enemy) {
            enemy.render();
        });

        player.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
         allEnemies = [];

        let pushEnemies = function () {
            allEnemies.push(new Enemy(0, 60))
            allEnemies.push(new Enemy(0, 140))
            allEnemies.push(new Enemy(0, 220))

        }
        pushEnemies();

         player = new Player(playerCharacter);
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/Star.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
