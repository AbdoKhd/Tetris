class Game{
    constructor(){
        this.canvas = document.getElementById("mainGame");
        this.ctx = this.canvas.getContext("2d");
        this.sprites = [];
        this.isPaused = false;
        this.musicOn = true;
        this.tetrisMusic = new Audio('audios/Tetris-music.mp3');
    }

    addSprite(sprite){
        this.sprites.push(sprite);
    }

    update(){

        if (!this.isPaused) {
            this.tetrisMusic.play();
            var lSpritesLength = this.sprites.length;
            for (var i = 0; i < lSpritesLength; i++) {
                this.sprites[i].update();
            }
        }

        if ((this.musicOn) && this.tetrisMusic.paused) {
            this.tetrisMusic.play();
        } else if ((!this.musicOn) && !this.tetrisMusic.paused) {
            this.tetrisMusic.pause();
        }
		
	}

    draw(){
        this.ctx.fillStyle = "white";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		var lSpritesLength = this.sprites.length;
		for (var i = 0;i < lSpritesLength; i++)
			this.sprites[i].draw(this.ctx);
	}

    reset() {
        this.sprites = this.sprites.filter(sprite => !(sprite instanceof IShape || sprite instanceof OShape 
            || sprite instanceof LShape || sprite instanceof SShape || sprite instanceof ZShape 
            || sprite instanceof TShape || sprite instanceof JShape));
        this.sprites = this.sprites.filter(sprite => !(sprite instanceof IShapeForNext || sprite instanceof OShapeForNext 
            || sprite instanceof LShapeForNext || sprite instanceof SShapeForNext || sprite instanceof ZShapeForNext 
            || sprite instanceof TShapeForNext || sprite instanceof JShapeForNext));
        
        
        this.sprites.forEach(sprite => {
            if (sprite instanceof Score) {
                sprite.score = 0;
            } else if (sprite instanceof Level) {
                sprite.level = 1;
            }
            else if(sprite instanceof Grid){
                // Reset the color of the cells in the grid
                for (let i = 0; i < sprite.rows; i++) {
                    for (let j = 0; j < sprite.cols; j++) {
                        sprite.cells[i][j].color = 'black';
                    }
                }

                //reset the counter of shapeGenerator when gameOver is true
                if (sprite.gameOver === true) {
                    sprite.gameOver = false;
                    this.sprites.forEach(sprite2 => {
                        if (sprite2 instanceof ShapeGenerator) {
                            sprite2.counter = 0;
                        }
                    });
                }
                
            }
        });

        this.isPaused = false;
        
    }

    pause(){
        this.isPaused = true;
    }

    resume(){
        this.isPaused = false;
    }

}

class IntroLevel extends Sprite{
    constructor(game){
        super();
        this.game = game;
        this.game.addSprite(new PlayButton(330, 500, this.game));
        this.game.addSprite(new IntroText(180, 100, this.game));
        this.game.addSprite(new HowToPlayText1(50, 180, this.game));
        this.game.addSprite(new HowToPlayText2(50, 210, this.game));
        this.game.addSprite(new HowToPlayText3(50, 240, this.game));
        this.game.addSprite(new HowToPlayText4(50, 270, this.game));
        this.game.addSprite(new HowToPlayText5(50, 300, this.game));
        this.game.addSprite(new HowToPlayText6(50, 330, this.game));
        this.game.addSprite(new HowToPlayText7(50, 360, this.game));
        this.game.addSprite(new HowToPlayText8(50, 390, this.game));
        this.game.addSprite(new HowToPlayText9(255, 460, this.game));
    }

    update(){

    }

    draw(ctx){
    }
}

class PlayButton extends Sprite{
    constructor(x, y, game) {
        super(x, y);
        this.width = 110;
        this.height = 40;
        this.text = "Play";
        this.game = game;
        this.isClicked = false;
        this.setupClickEvent();
    }

    setupClickEvent() {
        this.game.canvas.addEventListener("click", (event) => {
            const rect = this.game.canvas.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const clickY = event.clientY - rect.top;

            if (clickX >= this.x && clickX <= this.x + this.width && clickY >= this.y && clickY <= this.y + this.height) {
                this.game.sprites = [];

                var bg = new Background("images/tetris-background.jpeg");
                var score = new Score(630, 150);
                var level = new Level(630, 200, score);
                var nextShapeText = new NextShapeText(630, 20);
                var grid = new Grid(300, 30, 300, 400, 30, score, this.game);
                var grid2 = new GridForNextShape(630, 30, 120, 40, 30, this.game);
                var shapeGenerator = new ShapeGenerator(0, 0, this.game, grid, grid2, score);
                var pausedText = new PausedText(50, 50, this.game);
                var pauseButton = new PauseButton(150, 100, this.game);
                var restartButton = new RestartButton(150, 170, this.game);
                var musicButton = new MusicButton(150, 240, this.game);
                var handleMouseClick = new HandleMouseClick(this.game, pausedText);
                var gameOverText = new GameOverText(50, 50, this.game);
                var rotateText = new RotateText(125, 70);

                this.game.addSprite(bg);
                this.game.addSprite(rotateText);
                this.game.addSprite(pauseButton);
                this.game.addSprite(restartButton);
                this.game.addSprite(musicButton)
                this.game.addSprite(score);
                this.game.addSprite(level);
                this.game.addSprite(nextShapeText);
                this.game.addSprite(grid);
                this.game.addSprite(grid2);
                this.game.addSprite(handleMouseClick);
                this.game.addSprite(shapeGenerator);
                this.game.addSprite(pausedText);
                this.game.addSprite(gameOverText);
            }
        });
    }

    update() {}

    draw(ctx) {
        // Draw the button
        ctx.fillStyle = "grey";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw the text
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText(this.text, this.x + 38, this.y + 25);
    }
}

class RotateText extends Sprite{
    constructor(x, y) {
        super(x, y);
        this.text = "Press 'r' to rotate"; 
        this.font = "20px Arial";
    }

    update() {}

    draw(ctx) {
        // Draw the intro text
        ctx.fillStyle = "black";
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }
}

class IntroText extends Sprite{
    constructor(x, y) {
        super(x, y);
        this.text = "Welcome to Techtris!";
        this.font = "50px Arial";
    }

    update() {}

    draw(ctx) {
        // Draw the intro text
        ctx.fillStyle = "black";
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }
}

class HowToPlayText1 extends Sprite{
    constructor(x, y) {
        super(x, y);
        this.text = "In this classic puzzle game, your goal is to manipulate falling shapes called";
        this.font = "20px Arial";
    }

    update() {}

    draw(ctx) {
        // Draw the intro text
        ctx.fillStyle = "black";
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }
}

class HowToPlayText2 extends Sprite{
    constructor(x, y) {
        super(x, y);
        this.text = "Tetriminos to create complete horizontal lines without any gaps. Each completed";
        this.font = "20px Arial";
    }

    update() {}

    draw(ctx) {
        // Draw the intro text
        ctx.fillStyle = "black";
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }
}

class HowToPlayText3 extends Sprite{
    constructor(x, y) {
        super(x, y);
        this.text = "line disappears, giving you points. As you progress, the game speeds up,";
        this.font = "20px Arial";
    }

    update() {}

    draw(ctx) {
        // Draw the intro text
        ctx.fillStyle = "black";
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }
}

class HowToPlayText4 extends Sprite{
    constructor(x, y) {
        super(x, y);
        this.text = "challenging your ability to think and react quickly. To play, use the arrow keys on";
        this.font = "20px Arial";
    }

    update() {}

    draw(ctx) {
        // Draw the intro text
        ctx.fillStyle = "black";
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }
}
class HowToPlayText5 extends Sprite{
    constructor(x, y) {
        super(x, y);
        this.text = "your keyboard to move the falling Tetrimino or rotate it with 'r'. Press the down ";
        this.font = "20px Arial";
    }

    update() {}

    draw(ctx) {
        // Draw the intro text
        ctx.fillStyle = "black";
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }
}

class HowToPlayText6 extends Sprite{
    constructor(x, y) {
        super(x, y);
        this.text = "arrow to make it fall faster. Your score increases with each completed line, and";
        this.font = "20px Arial";
    }

    update() {}

    draw(ctx) {
        // Draw the intro text
        ctx.fillStyle = "black";
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }
}

class HowToPlayText7 extends Sprite{
    constructor(x, y) {
        super(x, y);
        this.text = "the game ends when the Tetriminos reach the top of the playing area.";
        this.font = "20px Arial";
    }

    update() {}

    draw(ctx) {
        // Draw the intro text
        ctx.fillStyle = "black";
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }
}

class HowToPlayText8 extends Sprite{
    constructor(x, y) {
        super(x, y);
        this.text = "Are you ready to test your skills and see how high you can score?";
        this.font = "20px Arial";
    }

    update() {}

    draw(ctx) {
        // Draw the intro text
        ctx.fillStyle = "black";
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }
}

class HowToPlayText9 extends Sprite{
    constructor(x, y) {
        super(x, y);
        this.text = "Press 'Play' to start the game!";
        this.font = "20px Arial";
    }

    update() {}

    draw(ctx) {
        // Draw the intro text
        ctx.fillStyle = "black";
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }
}


class HandleMouseClick extends Sprite{
    constructor(game, pausedText) {
        super();
        this.game = game;
        this.pausedText = pausedText;
        this.setupKeyEvents();
    }

    setupKeyEvents() {
        this.game.canvas.addEventListener("mousedown", (event) => {
            const rect = this.game.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            console.log(y);
            //if pause is clicked
            if (x >= 150 && x <= 275 && y >= 100 && y <= 139) {
                if(this.game.isPaused){
                    this.game.resume();
                    this.pausedText.isVisible = false;
                }
                else{
                    this.game.pause();
                    this.pausedText.isVisible = true;

                }
            }
            //if restart is clicked
            else if(x >= 150 && x <= 275 && y >= 172 && y <= 210){
                this.game.reset();
            }
            //if music on/off is clicked
            else if(x >= 150 && x <= 275 && y >= 240 && y <= 280){
                if(this.game.musicOn){
                    this.game.musicOn = false;
                }
                else{
                    this.game.musicOn = true;

                }
            }
        });
    }

    update(){
    }

    draw(){

    }
}

class GameOverText extends Sprite {
    constructor(x, y, game) {
        super(x, y);
        this.game = game;
        this.text = "Game Over";
        this.font = "50px Arial";
        this.isVisible = false;
    }

    update() {
        if (this.game.sprites.some(sprite => sprite instanceof Grid && sprite.gameOver)) {
            this.isVisible = true;
        } else {
            this.isVisible = false;
        }
    }

    draw(ctx) {
        if (this.isVisible) {
            ctx.fillStyle = "red";
            ctx.font = this.font;
            ctx.fillText(this.text, this.game.canvas.width / 2 - 80, this.game.canvas.height / 2 - 31);
        }
    }
}

class PausedText extends Sprite {
    constructor(x, y, game) {
        super(x, y);
        this.game = game;
        this.text = "Paused";
        this.font = "50px Arial";
        this.isVisible = false;
    }

    update() {
        if(this.game.isPaused){
            this.isVisible = true;
        }
        else{
            this.isVisible = false;
        }
    }

    draw(ctx) {
        if (this.isVisible) {
            ctx.fillStyle = "white";
            ctx.font = this.font;
            ctx.fillText(this.text, this.game.canvas.width / 2 - 33, this.game.canvas.height / 2 - 31);
        }
    }
}

class MusicButton extends Sprite {
    constructor(x, y, game) {
        super(x, y);
        this.width = 125;
        this.height = 40;
        this.text = "Music on/off";
        this.game = game;
    }

    update() {

    }

    draw(ctx) {
        // Draw the button
        ctx.fillStyle = "grey";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw the text
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText(this.text, this.x + 20, this.y + 25);
    }
}

class PauseButton extends Sprite {
    constructor(x, y, game) {
        super(x, y);
        this.width = 125;
        this.height = 40;
        this.text = "Pause/Resume";
        this.game = game;
    }

    update() {

    }

    draw(ctx) {
        // Draw the button
        ctx.fillStyle = "grey";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw the text
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText(this.text, this.x + 10, this.y + 25);
    }
}

class RestartButton extends Sprite {
    constructor(x, y, game) {
        super(x, y);
        this.width = 125;
        this.height = 40;
        this.text = "Restart";
        this.game = game;
    }

    update() {
        
    }

    draw(ctx) {
        // Draw the button
        ctx.fillStyle = "grey";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw the text
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText(this.text, this.x + 35, this.y + 25);
    }
}

class NextShapeText extends Sprite{
    constructor(x, y){
        super(x, y);
    }

    update(){
    }

    draw(ctx){
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText('Next Shape: ', this.x, this.y);
    }
}

class Score extends Sprite{
    constructor(x, y){
        super(x, y);
        this.score = 0;
    }

    update(){
    }

    draw(ctx){
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText(`Score: ${this.score}`, this.x, this.y);
    }
}

class Level extends Sprite{
    constructor(x, y, score){
        super(x, y);
        this.level = 1;
        this.score = score;
        this.levelUpAudio = new Audio('audios/next-level-audio.wav');
    }

    update(){
        let previousLevel = this.level;
        if(this.score.score < 1000){
            this.level = 1;
        }
        else if(this.score.score < 2000){
            this.level = 2
        }
        else{
           this.level = 3
        }

        // Check if the level has changed
        if (previousLevel !== this.level) {
            this.levelUpAudio.play();
        }
    }

    draw(ctx){
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText(`Level: ${this.level}`, this.x, this.y);
    }
}

class Cell extends Sprite{
    constructor(x, y, size, color) {
        super(x, y);
        this.size = size;
        this.color = color;
    }

    update() {

    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}


class Grid extends Sprite {
    constructor(x, y, width, height, cellSize, score, game) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.rows = height / cellSize;
        this.cols = width / cellSize;
        this.cells = [];
        this.game = game;
        this.score = score;
        this.gameOver = false;

        this.srcX = 0;
        this.srcY = 0;
        this.sheetWidth = 732;
        this.sheetHeight = 341;
        this.sheetColumns = 7;
        this.sheetRows = 2;
        this.frameWidth = (this.sheetWidth / this.sheetColumns);
        this.frameHeight = (this.sheetHeight / this.sheetRows);
        this.currentFrame = 0;
        this.frameCount = this.sheetColumns * this.sheetRows;
        this.smoke = new Image();
        this.smoke.src = "images/smoke-animation3.png";
        this.tetrisRows = [];
        this.isAnimating = false;
        this.gameOverAudio = new Audio('audios/game-over-audio.mp3');
        this.rowClearAudio = new Audio('audios/row-clear-audio.wav');

        const map = [
            "*........*",
            "*........*",
            "*........*",
            "*........*",
            "*........*",
            "*........*",
            "*........*",
            "*........*",
            "*........*",
            "*........*",
            "*........*",
            "*........*",
            "*........*",
            "**********",
        ];

        for (let i = 0; i < this.rows; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.cells[i][j] = new Cell(this.x + j * this.cellSize, this.y + i * this.cellSize, this.cellSize, 'black');
            }
        }
    }

    checkTetris() {

        //check for tetris again only when the animation is done
        if(!this.isAnimating){
            this.tetrisRows = [];
        
            for (let i = 0; i < this.rows; i++) {
                let isTetris = true;
                for (let j = 0; j < this.cols; j++) {
                    if (this.cells[i][j].color === 'black') {
                        isTetris = false;
                        break;
                    }
                }
                if (isTetris) {
                    this.rowClearAudio.play();
                    this.tetrisRows.push(i);
                }
            }
        }

        //Animation
        if (this.tetrisRows.length > 0 && !this.isAnimating) {
            this.isAnimating = true; // Set isAnimating to true when animation starts
            this.currentFrame = 0; // Reset the current frame to start the animation from the beginning
        }
        if (this.isAnimating) {
            this.currentFrame++;
            if (this.currentFrame === this.frameCount) {
                this.isAnimating = false; // Set isAnimating to false when animation ends
            }
            this.srcX = (this.currentFrame % this.sheetColumns) * this.frameWidth;
            this.srcY = Math.floor(this.currentFrame / this.sheetColumns) * this.frameHeight;
        }

        //Scoring
        if(!this.isAnimating){
            if(this.tetrisRows.length === 1){
                this.score.score += 40;
            }
            else if(this.tetrisRows.length === 2){
                this.score.score += 100;
            }
            else if(this.tetrisRows.length === 3){
                this.score.score += 300;
            }
            else if(this.tetrisRows.length === 4){
                this.score.score += 1200;
            }
        }
    
        // Update colors of the cells if a tetris happened
        if(!this.isAnimating){
            for (let i = this.tetrisRows[this.tetrisRows.length - 1]; i >= 0; i--) {
                if (i - this.tetrisRows.length >= 0) {
                    for (let j = 0; j < this.cols; j++) {
                        this.cells[i][j].color = this.cells[i - this.tetrisRows.length][j].color;
                    }
                } else {
                    for (let j = 0; j < this.cols; j++) {
                        this.cells[i][j].color = 'black';
                    }
                }
            }
        }
    }

    update() {
        // Check if the game is already over
        if (this.gameOver) {
            return;
        }
    
        // Check if any of the top cells are filled to set GameOver to true
        if (this.cells[0][3].color !== 'black' || this.cells[0][4].color !== 'black' || this.cells[0][5].color !== 'black' || this.cells[0][6].color !== 'black'
            || this.cells[1][3].color !== 'black' || this.cells[1][4].color !== 'black' || this.cells[1][5].color !== 'black' || this.cells[1][6].color !== 'black') {
            this.gameOver = true;
            this.gameOverAudio.play();
            return;
        }
    
        // Loop through all sprites in the game
        for (let sprite of this.game.sprites) {
            // Check if the sprite is a shape and isDone is true
            if (sprite instanceof IShape || sprite instanceof OShape || sprite instanceof LShape || sprite instanceof SShape || sprite instanceof ZShape || sprite instanceof TShape || sprite instanceof JShape) {
                if (sprite.isDone) {
                    // Loop through the blocks of the shape and update the cell colors
                    for (let block of sprite.blocks) {
                        const cellX = sprite.x + block.offsetX - 10;
                        const cellY = sprite.y + block.offsetY - 1;
                        if (cellY >= 0 && cellY < this.rows && cellX >= 0 && cellX < this.cols) {
                            this.cells[cellY][cellX].color = sprite.color;
                        }
                    }
                    this.game.sprites = this.game.sprites.filter(sprite => !(sprite instanceof IShape || sprite instanceof OShape || sprite instanceof LShape || sprite instanceof SShape || sprite instanceof ZShape || sprite instanceof TShape || sprite instanceof JShape) || !sprite.isDone);
                }
            }
        }
    
        this.checkTetris();
    }

    draw(ctx) {

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.cells[i][j].draw(ctx);
                //border around each cell
                ctx.strokeStyle = "white";
                ctx.strokeRect(this.cells[i][j].x, this.cells[i][j].y, this.cells[i][j].size, this.cells[i][j].size);
            }
        }

        if (this.isAnimating) {
            ctx.drawImage(this.smoke, this.srcX, this.srcY, this.frameWidth, this.frameHeight, this.x, this.y + this.tetrisRows[0] * this.cellSize, this.width, this.tetrisRows.length * this.cellSize);
        }
        
    }
}


class GridForNextShape extends Sprite {
    constructor(x, y, width, height, cellSize, game) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.rows = height / cellSize;
        this.cols = width / cellSize;
        this.cells = [];
        this.game = game;

        const map = [
            "*...",
            "****",
        ];

        for (let i = 0; i < this.rows; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.cells[i][j] = new Cell(this.x + j * this.cellSize, this.y + i * this.cellSize, this.cellSize, 'black');
            }
        }
    }

    update() {  

       
    }

    draw(ctx) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.cells[i][j].draw(ctx);
                //border around each cell
                ctx.strokeStyle = "white";
                ctx.strokeRect(this.cells[i][j].x, this.cells[i][j].y, this.cells[i][j].size, this.cells[i][j].size);
            }
        }
    }
}


class ShapeGenerator extends Sprite{
    constructor(x, y, game, grid, grid2, score) {
        super(x, y);
        this.game = game;
        this.grid = grid;
        this.grid2 = grid2;
        this.counter = 0;
        this.shape;
        this.score = score;
        this.shapePlaced = new Audio('audios/shape-placed-audio.wav');
    }

    update() {
        if(!this.grid.gameOver){
            this.counter++;
            if(this.counter === 1){
                const random = Math.floor(Math.random() * 7);
                let newShape;
                switch (random) {
                    case 0:
                        newShape = new IShape(14, 1, 'red', this.grid, this.score);
                        break;
                    case 1:
                        newShape = new OShape(14, 1, 'yellow', this.grid, this.score);
                        break;
                    case 2:
                        newShape = new LShape(14, 2, 'blue', this.grid, this.score);
                        break;
                    case 3:
                        newShape = new SShape(14, 1, 'green', this.grid, this.score);
                        break;
                    case 4:
                        newShape = new ZShape(14, 1, 'purple', this.grid, this.score);
                        break;
                    case 5:
                        newShape = new TShape(14, 1, 'orange', this.grid, this.score);
                        break;
                    case 6:
                        newShape = new JShape(14, 1, 'pink', this.grid, this.score);
                        break;
                }
                this.game.addSprite(newShape);
                this.generateShapeForNext();
            }


            // Check if a shape is done falling in order to generate a new shape
            const allShapesDone = this.game.sprites.every(sprite => {
                return sprite instanceof IShape || sprite instanceof OShape || sprite instanceof LShape || sprite instanceof SShape || sprite instanceof ZShape || sprite instanceof TShape || sprite instanceof JShape ? sprite.isDone : true;
            });
            if (allShapesDone) {
                this.generateShape();
                
            }
        }
    }

    generateShapeForNext() {
        const random = Math.floor(Math.random() * 7);
        let newShapeNextGrid;
        switch (random) {
            case 0:
                newShapeNextGrid = new IShapeForNext(22, 1, 'red', this.grid2);
                this.shape = 'I';
                break;
            case 1:
                newShapeNextGrid = new OShapeForNext(22, 1, 'yellow', this.grid2);
                this.shape = 'O';
                break;
            case 2:
                newShapeNextGrid = new LShapeForNext(22, 2, 'blue', this.grid2);
                this.shape = 'L';
                break;
            case 3:
                newShapeNextGrid = new SShapeForNext(22, 1, 'green', this.grid2);
                this.shape = 'S';
                break;
            case 4:
                newShapeNextGrid = new ZShapeForNext(22, 1, 'purple', this.grid2);
                this.shape = 'Z';
                break;
            case 5:
                newShapeNextGrid = new TShapeForNext(22, 1, 'orange', this.grid2);
                this.shape = 'T';
                break;
            case 6:
                newShapeNextGrid = new JShapeForNext(22, 1, 'pink', this.grid2);
                this.shape = 'J';
                break;
        }
        this.game.addSprite(newShapeNextGrid);
    }

    generateShape() {
        // Generate the shape for the main grid based on the next shape
        this.shapePlaced.play();
        if (this.shape === 'I') {
            this.game.addSprite(new IShape(14, 1, 'red', this.grid, this.score));
        } else if (this.shape === 'O') {
            this.game.addSprite(new OShape(14, 1, 'yellow', this.grid, this.score));
        } else if (this.shape === 'L') {
            this.game.addSprite(new LShape(14, 2, 'blue', this.grid, this.score));
        } else if (this.shape === 'S') {
            this.game.addSprite(new SShape(14, 1, 'green', this.grid, this.score));
        } else if (this.shape === 'Z') {
            this.game.addSprite(new ZShape(14, 1, 'purple', this.grid, this.score));
        } else if (this.shape === 'T') {
            this.game.addSprite(new TShape(14, 1, 'orange', this.grid, this.score));
        } else if (this.shape === 'J') {
            this.game.addSprite(new JShape(14, 1, 'pink', this.grid, this.score));
        }

        //delete from sprites any shape for next
        this.game.sprites = this.game.sprites.filter(sprite => !(sprite instanceof IShapeForNext || sprite instanceof OShapeForNext 
            || sprite instanceof LShapeForNext || sprite instanceof SShapeForNext || sprite instanceof ZShapeForNext 
            || sprite instanceof TShapeForNext || sprite instanceof JShapeForNext));

        this.generateShapeForNext();
    }

    draw(ctx) {
        
    }
}


class Background extends Sprite{
    constructor(imagePath) {
        super();
        this.bgReady = false;
        this.bgImage = new Image();
        this.bgImage.onload = () => {
            this.bgReady = true;
        }
        this.bgImage.src = imagePath;

        this.imageWidth = 800;
        this.imageHeight = 600;
    }

    update(){

    }

    draw(ctx){
        if(this.bgReady){
            ctx.beginPath();
            ctx.drawImage(this.bgImage, 0, 0, this.imageWidth, this.imageHeight);
        }
    }
}

function animate(myGame) {
    myGame.update();
    myGame.draw();

    requestAnimationFrame(function() {
        animate(myGame);
    });
}

var bg = new Background("images/tetris-background.jpeg");
var game = new Game();
game.addSprite(bg);
var introLevel = new IntroLevel(game);
game.addSprite(introLevel);

animate(game);

