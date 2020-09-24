const cards = document.querySelectorAll(".memory-card");
let hasFlippedCard = false;
let firstCard, secondCard, interval;
let lockBoard = false;
let moves = 0;
let matchNum = 0;
// Declaring move variable
let counter = document.querySelector(".moves");
let starOver = document.getElementById("restart");

// Declaring the timer variables
let second = 1;
let minute = 0;
let timer = document.querySelector(".timer");

shuffleCards();

cards.forEach(function (e) {
  e.addEventListener("click", flipCard);
});

function flipCard() {
  if (firstClick) startTimer();
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    // First click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  // Second click
  hasFlippedCard = false;
  secondCard = this;
  moveCounter();
  console.log(`returned to second click- ${moves}`);
  // Do the cards match?
  checkForMatch();
  if (starOver.addEventListener("click", resetGame)) {
  }
}

function cardsMatch() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matchNum++;
  console.log(`number of matching cards- ${matchNum}`);
  if (matchNum === 6) {
    alert(`You win with a score of ${moves}. Pleass OK btn to play again`);
    location.reload();
  }

  resetBoard();
}
function noMatch() {
  lockBoard = true;
  function noJoy() {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
    resetBoard();
  }
  setTimeout(noJoy, 1000);
}
function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    // Cards match
    cardsMatch();
  } else {
    // Cards do not match
    noMatch();
  }
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

function shuffleCards() {
  firstClick = true;
  cards.forEach(function (e) {
    let ramdomPos = Math.floor(Math.random() * 12);
    e.style.order = ramdomPos;
  });
}

function moveCounter() {
  moves++;
  counter.innerHTML = `Moves: ${moves}`;
  return moves;
}

function startTimer() {
  firstClick = false;
  let tensMin = 0;
  let tensSec = 0;
  interval = setInterval(function () {
    timer.innerHTML = `Time: ${tensMin}${minute}:${tensSec}${second}`;
    second++;
    if (second === 10) {
      tensSec++;
      second = 0;
    }
    if (tensSec === 6) {
      minute++;
      tensSec = 0;
    }
    if (minute === 10) {
      tensMin++;
      minute = 0;
    }
  }, 1000);
}

function resetGame() {
  alert(
    `You made ${moves} moves but you did not complete the game. Press OK button to play again.`
  );
  location.reload();
}
