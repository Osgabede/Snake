const board = document.querySelector("#board");
const snake = [];
const boardSize = 37; // might initialize as let instead of const to make the progressive difficulty reduce the board size
let snakeLength = 10;
const startPosition = Math.round((boardSize*boardSize)/2-snakeLength);
let snakeDirection;
let snakeSpeed = 70; // the miliseconds between each cell jump (lower = faster)
let gameOver;


// setup the board grid
board.style.gridTemplate = `repeat(${boardSize}, 1fr) / repeat(${boardSize}, 1fr)`
// setup the board divs
for (let i = 0; i < boardSize * boardSize; i++) {
  const cellDiv = document.createElement("div");
  cellDiv.classList.add('cell');
  cellDiv.id = `cell-${i}`;
  board.appendChild(cellDiv);
}

// draw the snake in starting position
for (let i = 0; i < snakeLength; i++) {
  const snakeCell = document.querySelector(`#cell-${startPosition+i}`);
  snake[i] = snakeCell;
  snake[i].classList.add('snake');
}

let snakeHead = snake[snakeLength-1];

document.addEventListener('keydown', function(event) {  // on any key press
  const pressedKey = event.key.toLowerCase();  // save the key pressed on pressedKey
  if (['w', 'a', 's', 'd'].includes(pressedKey)) {  // if its w, a, s or d
    snakeDirection = pressedKey;  // update snakeDirection
  }
})

respawnFruit(); // first fruit

const updateSnakeInterval = setInterval(() => {

  let divToAdd;
  snakeHead.classList.remove('snake-head'); // remove class from snake head

  if (snakeDirection === 'd') {

    divToAdd = document.querySelector(`#cell-${parseInt(snakeHead.id.slice(5))+1}`); // select the right div

    if (divToAdd.classList.contains('snake') || !Boolean((parseInt(snakeHead.id.slice(5))+1) % boardSize)) { // snake bites itself or hits right wall
      gameOver = true; // set game over

    } else {  // snake moves without problem
      divToAdd.classList.add('snake'); // add the snake class to it
      snake.push(divToAdd); // add it to the snake array
    }

  } else if (snakeDirection === 'a') {

    divToAdd = document.querySelector(`#cell-${parseInt(snakeHead.id.slice(5))-1}`); // select the right div
    
    if (divToAdd.classList.contains('snake') || !Boolean(parseInt(snakeHead.id.slice(5)) % boardSize)) { // snake bites itself or hits left wall
      gameOver = true; // set game over

    } else {  // snake moves without problem
      divToAdd.classList.add('snake'); // add the snake class to it
      snake.push(divToAdd); // add it to the snake array
    }

  } else if (snakeDirection === 'w') {

    divToAdd = document.querySelector(`#cell-${parseInt(snakeHead.id.slice(5))-boardSize}`); // select the right div

    if (!divToAdd || divToAdd.classList.contains('snake')) { // snake bites itself or hits top wall
      gameOver = true; // set game over

    } else {  // snake moves without problem
      divToAdd.classList.add('snake'); // add the snake class to it
      snake.push(divToAdd); // add it to the snake array
    }

  } else if (snakeDirection === 's') {
    
    divToAdd = document.querySelector(`#cell-${parseInt(snakeHead.id.slice(5))+boardSize}`); // select the right div

    if (!divToAdd || divToAdd.classList.contains('snake')) { // snake bites itself or hits bottom wall
      gameOver = true; // set game over

    } else {  // snake moves without problem
      divToAdd.classList.add('snake'); // add the snake class to it
      snake.push(divToAdd); // add it to the snake array
    }

  }

  // condition for game over
  if (gameOver) {
    clearInterval(updateSnakeInterval);
    alert('Game Over');
  } else if (divToAdd) { // condition for snake growth (if snake moved)
    if (!divToAdd.classList.contains('fruit')) { // snake moved to a cell without a fruit

      const divToRemove = snake.shift(); // remove the div on the snake's tail
      divToRemove.classList.remove('snake'); // remove the snake class from it

    } else { // snake moved to a cell with a fruit
      respawnFruit(); // respawn a fruit
      snakeLength++; // increase snake length
    }
  }
  
  // update snake head
  snakeHead = snake[snakeLength-1];
  snakeHead.classList.add('snake-head');

}, snakeSpeed);

function respawnFruit () {

  if (document.querySelector('.fruit')) {
    document.querySelector('.fruit').classList.remove('fruit');
  }

  const randNum = Math.floor(Math.random() * ((boardSize*boardSize)+1)); // generate a random number between 0 and 2500
  let randCellDiv;
  do {

    randCellDiv = document.querySelector(`#cell-${randNum}`); // select a random cell 

  } while (randCellDiv.classList.contains('snake')); // if it selected a cell thats part of snake, reselect

  randCellDiv.classList.add('fruit');
}