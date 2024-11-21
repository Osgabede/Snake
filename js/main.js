const board = document.querySelector("#board");
const snake = [];
let snakeLength = 15;
let snakeDirection;

for (let i = 0; i < 50 * 50; i++) {
  const cellDiv = document.createElement("div");
  cellDiv.classList.add('cell');
  cellDiv.id = `cell-${i}`;
  cellDiv.style.border = "solid 0.5px grey";
  board.appendChild(cellDiv);
}

// start the game
const startPosition = 1257;
for (let i = 0; i < snakeLength; i++) {
  const snakeCell = document.querySelector(`#cell-${startPosition+i}`);
  snake[i] = snakeCell;
  snake[i].classList.add('snake');
}
// ---------------

document.addEventListener('keydown', function(event) {  // on any key press
  const pressedKey = event.key.toLowerCase();  // save the key pressed on pressedKey
  if (['w', 'a', 's', 'd'].includes(pressedKey)) {  // if its w, a, s or d
    snakeDirection = pressedKey;  // update snakeDirection
  }
})

let intervalID = setInterval(function updateSnake() {
  if (snakeDirection === 'd') {

    const divToAdd = document.querySelector(`#cell-${parseInt(snake[snakeLength-1].id.slice(5))+1}`); // select the right div
    
    if (!divToAdd.classList.contains('snake')) { // can move that way

      divToAdd.classList.add('snake'); // add the snake class to it
      snake.push(divToAdd); // add it to the snake array

      const divToRemove = snake.shift(); // remove the div on the snake's tail
      divToRemove.classList.remove('snake'); // remove the snake class from it

    } else {  // snake bites itself
      clearInterval(intervalID);
      alert('game over');
    }

  } else if (snakeDirection === 'a') {

    const divToAdd = document.querySelector(`#cell-${parseInt(snake[snakeLength-1].id.slice(5))-1}`); // select the right div
    
    if (!divToAdd.classList.contains('snake')) { // can move that way

      divToAdd.classList.add('snake'); // add the snake class to it
      snake.push(divToAdd); // add it to the snake array

      const divToRemove = snake.shift(); // remove the div on the snake's tail
      divToRemove.classList.remove('snake'); // remove the snake class from it

    } else {  // snake bites itself
      clearInterval(intervalID);
      alert('game over');
    }

  } else if (snakeDirection === 'w') {

    const divToAdd = document.querySelector(`#cell-${parseInt(snake[snakeLength-1].id.slice(5))-50}`); // select the right div
    
    if (!divToAdd.classList.contains('snake')) { // can move that way

      divToAdd.classList.add('snake'); // add the snake class to it
      snake.push(divToAdd); // add it to the snake array

      const divToRemove = snake.shift(); // remove the div on the snake's tail
      divToRemove.classList.remove('snake'); // remove the snake class from it

    } else {  // snake bites itself
      clearInterval(intervalID);
      alert('game over');
    }

  } else if (snakeDirection === 's') {

    const divToAdd = document.querySelector(`#cell-${parseInt(snake[snakeLength-1].id.slice(5))+50}`); // select the right div

    if (!divToAdd.classList.contains('snake')) { // can move that way

      divToAdd.classList.add('snake'); // add the snake class to it
      snake.push(divToAdd); // add it to the snake array

      const divToRemove = snake.shift(); // remove the div on the snake's tail
      divToRemove.classList.remove('snake'); // remove the snake class from it

    } else {  // snake bites itself
      clearInterval(intervalID);
      alert('game over');
    }

  }
}, 300);
