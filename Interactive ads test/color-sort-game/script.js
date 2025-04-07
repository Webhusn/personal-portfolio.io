// Define the image paths for different colors
const images = {
  green: "images/green.png",
  purpule: "images/purpule.png",
  yellow: "images/yellow.png",
  orange: "images/orange.png",
  blue: "images/blue.png",
  red: "images/red.png" // Added red for hard level
};

let moveCount = 0;
let columns = [
  ["yellow", "purpule", "orange", "orange", "blue", "yellow", "blue", "purpule", "green"],
  ["orange", "green", "green", "purpule", "yellow", "orange", "yellow", "blue", "purpule"],
  ["green", "green", "yellow", "blue", "yellow", "orange", "orange", "blue", "blue"],
  ["green", "orange", "purpule", "orange", "green", "green", "green", "yellow", "yellow"],
  ["purpule", "green", "blue", "yellow", "purpule", "purpule", "yellow", "purpule"],
  ["green", "purpule", "blue", "green", "orange", "orange", "blue", "purpule"],
  ["blue", "orange", "blue", "yellow", "purpule", "blue", "yellow", "orange"]
];
let dragData = null;

// Create the game board by dynamically placing columns
function createBoard() {
  const board = document.getElementById("game-board");
  board.innerHTML = '';

  columns.forEach((stack, colIndex) => {
    const col = document.createElement("div");
    col.className = "column";
    col.dataset.index = colIndex;
    col.setAttribute("data-tick", "");
    col.addEventListener("dragover", e => e.preventDefault());
    col.addEventListener("drop", () => handleDrop(colIndex));

    stack.forEach((color, i) => {
      const block = document.createElement("div");
      block.className = "block";
      block.style.backgroundImage = `url(${images[color]})`; // Use images based on color
      block.setAttribute("draggable", true);
      block.addEventListener("dragstart", () => {
        dragData = {
          from: colIndex,
          index: i,
          color: color
        };
      });
      col.appendChild(block);
    });

    if (stack.length === 12 && stack.every(c => c === stack[0])) {
      col.setAttribute("data-tick", "✔");
    }
    board.appendChild(col);
  });
}

// Handle the drop action when a piece is dropped into a column
function handleDrop(targetCol) {
  if (!dragData) return;
  const fromCol = columns[dragData.from];
  const toCol = columns[targetCol];
  const color = dragData.color;
  const topColor = toCol[toCol.length - 1];
  const canDrop = toCol.length < 12 && (toCol.length === 0 || topColor === color);

  if (canDrop) {
    const moved = fromCol.splice(dragData.index, 1)[0];
    toCol.push(moved);
    dragData = null;
    moveCount++;
    updateScore();
    playDrop();
    createBoard();
    checkWin();
  }
}

// Check if the puzzle is solved by verifying all columns are sorted
function checkWin() {
  const allSorted = columns.every(col =>
    col.length === 0 || (col.length === 12 && col.every(c => c === col[0]))
  );
  if (allSorted) {
    document.getElementById("message").textContent = "🎉 Puzzle Solved!";
    playWin();
  } else {
    document.getElementById("message").textContent = "";
  }
}

// Update the score (move count)
function updateScore() {
  document.getElementById("score").textContent = `Moves: ${moveCount}`;
}

// Reset the game by randomizing the puzzle pieces
function resetGame() {
  const original = [...columns.flat()];
  original.sort(() => Math.random() - 0.5);
  columns = [[], [], [], [], [], [], []]; // Reset to 7 columns for the hard level
  for (let i = 0; i < original.length; i++) {
    columns[i % 7].push(original[i]);
  }
  moveCount = 0;
  createBoard();
  updateScore();
  document.getElementById("message").textContent = "";
}

// Audio for actions
const dropSound = new Audio("sounds/drop.mp3");
const winSound = new Audio("sounds/win.mp3");

function playDrop() {
  dropSound.play();
}
function playWin() {
  winSound.play();
}

// Initialize the board and update the score
createBoard();
updateScore();

// Set the level based on user selection
function setLevel(level) {
  let colors = [];
  if (level === "easy") {
    colors = ["green", "blue", "yellow", "orange"];
    columns = [[], [], [], [], [], []]; // 4 colors, 2 empty columns
  } else if (level === "medium") {
    colors = ["green", "blue", "yellow", "orange", "purpule"];
    columns = [[], [], [], [], [], [], []]; // 5 colors, 2 empty columns
  } else if (level === "hard") {
    colors = ["green", "blue", "yellow", "orange", "purpule", "red"];
    columns = [[], [], [], [], [], [], [], []]; // 6 colors, 1 empty column
  }

  const blocks = colors.flatMap(c => Array(12).fill(c));
  blocks.sort(() => Math.random() - 0.5);
  for (let i = 0; i < blocks.length; i++) {
    columns[i % columns.length].push(blocks[i]);
  }
  moveCount = 0;
  createBoard();
  updateScore();
  document.getElementById("message").textContent = "";
}

// Timer functionality
let timerInterval;
let totalTime = 180; // 3 minutes

function startTimer() {
  clearInterval(timerInterval);
  totalTime = 180;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    totalTime--;
    updateTimerDisplay();
    if (totalTime <= 0) {
      clearInterval(timerInterval);
      document.getElementById("message").textContent = "⏰ Time’s up! Try again.";
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(totalTime / 60).toString().padStart(2, '0');
  const seconds = (totalTime % 60).toString().padStart(2, '0');
  document.getElementById("timer").textContent = `Time: ${minutes}:${seconds}`;
}

function resetGame() {
  const original = [...columns.flat()];
  original.sort(() => Math.random() - 0.5);
  columns = Array(columns.length).fill().map(() => []);
  for (let i = 0; i < original.length; i++) {
    columns[i % columns.length].push(original[i]);
  }
  moveCount = 0;
  createBoard();
  updateScore();
  startTimer();
  document.getElementById("message").textContent = "";
}

function setLevel(level) {
  let colors = [];
  if (level === "easy") {
    colors = ["green", "blue", "yellow", "orange"];
    columns = [[], [], [], [], [], []];
  } else if (level === "medium") {
    colors = ["green", "blue", "yellow", "orange", "purpule"];
    columns = [[], [], [], [], [], [], []];
  } else if (level === "hard") {
    colors = ["green", "blue", "yellow", "orange", "purpule", "red"];
    columns = [[], [], [], [], [], [], [], []];
  }

  const blocks = colors.flatMap(c => Array(12).fill(c));
  blocks.sort(() => Math.random() - 0.5);
  for (let i = 0; i < blocks.length; i++) {
    columns[i % columns.length].push(blocks[i]);
  }
  moveCount = 0;
  createBoard();
  updateScore();
  startTimer();
  document.getElementById("message").textContent = "";
}

// Show intro screen first
document.getElementById("intro-screen").style.display = "flex";

// Start the game after 10 seconds
setTimeout(() => {
  document.getElementById("intro-screen").style.display = "none";
  document.getElementById("game-board").style.display = "flex";
  startTimer();  // Start timer after intro screen
}, 10000);

// Show Play Store button after 25 seconds
setTimeout(() => {
  const btn = document.getElementById('download-btn');
  if (btn) btn.style.display = 'inline-block';
}, 25000);
