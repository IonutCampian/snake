const snakeSpeed = 5;
var LastRender = 0;
const gameBoard = document.getElementById('game');
const snake = [{x:9, y:6}, {x:9, y: 5}, {x: 9, y: 4}];
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

function drawSnake () {
    gameBoard.innerHTML = "";
    snake.forEach(part => {
        const snakeBody = document.createElement('div');
        snakeBody.setAttribute("id", "snake");
        snakeBody.style.gridRowStart = part.x;
        snakeBody.style.gridColumnStart = part.y;
        gameBoard.appendChild(snakeBody);
    })
}
function drawFood() {
    const foodPard = document.createElement('div');
    foodPard.setAttribute("id", "food");
    foodPard.style.gridColumnStart = food.y;
    foodPard.style.gridRowStart = food.x;
    gameBoard.appendChild(foodPard);
}

function updateSnake() {
    var inputFromKeyboard = returnInput();
    for(var i = snake.length-2; i >= 0; --i){
       snake[i +1] = {...snake[i]};
    }
    
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
        for(var i = 0; i <growBy; ++i){
            snake.push(snake[snake.length - 1])
        }
      
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
