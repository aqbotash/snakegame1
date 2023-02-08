const gameBoard = document.querySelector('#gameBoard');

const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#resetBtn');
const easyBtn = document.querySelector('#level');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const ctx=gameBoard.getContext("2d");
const boardBackground = "#516395";
const colorOfSnake = "white";
const snakeBorder = "black";
const foodColor = "#a80526";
const foodBorder = "black";
const unitSize = 25;
let running=false;
let xVelocity = unitSize;
let yVelocity = 0;
let FoodX;
let FoodY;
let score = 0;
let snake = [
    {x:unitSize*4, y:0},
    {x:unitSize*3, y:0},
    {x:unitSize*2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
]
window.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);
gameStart();
function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();

}
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 100)}
    else{
            displayGameOver();
        }}
function clearBoard(){
    ctx.fillStyle=boardBackground;
    ctx.fillRect(0,0,gameWidth,gameHeight);
}
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random()*(max-min)+min)/unitSize)*unitSize;
        console.log(randNum);
        return randNum;
    }
    FoodX = randomFood(0, gameWidth-unitSize);
    FoodY= randomFood(0, gameHeight-unitSize);
    console.log(FoodX);

}
function drawFood(){
    ctx.fillStyle=foodColor;
    ctx.strokeStyle=foodBorder;
    ctx.fillRect(FoodX, FoodY, unitSize, unitSize);
    ctx.strokeRect(FoodX,FoodY, unitSize, unitSize);

}
function drawSnake(){
    ctx.fillStyle=snakeColor;
    ctx.strokeStyle=snakeBorder;
    snake.forEach(snakePart=>{
        ctx.fillRect(snake.x,snake.y, unitSize, unitSize);
        ctx.strokeRect(snake.x,snake.y, unitSize, unitSize);

        
    })
}
function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity }
    snake.unshift(head);
    console.log(snake[0].x, FoodX);
    if(snake[0].x==FoodX&&snake[0].y==FoodY){
        score+=1;
        scoreText.textContent = score;
        createFood();
    }
    else {
        snake.pop();
    }

    console.log(snake[0].x==FoodX&&snake[0].y==FoodY);
}
function drawSnake(){
    ctx.fillStyle=colorOfSnake;
    ctx.strokeStyle = snakeBorder
    snake.forEach(snakePart=>{
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
}
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;
    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    const goingRight = (xVelocity == unitSize);
    switch(true){
        case(keyPressed == LEFT&&!goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        
        case(keyPressed == UP&&!goingDown):
            yVelocity = -unitSize;
            xVelocity = 0;
            break;
        
        case(keyPressed == RIGHT&&!goingLeft):
            xVelocity =unitSize;
            yVelocity = 0;
            break;
        
        case(keyPressed == DOWN&&!goingUp):
            yVelocity = unitSize;
            xVelocity = 0;
            break;
        
    }

}
function checkGameOver(){
if(snake[0].x>gameWidth||snake[0].y>gameHeight||snake[0].y<0||snake[0].x<0){
    running=false;
}
    for(let i = 1;i<snake.length;i++){
        if(snake[i].x==snake[0].x&&snake[i].y==snake[0].y){
            running = false;
        }

    }
}
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle="white";
    ctx.textAlign="center";
    const txt= "Game Over, bruh!";
    ctx.fillText(txt, gameWidth/2, gameHeight/2);
    running = false;
}
function resetGame(){
    xVelocity = unitSize;
    yVelocity = 0;
    score = 0;
    snake = [
        {x:unitSize*4, y:0},
        {x:unitSize*3, y:0},
        {x:unitSize*2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ]
    gameStart();
}
