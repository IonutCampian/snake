const snakeSpeed = 10;
var LastRender = 0;
const gameBoard = document.getElementById('game');
const snake = [{x:9, y:6}, {x:10, y: 7}];
var inputKey = {x:0, y:0};
let lastImput = {x: 0, y: 0};
const growBy = 2;
const food = {x: Math.floor(Math.random() * (20 - 1) +1),
                y : Math.floor(Math.random() * (20 - 1) +1)}
document.getElementById("game-over").style.visibility = "hidden";

function game(currentTime) {
    window.requestAnimationFrame(game);
    const secondsToRender = (currentTime - LastRender) / 1000;
    if(secondsToRender < 1 / snakeSpeed) {
        return;
    }
    LastRender = currentTime;
    updateFood();
    updateSnake();
    drawSnake();   
    drawFood();
}

window.requestAnimationFrame(game);

function drawSnake() {
    gameBoard.innerHTML = "";
    for(var i = 0; i < 2; ++i) {
        const snakeBody = document.createElement('div');
        snakeBody.setAttribute("id", "snake");
        snakeBody.style.gridRowStart = snake[i].x;
        snakeBody.style.gridColumnStart = snake[i].y;
        gameBoard.appendChild(snakeBody);
    }
}

function drawFood() {
    const foodPard = document.createElement('div');
    foodPard.setAttribute("id", "food");
    foodPard.style.gridColumnStart = food.y;
    foodPard.style.gridRowStart = food.x;
    gameBoard.appendChild(foodPard);
}

function updateSnake() {
    if(comparePosition(snake[0], food)) {
        growSnake(growBy);
    }
    
    var inputFromKeyboard = returnInput();

    snake[0].x += inputFromKeyboard.x;
    snake[0].y += inputFromKeyboard.y;

}

window.addEventListener('keydown', e => {
    switch(e.key) {
        case "ArrowUp":
        if(lastImput.x !== 0 ){
            break;
        }
        inputKey = {x : -1, y: 0};
        break;
        case "ArrowDown": 
        if(lastImput.x !== 0 ){
            break;
        }
        inputKey = {x: 1, y: 0 };
        break;
        case "ArrowLeft":
        if(lastImput.y !== 0 ){
            break;
        }
        inputKey = {x : 0, y : -1};
        break;
        case "ArrowRight":
        if(lastImput.y !== 0 ){
            break;
        }
        inputKey = {x: 0, y : 1};
        break;
    }
    lastImput = inputKey;
})

function returnInput() {
    return inputKey;
}


function updateFood() {
    if(comparePosition(snake[0], food)) {
       food.x = Math.floor(Math.random() * (20 - 1) + 1);
       food.y = Math.floor(Math.random() * (20 - 1) + 1);
    }
}

function comparePosition(first, second) {
    if(first.x === second.x && first.y === second.y) {
        return true;
    }
    return false;
}

function growSnake(len) {
    for(var i = 0; i < len; ++i){
        snake.push(snake[0]);
    }
}
