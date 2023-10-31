let currentPlayer = 'white'; // Initialize the current player

// Create the initial checkers board
function createCheckersBoard() {
  const boardSize = 8;
  const table = document.createElement('table');
  table.classList.add("Board");
  table.style.borderCollapse = "collapse";
  table.style.width = "400px";

  for (let row = 0; row < boardSize; row++) {
    const tr = document.createElement("tr");

    for (let col = 0; col < boardSize; col++) {
      const td = document.createElement("td");
      const squareColor = (row + col) % 2 === 0 ? "black" : "white";
      td.style.backgroundColor = squareColor;
      td.style.height = "40px";
      td.style.width = "40px";
      td.setAttribute("id", col + "," + row);

      // Add event listener to handle piece movement
      td.addEventListener('click', function () {
        movePiece(td);
      });

      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  document.getElementsByClassName("table")[0].appendChild(table);
}

// Create the checkers pieces for the initial setup
function initializeCheckersPieces() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 0) {
        const td = document.getElementById(col + "," + row);
        addPiece(td, "black");
      }
    }
  }

  for (let row = 5; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 0) {
        const td = document.getElementById(col + "," + row);
        addPiece(td, "white");
      }
    }
  }
}

// Function to add a piece to a square
function addPiece(td, color) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "40");
  svg.setAttribute("height", "40");

  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", "20");
  circle.setAttribute("cy", "20");
  circle.setAttribute("r", "15");
  circle.setAttribute("stroke", "black");
  circle.setAttribute("stroke-width", "3");
  circle.setAttribute("fill", color);
  svg.appendChild(circle);

  td.appendChild(svg);
  td.hasPiece = true; // Mark the square as having a piece
  td.pieceColor = color; // Set the piece color
}

// Function to move a piece
function movePiece(td) {
  if (td.hasPiece && td.pieceColor === currentPlayer) {
    const selectedPiece = td;
    const selectedCoords = selectedPiece.getAttribute("id").split(",");

    // Example: Iterate through adjacent squares to check for jumps
    const adjacentSquares = getAdjacentSquares(selectedCoords);

    for (const adjSquare of adjacentSquares) {
      if (isValidJump(selectedCoords, adjSquare)) {
        const targetSquare = getJumpTarget(selectedCoords, adjSquare);

        if (isValidMove(selectedCoords, targetSquare)) {
          performJump(selectedPiece, selectedCoords, targetSquare);
        }
      }
    }
  }
}

function getAdjacentSquares(coords) {
  // Return an array of coordinates of adjacent squares
  // Implement the logic for your board's layout
  // Example: For a standard 8x8 board, include [left, right, forward, backward, and diagonals]
  const x = parseInt(coords[0]);
  const y = parseInt(coords[1]);
  const left = [x - 1, y];
  const right = [x + 1, y];
  const forward = [x, y - 1];
  const backward = [x, y + 1];
  const diagonals = [[x - 1, y - 1], [x + 1, y - 1], [x - 1, y + 1], [x + 1, y + 1]];

  return [left, right, forward, backward, ...diagonals];
}

function isValidJump(sourceCoords, adjacentCoords) {
  // Implement logic to validate if a jump is possible
  // Ensure there's an opponent's piece to jump over and a vacant square to land on
  return true; // Replace with actual logic
}

function getJumpTarget(sourceCoords, adjacentCoords) {
  // Calculate the coordinates of the square to jump to
  // Example: You can average the coordinates
  const x = (parseInt(sourceCoords[0]) + parseInt(adjacentCoords[0])) / 2;
  const y = (parseInt(sourceCoords[1]) + parseInt(adjacentCoords[1])) / 2;

  return [x, y];
}

function performJump(selectedPiece, sourceCoords, targetSquare) {
  const targetCoords = targetSquare.getAttribute("id").split(",");

  // Remove the piece being jumped over
  const jumpedPiece = document.getElementById(targetCoords[0] + "," + targetCoords[1]);
  jumpedPiece.hasPiece = false;
  jumpedPiece.removeChild(jumpedPiece.firstChild);

  // Move the jumping piece
  targetSquare.appendChild(selectedPiece.firstChild);
  sourceCoords = targetCoords;

  // Check for king promotion
  if (shouldPromoteKing(targetSquare)) {
    promoteToKing(targetSquare);
  }

  // Check for win conditions
  if (isWinConditionMet()) {
    // Implement logic for win conditions
    alert(currentPlayer + " wins!");
  }

  currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
}

function shouldPromoteKing(targetSquare) {
  // Implement logic to determine if a piece should be promoted to a king
  return true; // Replace with actual logic
}

function promoteToKing(targetSquare) {
  // Promote a piece to a king
  // Implement logic for promoting a piece to a king
}

function isValidMove(sourceCoords, targetCoords) {
  // Implement logic to validate if a move is valid
  return true; // Replace with actual logic
}

function isWinConditionMet() {
  // Implement logic to check if a win condition is met
  return false; // Replace with actual win conditions
}

// ...

// Initialize the checkers board and pieces
createCheckersBoard();
initializeCheckersPieces();