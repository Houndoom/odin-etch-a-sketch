/* Global variable */

var colorTimesArray = Array(16*16);
var noOfSquares = 16;

/* Create grid */

function removeSquares() {
  const allSquares = document.querySelectorAll('.square');
  allSquares.forEach(e => e.remove());
}

function createGrid(noOfSquares) {
  const board = document.querySelector('#board');
  for (let i = 1; i <= noOfSquares*noOfSquares; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.setAttribute('data-square-id',i);
    board.appendChild(square);
  }

  board.style.gridTemplateColumns = `repeat(${noOfSquares},auto)`;
  draw();
}

/* Change number of squares button */

const noOfSquaresButton = document.querySelector('#no-of-squares');
noOfSquaresButton.addEventListener('click',changeGrid)

function changeGrid() {
  noOfSquares = parseInt(prompt('Please enter the number of squares per side of the grid. Please enter a number from 1 to 100.'));
  console.log(noOfSquares);
  if (isNaN(noOfSquares)) {
    alert('Please enter a number');
    changeGrid();
    return;
  } else if (noOfSquares >= 1 && noOfSquares <= 100) {
    removeSquares();
    createGrid(noOfSquares);
    return;
  } else {
    alert('Please enter a number from 1 to 100');
    changeGrid();
    return;
  }
}

/* Clear board button */

const clearBoardButton = document.querySelector('#clear-board');
clearBoardButton.addEventListener('click',clearBoard)

function clearBoard() {
  removeSquares();
  createGrid(noOfSquares);
}

/* Color squares */
function draw() {
  const allSquares = document.querySelectorAll('.square');
  allSquares.forEach(e => e.addEventListener('mouseenter',colorSquare));
};

function colorSquare() {
  if (!this.style.backgroundColor) {
    this.style.backgroundColor = getRandomColor();
    this.style.borderColor = this.style.backgroundColor;
    colorTimesArray[this.getAttribute('data-square-id')] = 10;
  } else {
    let colorTimes = colorTimesArray[this.getAttribute('data-square-id')];
      if (colorTimes > 0) {
        colorTimes--;
        let colorRegex = this.style.backgroundColor.split(/[\(,\,\), ]+/);
        newColor = `rgb(${adjustRGB(...colorRegex.slice(1,4),colorTimes)})`;
        this.style.backgroundColor = newColor;
        this.style.borderColor = newColor;
        colorTimesArray[this.getAttribute('data-square-id')] = colorTimes;
      };
  }
};

function adjustRGB(r,g,b,colorTimes) {
  let newr = r*colorTimes/(colorTimes + 1);
  let newg = g*colorTimes/(colorTimes + 1);
  let newb = b*colorTimes/(colorTimes + 1);
  return [newr,newg,newb];
}

function getRandomColor() {
  return `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
}

/* Create initial grid */

createGrid(noOfSquares);