class TShape extends Sprite{
    constructor(x, y,color, grid, score) {
        super(x, y);
        this.color = color;
        this.orientation = 0;
        this.grid = grid;
        this.size = grid.cellSize;
        this.score = score;
        this.blocks = [
            { offsetX: 0, offsetY: 0 },
            { offsetX: 0, offsetY: 1 },
            { offsetX: -1, offsetY: 0 },
            { offsetX: 1, offsetY: 0 }
        ];
        this.counter = 0;
        this.isDone = false;
        this.setupKeyEvents();
        this.rotateAudio = new Audio('audios/rotate-audio.wav');
    }

    setupKeyEvents() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "r") {
                this.rotate();
            } else if (event.key === "ArrowLeft") {
                this.moveLeft();
            } else if (event.key === "ArrowRight") {
                this.moveRight();
            } else if (event.key === "ArrowDown") {
                this.moveDown();
            }
        });
    }

    rotate() {
        if(!this.isDone){
            this.rotateAudio.play();
            if(this.orientation === 0){
                
                if(this.y === 1){
                    //No rotation
                }
                else if(this.grid.cells[this.y - 2][this.x - 10].color !== 'black'){
                    //No rotation
                }
                else{
                    this.orientation = (this.orientation + 1) % 4;
                }
                
            }
            else if(this.orientation === 1){
                
                if(this.x === 19){
                    //No rotation
                }
                else if(this.grid.cells[this.y - 1][this.x - 10 + 1].color !== 'black'){
                    //No rotation
                }
                else{
                    this.orientation = (this.orientation + 1) % 4;
                }
                
            }
            else if(this.orientation === 2){
                
                if(this.y === 14){
                    //No rotation
                }
                else if(this.grid.cells[this.y][this.x - 10].color !== 'black'){
                    //No rotation
                }
                else{
                    this.orientation = (this.orientation + 1) % 4;
                }
                
            }
            else{
                if(this.x === 10){
                    //No rotation
                }
                else if(this.grid.cells[this.y - 1][this.x - 10 - 1].color !== 'black'){
                    //No rotation
                }
                else{
                    this.orientation = (this.orientation + 1) % 4;
                }
            }
        }
    }

    moveLeft(){
        // this.y - 1;
        // this.x - 10;
        if(!this.isDone){
            if((this.orientation === 0 || this.orientation === 1 || this.orientation === 2) && this.x === 11){
                //Don't move
            }
            else if(this.orientation === 3 && this.x === 10){
                //Don't move
            }
            else if(this.orientation === 0 && 
            (this.grid.cells[this.y - 1][this.x - 10 - 2].color !== 'black'
            || this.grid.cells[this.y][this.x - 10 - 1].color !== 'black')){
                //Don't move
            }
            else if(this.orientation === 1 && 
            (this.grid.cells[this.y - 1][this.x - 10 - 2].color !== 'black'
            || this.grid.cells[this.y][this.x - 10 - 1].color !== 'black'
            || this.grid.cells[this.y - 2][this.x - 10 - 1].color !== 'black')){
                //Don't move
            }
            else if(this.orientation === 2 && 
            (this.grid.cells[this.y - 1][this.x - 10 - 2].color !== 'black'
            || this.grid.cells[this.y - 2][this.x - 10 - 1].color !== 'black')){
                //Don't move
            }
            else if(this.orientation === 3 && 
            (this.grid.cells[this.y - 1][this.x - 10 - 1].color !== 'black'
            || this.grid.cells[this.y][this.x - 10 - 1].color !== 'black'
            || this.grid.cells[this.y - 2][this.x - 10 - 1].color !== 'black')){
                //Don't move
            }
            else{
                this.x--;
            }
        }
    }

    moveRight(){
        if(!this.isDone){
            if((this.orientation === 0 || this.orientation === 2 || this.orientation === 3) && this.x === 18){
                //Don't move
            }
            else if(this.orientation === 1 && this.x === 19){
                //Don't move
            }
            else if(this.orientation === 0 && 
            (this.grid.cells[this.y - 1][this.x - 10 + 2].color !== 'black'
            || this.grid.cells[this.y][this.x - 10 + 1].color !== 'black')){
                //Don't move
            }
            else if(this.orientation === 1 && 
            (this.grid.cells[this.y - 1][this.x - 10 + 1].color !== 'black'
            || this.grid.cells[this.y - 2][this.x - 10 + 1].color !== 'black'
            || this.grid.cells[this.y][this.x - 10 + 1].color !== 'black')){
                //Don't move
            }
            else if(this.orientation === 2 && 
            (this.grid.cells[this.y - 1][this.x - 10 + 2].color !== 'black'
            || this.grid.cells[this.y - 2][this.x - 10 + 1].color !== 'black')){
                //Don't move
            }
            else if(this.orientation === 3 && 
            (this.grid.cells[this.y - 1][this.x - 10 + 2].color !== 'black'
            || this.grid.cells[this.y - 2][this.x - 10 + 1].color !== 'black'
            || this.grid.cells[this.y][this.x - 10 + 1].color !== 'black')){
                //Don't move
            }
            else{
                this.x++;
            }
        }
    }

    moveDown(){
        if((this.orientation === 0 || this.orientation === 1 || this.orientation === 3) && this.y === 13){
            this.isDone = true;
        }
        else if(this.orientation === 2 && this.y === 14){
            this.isDone = true;
        }
        else if(this.orientation === 0 && 
        (this.grid.cells[this.y + 1][this.x - 10].color !== 'black'
        || this.grid.cells[this.y][this.x - 10 - 1].color !== 'black'
        || this.grid.cells[this.y][this.x - 10 + 1].color !== 'black')){
            this.isDone = true;
        }
        else if(this.orientation === 1 && 
        (this.grid.cells[this.y + 1][this.x - 10].color !== 'black'
        || this.grid.cells[this.y][this.x - 10 - 1].color !== 'black')){
            this.isDone = true;
        }
        else if(this.orientation === 2 && 
        (this.grid.cells[this.y][this.x - 10].color !== 'black'
        || this.grid.cells[this.y][this.x - 10 - 1].color !== 'black'
        || this.grid.cells[this.y][this.x - 10 + 1].color !== 'black')){
            this.isDone = true;
        }
        else if(this.orientation === 3 && 
        (this.grid.cells[this.y + 1][this.x - 10].color !== 'black'
        || this.grid.cells[this.y][this.x - 10 + 1].color !== 'black')){
            this.isDone = true;
        }
        else{
            this.y++;
        }
    }

    moveUp(){
        this.y--;
    }

    update(){
        if(this.score.score < 1000){
            //counter used to move shape down every second
            this.counter = (this.counter + 1) % 60;
            if(this.counter === 59){
                this.moveDown();
            }
        } else if(this.score.score < 2000){
            // Double the speed
            this.counter = (this.counter + 1) % 30;
            if(this.counter === 29){
                this.moveDown();
            }
        } else if(this.score.score < 3000){
            // Triple the speed
            this.counter = (this.counter + 1) % 20;
            if(this.counter === 19){
                this.moveDown();
            }
        }

        if (this.orientation === 0) {
            
            this.blocks = [
                { offsetX: 0, offsetY: 0 },
                { offsetX: 0, offsetY: 1 },
                { offsetX: -1, offsetY: 0 },
                { offsetX: 1, offsetY: 0 }
            ];
        } else if (this.orientation === 1){
            
            this.blocks = [
                { offsetX: 0, offsetY: 0 },
                { offsetX: -1, offsetY: 0 },
                { offsetX: 0, offsetY: -1 },
                { offsetX: 0, offsetY: 1 }
            ];
        } else if (this.orientation === 2){
            
            this.blocks = [
                { offsetX: 0, offsetY: 0 },
                { offsetX: -1, offsetY: 0 },
                { offsetX: 1, offsetY: 0 },
                { offsetX: 0, offsetY: -1 }
            ];
        } else if (this.orientation === 3){
            
            this.blocks = [
                { offsetX: 0, offsetY: 0 },
                { offsetX: 0, offsetY: -1 },
                { offsetX: 1, offsetY: 0 },
                { offsetX: 0, offsetY: 1 }
            ];
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        for (let block of this.blocks) {
            const cellX = this.x + block.offsetX;
            const cellY = this.y + block.offsetY;
            ctx.fillRect(cellX * this.size, cellY * this.size, this.size, this.size);
            ctx.strokeStyle = "black";
            ctx.strokeRect(cellX * this.size, cellY * this.size, this.size, this.size);
        }
    }
}

class TShapeForNext extends Sprite{
    constructor(x, y,color, grid) {
        super(x, y);
        this.color = color;
        this.orientation = 0;
        this.grid = grid;
        this.size = grid.cellSize;
        this.blocks = [
            { offsetX: 0, offsetY: 0 },
            { offsetX: 0, offsetY: 1 },
            { offsetX: -1, offsetY: 0 },
            { offsetX: 1, offsetY: 0 }
        ];
    }

    update(){
        
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        for (let block of this.blocks) {
            const cellX = this.x + block.offsetX;
            const cellY = this.y + block.offsetY;
            ctx.fillRect(cellX * this.size, cellY * this.size, this.size, this.size);
            ctx.strokeStyle = "black";
            ctx.strokeRect(cellX * this.size, cellY * this.size, this.size, this.size);
        }
    }
}

class ZShape extends Sprite{
    constructor(x, y,color, grid, score) {
        super(x, y);
        this.color = color;
        this.orientation = 0;
        this.grid = grid;
        this.size = grid.cellSize;
        this.score = score;
        this.blocks = [
            { offsetX: 0, offsetY: 0 },
            { offsetX: -1, offsetY: 0 },
            { offsetX: 0, offsetY: 1 },
            { offsetX: 1, offsetY: 1 }
        ];
        this.counter = 0;
        this.isDone = false;
        this.setupKeyEvents();
        this.rotateAudio = new Audio('audios/rotate-audio.wav');
    }

    setupKeyEvents() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "r") {
                this.rotate();
            } else if (event.key === "ArrowLeft") {
                this.moveLeft();
            } else if (event.key === "ArrowRight") {
                this.moveRight();
            } else if (event.key === "ArrowDown") {
                this.moveDown();
            }
        });
    }

    rotate() {
        if(!this.isDone){
            this.rotateAudio.play();
            if(this.orientation === 0){
                
                if(this.y === 1){
                    //No rotation
                }
                else if(this.grid.cells[this.y - 2][this.x - 10].color !== 'black'
                || this.grid.cells[this.y][this.x - 10 - 1].color !== 'black'){
                    //No rotation
                }
                else{
                    this.orientation = (this.orientation + 1) % 2;
                }
                
            }
            else{
                if(this.x === 19){
                    //No rotation
                }
                else if(this.grid.cells[this.y][this.x - 10].color !== 'black' 
                || this.grid.cells[this.y][this.x - 10 + 1].color !== 'black'){
                    //No rotation
                }
                else{
                    this.orientation = (this.orientation + 1) % 2;
                }
            }
        }
    }

    moveLeft(){
        // this.y - 1;
        // this.x - 10;
        if(!this.isDone){
            if((this.orientation === 0 || this.orientation === 1) && this.x === 11){
                //Don't move
            }
            else if(this.orientation === 0 && 
            (this.grid.cells[this.y - 1][this.x - 10 - 2].color !== 'black'
            || this.grid.cells[this.y][this.x - 10 - 1].color !== 'black')){
                //Don't move
            }
            else if(this.orientation === 1 && 
            (this.grid.cells[this.y - 1][this.x - 10 - 2].color !== 'black'
            || this.grid.cells[this.y][this.x - 10 - 2].color !== 'black'
            || this.grid.cells[this.y - 2][this.x - 10 - 1].color !== 'black')){
                //Don't move
            }
            else{
                this.x--;
            }
        }
    }

    moveRight(){
        if(!this.isDone){
            if(this.orientation === 0 && this.x === 18){
                //Don't move
            }
            else if(this.orientation === 1 && this.x === 19){
                //Don't move
            }
            else if(this.orientation === 0 && 
            (this.grid.cells[this.y - 1][this.x - 10 + 1].color !== 'black'
            || this.grid.cells[this.y][this.x - 10 + 2].color !== 'black')){
                //Don't move
            }
            else if(this.orientation === 1 && 
            (this.grid.cells[this.y - 1][this.x - 10 + 1].color !== 'black'
            || this.grid.cells[this.y - 2][this.x - 10 + 1].color !== 'black'
            || this.grid.cells[this.y][this.x - 10].color !== 'black')){
                //Don't move
            }
            else{
                this.x++;
            }
        }
    }

    moveDown(){
        if((this.orientation === 0 || this.orientation === 1) && this.y === 13){
            this.isDone = true;
        }
        else if(this.orientation === 0 && 
        (this.grid.cells[this.y][this.x - 10 - 1].color !== 'black'
        || this.grid.cells[this.y + 1][this.x - 10].color !== 'black'
        || this.grid.cells[this.y + 1][this.x - 10 + 1].color !== 'black')){
            this.isDone = true;
        }
        else if(this.orientation === 1 && 
        (this.grid.cells[this.y][this.x - 10].color !== 'black'
        || this.grid.cells[this.y + 1][this.x - 10 - 1].color !== 'black')){
            this.isDone = true;
        }
        else{
            this.y++;
        }
    }

    moveUp(){
        this.y--;
    }

    update(){
        if(this.score.score < 1000){
            //counter used to move shape down every second
            this.counter = (this.counter + 1) % 60;
            if(this.counter === 59){
                this.moveDown();
            }
        } else if(this.score.score < 2000){
            // Double the speed
            this.counter = (this.counter + 1) % 30;
            if(this.counter === 29){
                this.moveDown();
            }
        } else if(this.score.score < 3000){
            // Triple the speed
            this.counter = (this.counter + 1) % 20;
            if(this.counter === 19){
                this.moveDown();
            }
        }

        if (this.orientation === 0) {
            
            this.blocks = [
                { offsetX: 0, offsetY: 0 },
                { offsetX: -1, offsetY: 0 },
                { offsetX: 0, offsetY: 1 },
                { offsetX: 1, offsetY: 1 }
            ];
        } else {
            
            this.blocks = [
                { offsetX: 0, offsetY: 0 },
                { offsetX: 0, offsetY: -1 },
                { offsetX: -1, offsetY: 0 },
                { offsetX: -1, offsetY: 1 }
            ];
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        for (let block of this.blocks) {
            const cellX = this.x + block.offsetX;
            const cellY = this.y + block.offsetY;
            ctx.fillRect(cellX * this.size, cellY * this.size, this.size, this.size);
            ctx.strokeStyle = "black";
            ctx.strokeRect(cellX * this.size, cellY * this.size, this.size, this.size);
        }
    }
}

class ZShapeForNext extends Sprite{
    constructor(x, y,color, grid) {
        super(x, y);
        this.color = color;
        this.orientation = 0;
        this.grid = grid;
        this.size = grid.cellSize;
        this.blocks = [
            { offsetX: 0, offsetY: 0 },
            { offsetX: -1, offsetY: 0 },
            { offsetX: 0, offsetY: 1 },
            { offsetX: 1, offsetY: 1 }
        ];
    }

    update(){
        
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        for (let block of this.blocks) {
            const cellX = this.x + block.offsetX;
            const cellY = this.y + block.offsetY;
            ctx.fillRect(cellX * this.size, cellY * this.size, this.size, this.size);
            ctx.strokeStyle = "black";
            ctx.strokeRect(cellX * this.size, cellY * this.size, this.size, this.size);
        }
    }
}

class SShape extends Sprite{
    constructor(x, y,color, grid, score) {
        super(x, y);
        this.color = color;
        this.orientation = 0;
        this.grid = grid;
        this.size = grid.cellSize;
        this.score = score;
        this.blocks = [
            { offsetX: 0, offsetY: 0 },
            { offsetX: 1, offsetY: 0 },
            { offsetX: 0, offsetY: 1 },
            { offsetX: -1, offsetY: 1 }
        ];
        this.counter = 0;
        this.isDone = false;
        this.setupKeyEvents();
        this.rotateAudio = new Audio('audios/rotate-audio.wav');
    }

    setupKeyEvents() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "r") {
                this.rotate();
            } else if (event.key === "ArrowLeft") {
                this.moveLeft();
            } else if (event.key === "ArrowRight") {
                this.moveRight();
            } else if (event.key === "ArrowDown") {
                this.moveDown();
            }
        });
    }

    rotate() {
        if(!this.isDone){
            this.rotateAudio.play();
            if(this.orientation === 0){
                
                if(this.y === 1){
                    //No rotation
                }
                else if(this.grid.cells[this.y - 1][this.x - 10 - 1].color !== 'black'
                || this.grid.cells[this.y - 2][this.x - 10 - 1].color !== 'black'){
                    //No rotation
                }
                else{
                    this.orientation = (this.orientation + 1) % 2;
                }
                
            }
            else{
                if(this.x === 19){
                    //No rotation
                }
                else if(this.grid.cells[this.y - 1][this.x - 10 + 1].color !== 'black' 
                || this.grid.cells[this.y - 2][this.x - 10 - 1].color !== 'black'){
                    //No rotation
                }
                else{
                    this.orientation = (this.orientation + 1) % 2;
                }
            }
        }
    }

    moveLeft(){
        // this.y - 1;
        // this.x - 10;
        if(!this.isDone){
            if((this.orientation === 0 || this.orientation === 1) && this.x === 11){
                //Don't move
            }
            else if(this.orientation === 0 && 
            (this.grid.cells[this.y - 1][this.x - 10 - 1].color !== 'black'
            || this.grid.cells[this.y][this.x - 10 - 2].color !== 'black')){
                //Don't move
            }
            else if(this.orientation === 1 && 
            (this.grid.cells[this.y - 1][this.x - 10 - 2].color !== 'black'
            || this.grid.cells[this.y - 2][this.x - 10 - 2].color !== 'black'
            || this.grid.cells[this.y][this.x - 10 - 1].color !== 'black')){
                //Don't move
            }
            else{
                this.x--;
            }
        }
    }

    moveRight(){
        if(!this.isDone){
            if(this.orientation === 0 && this.x === 18){
                //Don't move
            }
            else if(this.orientation === 1 && this.x === 19){
                //Don't move
            }
            else if(this.orientation === 0 && 
            (this.grid.cells[this.y - 1][this.x - 10 + 2].color !== 'black'
            || this.grid.cells[this.y][this.x - 10 + 1].color !== 'black')){
                //Don't move
            }
            else if(this.orientation === 1 && 
            (this.grid.cells[this.y - 2][this.x - 10].color !== 'black'
            || this.grid.cells[this.y - 1][this.x - 10 + 1].color !== 'black'
            || this.grid.cells[this.y][this.x - 10 + 1].color !== 'black')){
                //Don't move
            }
            else{
                this.x++;
            }
        }
    }

    moveDown(){
        if((this.orientation === 0 || this.orientation === 1) && this.y === 13){
            this.isDone = true;
        }
        else if(this.orientation === 0 && 
        (this.grid.cells[this.y + 1][this.x - 10].color !== 'black'
        || this.grid.cells[this.y + 1][this.x - 10 - 1].color !== 'black'
        || this.grid.cells[this.y][this.x - 10 + 1].color !== 'black')){
            this.isDone = true;
        }
        else if(this.orientation === 1 && 
        (this.grid.cells[this.y + 1][this.x - 10].color !== 'black'
        || this.grid.cells[this.y][this.x - 10 - 1].color !== 'black')){
            this.isDone = true;
        }
        else{
            this.y++;
        }
    }

    moveUp(){
        this.y--;
    }

    update(){
        if(this.score.score < 1000){
            //counter used to move shape down every second
            this.counter = (this.counter + 1) % 60;
            if(this.counter === 59){
                this.moveDown();
            }
        } else if(this.score.score < 2000){
            // Double the speed
            this.counter = (this.counter + 1) % 30;
            if(this.counter === 29){
                this.moveDown();
            }
        } else if(this.score.score < 3000){
            // Triple the speed
            this.counter = (this.counter + 1) % 20;
            if(this.counter === 19){
                this.moveDown();
            }
        }

        if (this.orientation === 0) {
            
            this.blocks = [
                { offsetX: 0, offsetY: 0 },
                { offsetX: 1, offsetY: 0 },
                { offsetX: 0, offsetY: 1 },
                { offsetX: -1, offsetY: 1 }
            ];
        } else {
            
            this.blocks = [
                { offsetX: 0, offsetY: 0 },
                { offsetX: 0, offsetY: 1 },
                { offsetX: -1, offsetY: 0 },
                { offsetX: -1, offsetY: -1 }
            ];
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        for (let block of this.blocks) {
            const cellX = this.x + block.offsetX;
            const cellY = this.y + block.offsetY;
            ctx.fillRect(cellX * this.size, cellY * this.size, this.size, this.size);
            ctx.strokeStyle = "black";
            ctx.strokeRect(cellX * this.size, cellY * this.size, this.size, this.size);
        }
    }
}

class SShapeForNext extends Sprite{
    constructor(x, y,color, grid) {
        super(x, y);
        this.color = color;
        this.orientation = 0;
        this.grid = grid;
        this.size = grid.cellSize;
        this.blocks = [
            { offsetX: 0, offsetY: 0 },
            { offsetX: 1, offsetY: 0 },
            { offsetX: 0, offsetY: 1 },
            { offsetX: -1, offsetY: 1 }
        ];
    }

    update(){
        
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        for (let block of this.blocks) {
            const cellX = this.x + block.offsetX;
            const cellY = this.y + block.offsetY;
            ctx.fillRect(cellX * this.size, cellY * this.size, this.size, this.size);
            ctx.strokeStyle = "black";
            ctx.strokeRect(cellX * this.size, cellY * this.size, this.size, this.size);
        }
    }
}

class OShape extends Sprite {
    constructor(x, y, color, grid, score) {
        super(x, y);
        this.color = color;
        this.orientation = 0;
        this.grid = grid;
        this.size = grid.cellSize;
        this.score = score;
        this.blocks = [
            { offsetX: 0, offsetY: 0 },
            { offsetX: 1, offsetY: 0 },
            { offsetX: 0, offsetY: 1 },
            { offsetX: 1, offsetY: 1 }
        ];
        this.counter = 0;
        this.isDone = false;
        this.setupKeyEvents();
    }

    setupKeyEvents() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                this.moveLeft();
            } else if (event.key === "ArrowRight") {
                this.moveRight();
            } else if (event.key === "ArrowDown") {
                this.moveDown();
            }
        });
    }

    moveLeft() {
        if(!this.isDone){
            if(this.x === 10){

            }
            else if(this.grid.cells[this.y - 1][this.x - 10 - 1].color !== 'black'
            || (this.grid.cells[this.y][this.x - 10 - 1].color !== 'black')){
                //Don't move
            }
            else{
                this.x--;
            }
        }
    }

    moveRight() {
        if(!this.isDone){
            if(this.x === 18){

            }
            else if(this.grid.cells[this.y - 1][this.x - 10 + 2].color !== 'black'
            || (this.grid.cells[this.y][this.x - 10 + 2].color !== 'black')){
                //Don't move
            }
            else{
                this.x++;
            }
        }
    }

    moveDown() {
        if(this.y === 13){
            this.isDone = true;
        }
        else if(this.grid.cells[this.y + 1][this.x - 10].color !== 'black'
        || (this.grid.cells[this.y + 1][this.x - 10 + 1].color !== 'black')){
            this.isDone = true;
        }
        else{
            this.y++;
        }
    }

    update() {
        if(this.score.score < 1000){
            //counter used to move shape down every second
            this.counter = (this.counter + 1) % 60;
            if(this.counter === 59){
                this.moveDown();
            }
        } else if(this.score.score < 2000){
            // Double the speed
            this.counter = (this.counter + 1) % 30;
            if(this.counter === 29){
                this.moveDown();
            }
        } else if(this.score.score < 3000){
            // Triple the speed
            this.counter = (this.counter + 1) % 20;
            if(this.counter === 19){
                this.moveDown();
            }
        }

    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        for (let block of this.blocks) {
            const cellX = this.x + block.offsetX;
            const cellY = this.y + block.offsetY;
            ctx.fillRect(cellX * this.size, cellY * this.size, this.size, this.size);
            ctx.strokeStyle = "black";
            ctx.strokeRect(cellX * this.size, cellY * this.size, this.size, this.size);
        }
    }
}

class OShapeForNext extends Sprite {
    constructor(x, y, color, grid) {
        super(x, y);
        this.color = color;
        this.orientation = 0;
        this.grid = grid;
        this.size = grid.cellSize;
        this.blocks = [
            { offsetX: 0, offsetY: 0 },
            { offsetX: 1, offsetY: 0 },
            { offsetX: 0, offsetY: 1 },
            { offsetX: 1, offsetY: 1 }
        ];
    }

    update() {

    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        for (let block of this.blocks) {
            const cellX = this.x + block.offsetX;
            const cellY = this.y + block.offsetY;
            ctx.fillRect(cellX * this.size, cellY * this.size, this.size, this.size);
            ctx.strokeStyle = "black";
            ctx.strokeRect(cellX * this.size, cellY * this.size, this.size, this.size);
        }
    }
}

class LShape extends Sprite {
    constructor(x, y, color, grid, score) {
        super(x, y);
        this.color = color;
        this.orientation = 0;
        this.grid = grid;
        this.size = grid.cellSize;
        this.score = score;
        this.blocks = [
            { offsetX: -1, offsetY: 0 },
            { offsetX: 0, offsetY: 0 },
            { offsetX: 1, offsetY: 0 },
            { offsetX: 1, offsetY: -1 }
        ];
        this.counter = 0;
        this.isDone = false;
        this.setupKeyEvents();
        this.rotateAudio = new Audio('audios/rotate-audio.wav');
    }

    setupKeyEvents() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "r") {
                this.rotate();
            } else if (event.key === "ArrowLeft") {
                this.moveLeft();
            } else if (event.key === "ArrowRight") {
                this.moveRight();
            } else if (event.key === "ArrowDown") {
                this.moveDown();
            }
        });
    }

    rotate() {
        if(!this.isDone){
            this.rotateAudio.play();
            if(this.orientation === 0){
                if(this.y === 14){
                    //No rotation
                }
                else if(this.grid.cells[this.y - 2][this.x - 10].color !== 'black'
                || (this.grid.cells[this.y][this.x - 10].color !== 'black')
                || (this.grid.cells[this.y][this.x - 10 + 1].color !== 'black')){
                    //No rotation
                }
                else{
                    this.orientation = (this.orientation + 1) % 4;
                }
            }
            else if(this.orientation === 1){
                if(this.x === 10){
                    //No rotation
                }
                else if(this.grid.cells[this.y - 1][this.x - 10 - 1].color !== 'black'
                || (this.grid.cells[this.y - 1][this.x - 10 + 1].color !== 'black')
                || (this.grid.cells[this.y][this.x - 10 - 1].color !== 'black')){
                    //No rotation
                }
                else{
                    this.orientation = (this.orientation + 1) % 4;
                }
            }
            else if(this.orientation === 2){
                if(this.grid.cells[this.y - 2][this.x - 10].color !== 'black'
                || (this.grid.cells[this.y][this.x - 10].color !== 'black')
                || (this.grid.cells[this.y - 2][this.x - 10 - 1].color !== 'black')){
                    //No rotation
                }
                else{
                    this.orientation = (this.orientation + 1) % 4;
                }
            }
            else if(this.orientation === 3){
                if(this.x === 19){
                    //No rotation
                }
                else if(this.grid.cells[this.y - 1][this.x - 10 - 1].color !== 'black'
                || (this.grid.cells[this.y - 1][this.x - 10 + 1].color !== 'black')
                || (this.grid.cells[this.y - 2][this.x - 10 + 1].color !== 'black')){
                    //No rotation
                }
                else{
                    this.orientation = (this.orientation + 1) % 4;
                }
            }
        }
    }

    moveLeft() {
        if(!this.isDone){
            if(((this.orientation === 0 || this.orientation === 2 || this.orientation === 3) && this.x === 11)
            || (this.orientation === 1 && this.x === 10)){
                //Don't move
            }
            else if(this.orientation === 0
            && (this.grid.cells[this.y - 2][this.x - 10].color !== 'black'
            || (this.grid.cells[this.y - 1][this.x - 10 - 2].color !== 'black'))){
                //Don't move
            }
            else if(this.orientation === 1
            && (this.grid.cells[this.y - 1][this.x - 10 - 1].color !== 'black'
            || (this.grid.cells[this.y - 2][this.x - 10 - 1].color !== 'black')
            || (this.grid.cells[this.y][this.x - 10 - 1].color !== 'black'))){
                //Don't move
            }
            else if(this.orientation === 2
            && (this.grid.cells[this.y - 1][this.x - 10 - 2].color !== 'black'
            || (this.grid.cells[this.y][this.x - 10 - 2].color !== 'black'))){
                //Don't move
            }
            else if(this.orientation === 3
            && (this.grid.cells[this.y - 2][this.x - 10 - 2].color !== 'black'
            || (this.grid.cells[this.y - 1][this.x - 10 - 1].color !== 'black')
            || (this.grid.cells[this.y][this.x - 10 - 1].color !== 'black'))){
                //Don't move
            }
            else{
                this.x--;
            }
        }
    }

    moveRight() {
        if(!this.isDone){
            if(((this.orientation === 0 || this.orientation === 1 || this.orientation === 2) && this.x === 18)
            || (this.orientation === 3 && this.x === 19)){
                //Don't move
            }
            else if(this.orientation === 0
            && (this.grid.cells[this.y - 1][this.x - 10 + 2].color !== 'black'
            || (this.grid.cells[this.y - 2][this.x - 10 + 2].color !== 'black'))){
                //Don't move
            }
            else if(this.orientation === 1
            && (this.grid.cells[this.y - 1][this.x - 10 + 1].color !== 'black'
            || (this.grid.cells[this.y - 2][this.x - 10 + 1].color !== 'black')
            || (this.grid.cells[this.y][this.x - 10 + 2].color !== 'black'))){
                //Don't move
            }
            else if(this.orientation === 2
            && (this.grid.cells[this.y - 1][this.x - 10 + 2].color !== 'black'
            || (this.grid.cells[this.y][this.x - 10].color !== 'black'))){
                //Don't move
            }
            else if(this.orientation === 3
            && (this.grid.cells[this.y - 2][this.x - 10 + 1].color !== 'black'
            || (this.grid.cells[this.y - 1][this.x - 10 + 1].color !== 'black')
            || (this.grid.cells[this.y][this.x - 10 + 1].color !== 'black'))){
                //Don't move
            }
            else{
                this.x++;
            }
        }
    }

    moveDown() {
        if(((this.orientation === 1 || this.orientation === 2 || this.orientation === 3) && this.y === 13)
        || (this.orientation === 0 && this.y === 14)){
            this.isDone = true;
        }
        else if(this.orientation === 0
        && (this.grid.cells[this.y][this.x - 10 - 1].color !== 'black'
        || (this.grid.cells[this.y][this.x - 10].color !== 'black')
        || (this.grid.cells[this.y][this.x - 10 + 1].color !== 'black'))){
            this.isDone = true;
        }
        else if(this.orientation === 1
        && (this.grid.cells[this.y + 1][this.x - 10].color !== 'black'
        || (this.grid.cells[this.y + 1][this.x - 10 + 1].color !== 'black'))){
            this.isDone = true;
        }
        else if(this.orientation === 2
        && (this.grid.cells[this.y][this.x - 10].color !== 'black'
        || (this.grid.cells[this.y][this.x - 10 + 1].color !== 'black')
        || (this.grid.cells[this.y + 1][this.x - 10 - 1].color !== 'black'))){
            this.isDone = true;
        }
        else if(this.orientation === 3
        && (this.grid.cells[this.y + 1][this.x - 10].color !== 'black'
        || (this.grid.cells[this.y - 1][this.x - 10 - 1].color !== 'black'))){
            this.isDone = true;
        }
        else{
            this.y++;
        }
    }

    moveUp() {
        this.y--;
    }

    update() {
        if(this.score.score < 1000){
            //counter used to move shape down every second
            this.counter = (this.counter + 1) % 60;
            if(this.counter === 59){
                this.moveDown();
            }
        } else if(this.score.score < 2000){
            // Double the speed
            this.counter = (this.counter + 1) % 30;
            if(this.counter === 29){
                this.moveDown();
            }
        } else if(this.score.score < 3000){
            // Triple the speed
            this.counter = (this.counter + 1) % 20;
            if(this.counter === 19){
                this.moveDown();
            }
        }

        if (this.orientation === 0) {
            this.blocks = [
                { offsetX: -1, offsetY: 0 },
                { offsetX: 0, offsetY: 0 },
                { offsetX: 1, offsetY: 0 },
                { offsetX: 1, offsetY: -1 }
            ];
        } else if(this.orientation === 1) {
            this.blocks = [
                { offsetX: 0, offsetY: -1 },
                { offsetX: 0, offsetY: 0 },
                { offsetX: 0, offsetY: 1 },
                { offsetX: 1, offsetY: 1 }
            ];
        } else if(this.orientation === 2) {
            this.blocks = [
                { offsetX: 1, offsetY: 0 },
                { offsetX: 0, offsetY: 0 },
                { offsetX: -1, offsetY: 0 },
                { offsetX: -1, offsetY: 1 }
            ];
        } else if(this.orientation === 3) {
            this.blocks = [
                { offsetX: 0, offsetY: 1 },
                { offsetX: 0, offsetY: 0 },
                { offsetX: 0, offsetY: -1 },
                { offsetX: -1, offsetY: -1 }
            ];
        }

    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        for (let block of this.blocks) {
            const cellX = this.x + block.offsetX;
            const cellY = this.y + block.offsetY;
            ctx.fillRect(cellX * this.size, cellY * this.size, this.size, this.size);
            ctx.strokeStyle = "black";
            ctx.strokeRect(cellX * this.size, cellY * this.size, this.size, this.size);
        }
    }
}

class LShapeForNext extends Sprite {
    constructor(x, y, color, grid) {
        super(x, y);
        this.color = color;
        this.orientation = 0;
        this.grid = grid;
        this.size = grid.cellSize;
        this.blocks = [
            { offsetX: -1, offsetY: 0 },
            { offsetX: 0, offsetY: 0 },
            { offsetX: 1, offsetY: 0 },
            { offsetX: 1, offsetY: -1 }
        ];
    }

    update() {

    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        for (let block of this.blocks) {
            const cellX = this.x + block.offsetX;
            const cellY = this.y + block.offsetY;
            ctx.fillRect(cellX * this.size, cellY * this.size, this.size, this.size);
            ctx.strokeStyle = "black";
            ctx.strokeRect(cellX * this.size, cellY * this.size, this.size, this.size);
        }
    }
}

class IShape extends Sprite{
    constructor(x, y,color, grid, score) {
        super(x, y);
        this.color = color;
        this.orientation = 0;
        this.grid = grid;
        this.size = grid.cellSize;
        this.score = score;
        this.blocks = [
            { offsetX: -1, offsetY: 0 },
            { offsetX: 0, offsetY: 0 },
            { offsetX: 1, offsetY: 0 },
            { offsetX: 2, offsetY: 0 }
        ];
        this.counter = 0;
        this.isDone = false;
        this.setupKeyEvents();
        this.rotateAudio = new Audio('audios/rotate-audio.wav');
    }

    setupKeyEvents() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "r") {
                this.rotate();
            } else if (event.key === "ArrowLeft") {
                this.moveLeft();
            } else if (event.key === "ArrowRight") {
                this.moveRight();
            } else if (event.key === "ArrowDown") {
                this.moveDown();
            }
        });
    }

    rotate() {
        if(!this.isDone){
            this.rotateAudio.play();
            if(this.orientation === 1){
                
                if(this.x === 10 || this.x === 18 || this.x === 19){
                    //No rotation
                }
                else if(this.grid.cells[this.y - 1][this.x - 10 + 1].color !== 'black'
                || this.grid.cells[this.y - 1][this.x - 10 + 2].color !== 'black'
                || this.grid.cells[this.y - 1][this.x - 10 - 1].color !== 'black'){
                    //No rotation
                }
                else{
                    this.orientation = (this.orientation + 1) % 2;
                }
                
            }
            else{
                if(this.y === 1 || this.y === 13 || this.y === 14){
                    //No rotation
                }
                else if(this.grid.cells[this.y - 2][this.x - 10].color !== 'black' 
                || this.grid.cells[this.y][this.x - 10].color !== 'black'
                || this.grid.cells[this.y + 1][this.x - 10].color !== 'black'){
                    //No rotation
                }
                else{
                    this.orientation = (this.orientation + 1) % 2;
                }
            }
        }
    }

    moveLeft(){
        // this.y - 1;
        // this.x - 10;
        if(!this.isDone){
            if((this.orientation === 0 && (this.x - 2 < 10 || this.grid.cells[this.y - 1][this.x - 10 - 2].color !== 'black')) 
            || (this.orientation === 1 && (this.x - 1 < 10 || this.grid.cells[this.y - 1][this.x - 10 - 1].color !== 'black' 
                                                           || this.grid.cells[this.y - 2][this.x - 10 - 1].color !== 'black'
                                                           || this.grid.cells[this.y][this.x - 10 - 1].color !== 'black'
                                                           || this.grid.cells[this.y + 1][this.x - 10 - 1].color !== 'black'))){

                
            }
            else{
                this.x--;
            }
        }
    }

    moveRight(){
        if(!this.isDone){
            if((this.orientation === 0 && (this.x + 3 >= 20 || this.grid.cells[this.y - 1][this.x - 10 + 3].color !== 'black') ) 
            || (this.orientation === 1 && (this.x + 1 >= 20 || this.grid.cells[this.y - 1][this.x - 10 + 1].color !== 'black' 
                                                            || this.grid.cells[this.y - 2][this.x - 10 + 1].color !== 'black'
                                                            || this.grid.cells[this.y][this.x - 10 + 1].color !== 'black'
                                                            || this.grid.cells[this.y + 1][this.x - 10 + 1].color !== 'black'))){

            }
            else{
                this.x++;
            }
        }
    }

    moveDown(){
        if((this.orientation === 0 && (this.y + 1 >= 15 || this.grid.cells[this.y][(this.x - 10)].color != 'black'
                                                        || this.grid.cells[this.y][(this.x - 10 - 1)].color !== 'black'
                                                        || this.grid.cells[this.y][(this.x - 10 + 1)].color !== 'black'
                                                        || this.grid.cells[this.y][(this.x - 10 + 2)].color !== 'black')) 
        || (this.orientation === 1 && (this.y + 3 >= 15 || this.grid.cells[this.y + 2][(this.x - 10)].color !== 'black'))){
            this.isDone = true;
        }
        else{
            this.y++;
        }
    }

    moveUp(){
        this.y--;
    }

    update(){
        if(this.score.score < 1000){
            //counter used to move shape down every second
            this.counter = (this.counter + 1) % 60;
            if(this.counter === 59){
                this.moveDown();
            }
        } else if(this.score.score < 2000){
            // Double the speed
            this.counter = (this.counter + 1) % 30;
            if(this.counter === 29){
                this.moveDown();
            }
        } else if(this.score.score < 3000){
            // Triple the speed
            this.counter = (this.counter + 1) % 20;
            if(this.counter === 19){
                this.moveDown();
            }
        }

        if (this.orientation === 0) {
            // Orientation 0: Horizontal
            this.blocks = [
                { offsetX: -1, offsetY: 0 },
                { offsetX: 0, offsetY: 0 },
                { offsetX: 1, offsetY: 0 },
                { offsetX: 2, offsetY: 0 }
            ];
        } else {
            // Orientation 1: Vertical
            this.blocks = [
                { offsetX: 0, offsetY: -1 },
                { offsetX: 0, offsetY: 0 },
                { offsetX: 0, offsetY: 1 },
                { offsetX: 0, offsetY: 2 }
            ];
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        for (let block of this.blocks) {
            const cellX = this.x + block.offsetX;
            const cellY = this.y + block.offsetY;
            ctx.fillRect(cellX * this.size, cellY * this.size, this.size, this.size);
            ctx.strokeStyle = "black";
            ctx.strokeRect(cellX * this.size, cellY * this.size, this.size, this.size);
        }
    }
}

class IShapeForNext extends Sprite{
    constructor(x, y,color, grid) {
        super(x, y);
        this.color = color;
        this.orientation = 0;
        this.grid = grid;
        this.size = grid.cellSize;
        this.blocks = [
            { offsetX: -1, offsetY: 0 },
            { offsetX: 0, offsetY: 0 },
            { offsetX: 1, offsetY: 0 },
            { offsetX: 2, offsetY: 0 }
        ];
    }

    update(){

    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        for (let block of this.blocks) {
            const cellX = this.x + block.offsetX;
            const cellY = this.y + block.offsetY;
            ctx.fillRect(cellX * this.size, cellY * this.size, this.size, this.size);
            ctx.strokeStyle = "black";
            ctx.strokeRect(cellX * this.size, cellY * this.size, this.size, this.size);
        }
    }
}

class JShape extends Sprite{
    constructor(x, y,color, grid, score) {
        super(x, y);
        this.color = color;
        this.orientation = 0;
        this.grid = grid;
        this.size = grid.cellSize;
        this.score = score;
        this.blocks = [
            { offsetX: 0, offsetY: 0 },
            { offsetX: -1, offsetY: 0 },
            { offsetX: 1, offsetY: 0 },
            { offsetX: 1, offsetY: 1 }
        ];
        this.counter = 0;
        this.isDone = false;
        this.setupKeyEvents();
        this.rotateAudio = new Audio('audios/rotate-audio.wav');
    }

    setupKeyEvents() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "r") {
                this.rotate();
            } else if (event.key === "ArrowLeft") {
                this.moveLeft();
            } else if (event.key === "ArrowRight") {
                this.moveRight();
            } else if (event.key === "ArrowDown") {
                this.moveDown();
            }
        });
    }

    rotate() {
        if(!this.isDone){
            this.rotateAudio.play();
            if(this.orientation === 0){
                
                if(this.y === 1){
                    //No rotation
                }
                else if(this.grid.cells[this.y - 2][this.x - 10].color !== 'black'
                || this.grid.cells[this.y][this.x - 10].color !== 'black'
                || this.grid.cells[this.y][this.x - 10 - 1].color !== 'black'){
                    //No rotation
                }
                else{
                    this.orientation = (this.orientation + 1) % 4;
                }
                
            }
            else if(this.orientation === 1){
                
                if(this.x === 19){
                    //No rotation
                }
                else if(this.grid.cells[this.y - 1][this.x - 10 - 1].color !== 'black'
                || this.grid.cells[this.y - 1][this.x - 10 + 1].color !== 'black'
                || this.grid.cells[this.y - 2][this.x - 10 - 1].color !== 'black'){
                    //No rotation
                }
                else{
                    this.orientation = (this.orientation + 1) % 4;
                }
                
            }
            else if(this.orientation === 2){
                
                if(this.y === 14){
                    //No rotation
                }
                else if(this.grid.cells[this.y - 2][this.x - 10].color !== 'black'
                || this.grid.cells[this.y - 2][this.x - 10 + 1].color !== 'black'
                || this.grid.cells[this.y][this.x - 10].color !== 'black'){
                    //No rotation
                }
                else{
                    this.orientation = (this.orientation + 1) % 4;
                }
                
            }
            else{
                if(this.x === 10){
                    //No rotation
                }
                else if(this.grid.cells[this.y - 1][this.x - 10 - 1].color !== 'black'
                || this.grid.cells[this.y - 1][this.x - 10 + 1].color !== 'black'
                || this.grid.cells[this.y][this.x - 10 + 1].color !== 'black'){
                    //No rotation
                }
                else{
                    this.orientation = (this.orientation + 1) % 4;
                }
            }
        }
    }

    moveLeft(){
        // this.y - 1;
        // this.x - 10;
        if(!this.isDone){
            if((this.orientation === 0 || this.orientation === 1 || this.orientation === 2) && this.x === 11){
                //Don't move
            }
            else if(this.orientation === 3 && this.x === 10){
                //Don't move
            }
            else if(this.orientation === 0 && 
            (this.grid.cells[this.y - 1][this.x - 10 - 2].color !== 'black'
            || this.grid.cells[this.y][this.x - 10].color !== 'black')){
                //Don't move
            }
            else if(this.orientation === 1 && 
            (this.grid.cells[this.y - 1][this.x - 10 - 1].color !== 'black'
            || this.grid.cells[this.y - 2][this.x - 10 - 1].color !== 'black'
            || this.grid.cells[this.y][this.x - 10 - 2].color !== 'black')){
                //Don't move
            }
            else if(this.orientation === 2 && 
            (this.grid.cells[this.y - 1][this.x - 10 - 2].color !== 'black'
            || this.grid.cells[this.y - 2][this.x - 10 - 2].color !== 'black')){
                //Don't move
            }
            else if(this.orientation === 3 && 
            (this.grid.cells[this.y - 1][this.x - 10 - 1].color !== 'black'
            || this.grid.cells[this.y][this.x - 10 - 1].color !== 'black'
            || this.grid.cells[this.y - 2][this.x - 10 - 1].color !== 'black')){
                //Don't move
            }
            else{
                this.x--;
            }
        }
    }

    moveRight(){
        if(!this.isDone){
            if((this.orientation === 0 || this.orientation === 2 || this.orientation === 3) && this.x === 18){
                //Don't move
            }
            else if(this.orientation === 1 && this.x === 19){
                //Don't move
            }
            else if(this.orientation === 0 && 
            (this.grid.cells[this.y - 1][this.x - 10 + 2].color !== 'black'
            || this.grid.cells[this.y][this.x - 10 + 2].color !== 'black')){
                //Don't move
            }
            else if(this.orientation === 1 && 
            (this.grid.cells[this.y - 1][this.x - 10 + 1].color !== 'black'
            || this.grid.cells[this.y - 2][this.x - 10 + 1].color !== 'black'
            || this.grid.cells[this.y][this.x - 10 + 1].color !== 'black')){
                //Don't move
            }
            else if(this.orientation === 2 && 
            (this.grid.cells[this.y - 2][this.x - 10].color !== 'black'
            || this.grid.cells[this.y - 1][this.x - 10 + 2].color !== 'black')){
                //Don't move
            }
            else if(this.orientation === 3 && 
            (this.grid.cells[this.y - 1][this.x - 10 + 1].color !== 'black'
            || this.grid.cells[this.y][this.x - 10 + 1].color !== 'black'
            || this.grid.cells[this.y - 2][this.x - 10 + 2].color !== 'black')){
                //Don't move
            }
            else{
                this.x++;
            }
        }
    }

    moveDown(){
        if((this.orientation === 0 || this.orientation === 1 || this.orientation === 3) && this.y === 13){
            this.isDone = true;
        }
        else if(this.orientation === 2 && this.y === 14){
            this.isDone = true;
        }
        else if(this.orientation === 0 && 
        (this.grid.cells[this.y][this.x - 10].color !== 'black'
        || this.grid.cells[this.y][this.x - 10 - 1].color !== 'black'
        || this.grid.cells[this.y + 1][this.x - 10 + 1].color !== 'black')){
            this.isDone = true;
        }
        else if(this.orientation === 1 && 
        (this.grid.cells[this.y + 1][this.x - 10].color !== 'black'
        || this.grid.cells[this.y + 1][this.x - 10 - 1].color !== 'black')){
            this.isDone = true;
        }
        else if(this.orientation === 2 && 
        (this.grid.cells[this.y][this.x - 10].color !== 'black'
        || this.grid.cells[this.y][this.x - 10 - 1].color !== 'black'
        || this.grid.cells[this.y][this.x - 10 + 1].color !== 'black')){
            this.isDone = true;
        }
        else if(this.orientation === 3 && 
        (this.grid.cells[this.y + 1][this.x - 10].color !== 'black'
        || this.grid.cells[this.y - 1][this.x - 10 + 1].color !== 'black')){
            this.isDone = true;
        }
        else{
            this.y++;
        }
    }

    moveUp(){
        this.y--;
    }

    update(){
        if(this.score.score < 1000){
            //counter used to move shape down every second
            this.counter = (this.counter + 1) % 60;
            if(this.counter === 59){
                this.moveDown();
            }
        } else if(this.score.score < 2000){
            // Double the speed
            this.counter = (this.counter + 1) % 30;
            if(this.counter === 29){
                this.moveDown();
            }
        } else if(this.score.score < 3000){
            // Triple the speed
            this.counter = (this.counter + 1) % 20;
            if(this.counter === 19){
                this.moveDown();
            }
        }

        if (this.orientation === 0) {
            
            this.blocks = [
                { offsetX: 0, offsetY: 0 },
                { offsetX: -1, offsetY: 0 },
                { offsetX: 1, offsetY: 0 },
                { offsetX: 1, offsetY: 1 }
            ];
        } else if (this.orientation === 1){
            
            this.blocks = [
                { offsetX: 0, offsetY: 0 },
                { offsetX: 0, offsetY: -1 },
                { offsetX: 0, offsetY: 1 },
                { offsetX: -1, offsetY: 1 }
            ];
        } else if (this.orientation === 2){
            
            this.blocks = [
                { offsetX: 0, offsetY: 0 },
                { offsetX: 1, offsetY: 0 },
                { offsetX: -1, offsetY: 0 },
                { offsetX: -1, offsetY: -1 }
            ];
        } else if (this.orientation === 3){
            
            this.blocks = [
                { offsetX: 0, offsetY: 0 },
                { offsetX: 0, offsetY: 1 },
                { offsetX: 0, offsetY: -1 },
                { offsetX: 1, offsetY: -1 }
            ];
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        for (let block of this.blocks) {
            const cellX = this.x + block.offsetX;
            const cellY = this.y + block.offsetY;
            ctx.fillRect(cellX * this.size, cellY * this.size, this.size, this.size);
            ctx.strokeStyle = "black";
            ctx.strokeRect(cellX * this.size, cellY * this.size, this.size, this.size);
        }
    }
}

class JShapeForNext extends Sprite{
    constructor(x, y,color, grid) {
        super(x, y);
        this.color = color;
        this.orientation = 0;
        this.grid = grid;
        this.size = grid.cellSize;
        this.blocks = [
            { offsetX: 0, offsetY: 0 },
            { offsetX: -1, offsetY: 0 },
            { offsetX: 1, offsetY: 0 },
            { offsetX: 1, offsetY: 1 }
        ];
    }

    update(){
        
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        for (let block of this.blocks) {
            const cellX = this.x + block.offsetX;
            const cellY = this.y + block.offsetY;
            ctx.fillRect(cellX * this.size, cellY * this.size, this.size, this.size);
            ctx.strokeStyle = "black";
            ctx.strokeRect(cellX * this.size, cellY * this.size, this.size, this.size);
        }
    }
}