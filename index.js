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
    board.appendChild(square);
  }

  board.style.gridTemplateColumns = `repeat(${noOfSquares},auto)`;
}
/* Change number of squares button */

const noOfSquaresButton = document.querySelector('#no-of-squares');
noOfSquaresButton.addEventListener('click',changeGrid)

function changeGrid() {
  let noOfSquares = parseInt(prompt('Please enter the number of squares per side of the grid. Please enter a number from 1 to 100.'));
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