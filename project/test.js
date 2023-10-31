const boardSize = 8;
const tileSize = 50;
const board = [];

// Represents the current player's turn
let currentPlayer = "white";
let selectedPiece = null;

function createTable() {
  const table = document.createElement('table');
  table.setAttribute("class", "table");
  table.style.borderCollapse = "collapse";
  table.style.width = `${boardSize * tileSize}px`;

  for (let i = 0; i < boardSize; ++i) {
    const row = document.createElement("tr");

    for (let j = 0; j < boardSize; ++j) {
      const cell = document.createElement("td");
      cell.style.backgroundColor = (i + j) % 2 === 0 ? "red" : "black";
      cell.style.height = `${tileSize}px`;
      cell.style.width = `${tileSize}px`;
      cell.setAttribute("id", `${j},${i}`);

      if (i <= 2 && cell.style.backgroundColor === "black") {
        // Initialize black pieces
        piece(cell, "gray", j, i);
      }

      if (i >= 5 && cell.style.backgroundColor === "black") {
        // Initialize white pieces
        piece(cell, "white", j, i);
      }

      // Set up event listeners for valid moves
      cell.addEventListener('click', function () {
        const [x, y] = this.id.split(',').map(Number);
        handleCellClick(x, y);
      });

      row.appendChild(cell);
      board.push(cell);
    }

    table.appendChild(row);
  }

  document.body.appendChild(table);
}

function createPiece(fillColor, isKing) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", `${tileSize}`);
  svg.setAttribute("height", `${tileSize}`);

  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", `${tileSize / 2}`);
  circle.setAttribute("cy", `${tileSize / 2}`);
  circle.setAttribute("r", `${tileSize / 2 - 5}`);
  circle.setAttribute("stroke", "black");
  circle.setAttribute("stroke-width", "3");
  circle.setAttribute("fill", fillColor);

  svg.appendChild(circle);

  if (isKing) {
    const crown = document.createElementNS("http://www.w3.org/2000/svg", "path");
    crown.setAttribute("d", "M20 10 L20 5 L25 5 L20 15 L15 5 L20 5 Z");
    crown.setAttribute("fill", "gold");
    svg.appendChild(crown);
  }

  return svg;
}

function piece(td, color, x, y, isKing) {
  const svg = createPiece(color, isKing);
  svg.setAttribute("id", `${x}s${y}`);
  td.appendChild(svg);
}

function handleCellClick(x, y) {
  const cell = document.getElementById(`${x},${y}`);
  if (cell.style.backgroundColor !== "black") return; // Only black cells are playable

  if (cell.classList.contains("highlighted")) {
    const [fromX, fromY] = Object.values(selectedPiece);
    const fromCell = document.getElementById(`${fromX},${fromY}`);
    
    // Check if it's a jump
    const isJump = Math.abs(x - fromX) === 2;
    if (isJump) {
      // Remove the jumped piece
      const jumpedX = (x + fromX) / 2;
      const jumpedY = (y + fromY) / 2;
      const jumpedCell = document.getElementById(`${jumpedX},${jumpedY}`);
      jumpedCell.innerHTML = '';
    }

    // Move the piece to the clicked cell
    movePiece(selectedPiece, x, y);

    // Promote to king if it reaches the opposite side
    if ((currentPlayer === "white" && y === 0) || (currentPlayer === "gray" && y === boardSize - 1)) {
      makeKing(x, y);
    }

    // Reset the board and switch to the next player's turn
    resetBoard();
    currentPlayer = currentPlayer === "white" ? "gray" : "white";
  } else {
    // Highlight valid moves for the selected piece
    resetBoard();
    highlightValidMoves(x, y);
  }
}

function highlightValidMoves(x, y) {
  selectedPiece = { x, y };

  const directions = currentPlayer === "white" ? [-1] : [1];

  for (const direction of directions) {
    const x1 = x - 1;
    const x2 = x + 1;
    const y1 = y + direction;
    
    const cell1 = document.getElementById(`${x1},${y1}`);
    const cell2 = document.getElementById(`${x2},${y1}`);
    
    if (isValidCell(x1, y1) && !hasPiece(cell1)) {
      cell1.classList.add("highlighted");
    } else if (isValidCell(x1, y1) && hasOpponentPiece(x1, y1)) {
      // Check for jump opportunity
      const xJump = x1 - 1;
      const yJump = y1 + direction;
      const jumpCell = document.getElementById(`${xJump},${yJump}`);
      if (isValidCell(xJump, yJump) && !hasPiece(jumpCell)) {
        jumpCell.classList.add("highlighted");
      }
    }
    
    if (isValidCell(x2, y1) && !hasPiece(cell2)) {
      cell2.classList.add("highlighted");
    } else if (isValidCell(x2, y1) && hasOpponentPiece(x2, y1)) {
      // Check for jump opportunity
      const xJump = x2 + 1;
      const yJump = y1 + direction;
      const jumpCell = document.getElementById(`${xJump},${yJump}`);
      if (isValidCell(xJump, yJump) && !hasPiece(jumpCell)) {
        jumpCell.classList.add("highlighted");
      }
    }
  }
}

function isValidCell(x, y) {
  return x >= 0 && x < boardSize && y >= 0 && y < boardSize;
}

function hasPiece(cell) {
  return cell && cell.firstChild;
}

function hasOpponentPiece(x, y) {
  const cell = document.getElementById(`${x},${y}`);
  return cell && cell.firstChild && cell.firstChild.getAttribute("fill") !== currentPlayer;
}

function movePiece(selectedPiece, x, y) {
  const [fromX, fromY] = Object.values(selectedPiece);
  const fromCell = document.getElementById(`${fromX},${fromY}`);
  const toCell = document.getElementById(`${x},${y}`);

  // Clone the piece and move it to the new cell
  const piece = fromCell.firstChild.cloneNode(true);
  toCell.appendChild(piece);

  // Remove the piece from the original cell
  fromCell.removeChild(fromCell.firstChild);
}

function resetBoard() {
  for (const cell of board) {
    cell.classList.remove("highlighted");
  }
}

function makeKing(x, y) {
  const cell = document.getElementById(`${x},${y}`);
  const piece = cell.firstChild;
  piece.setAttribute("fill", "gold"); // Change the piece to a king
  piece.appendChild(createKingCrown());
}

function createKingCrown() {
  const crown = document.createElementNS("http://www.w3.org/2000/svg", "path");
  crown.setAttribute("d", "M20 10 L20 5 L25 5 L20 15 L15 5 L20 5 Z");
  crown.setAttribute("fill", "gold");
  return crown;
}

createTable();