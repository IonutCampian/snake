const snakeSpeed = 1;
var LastRender = 0;
const gameBoard = document.getElementById('game');
function game(currentTime) {
    
    window.requestAnimationFrame(game);
    const secondsToRender = (currentTime - LastRender)/1000;
    if(secondsToRender < 1 / snakeSpeed) {
        return;
    }
    LastRender = currentTime;
    console.log(snakeSpeed);

    update();
    draw();
}

window.requestAnimationFrame(game);

const snake = [{x:9, y:5}];

var inputKey = {x:0, y:0};

    window.addEventListener('keydown', e => {
        switch(e.key) {
            case "ArrowUp":
            inputKey = {x : -1, y: 0};
            break;
            case "ArrowDown": 
            inputKey = {x: 1, y: 0 };
            break;
            case "ArrowLeft":
            inputKey = {x : 0, y : -1};
            break;
            case "ArrowRight":
            inputKey = {x: 0, y : 1};
            break;
        }
    })

function returnInputKey() {
    return inputKey;
}

function update() {
    var updateSnake = returnInputKey();
    for(var i = snake.length - 2; i >= 0; --i) {
        snake[i + 1]  = snake[i];
    }
    snake[0].x += updateSnake.x;
    snake[0].y += updateSnake.y;
}

function draw (game) {
    gameBoard.innerHTML = "";
    snake.forEach(part => {
        const snakeBody = document.createElement('div');
        snakeBody.style.gridRowStart = part.x;
        snakeBody.style.gridColumnStart = part.y;
        snakeBody.setAttribute("id", "snake");
        gameBoard.appendChild(snakeBody);
    })
    
}

