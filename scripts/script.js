let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
}

updateScoreElement()

function playGame(playerMove) {
  let result = '';

  const computerMove = pickComputerMove();

  if (playerMove === 'scissors') {

    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You won!';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You won!';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You won!';
    }
  }

  if (result === 'You won!') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement()

  document.querySelector('.js-result-el').innerHTML = result;

  document.querySelector('.js-moves-el').innerHTML = `You: ${playerMove}. Computer: ${computerMove}.`;
}


function updateScoreElement() {
  document.querySelector('.js-score-el')
    .innerHTML = `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;
}


function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

document.querySelector('.js-rock-btn')
  .addEventListener('click', () => {
    playGame('rock');
  });
document.querySelector('.js-paper-btn')
  .addEventListener('click', () => {
    playGame('paper');
  });
document.querySelector('.js-scissors-btn')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.querySelector('.js-reset-score-btn').addEventListener('click', () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
});

const autoPlayBtnText = document.querySelector('.auto-play-btn');
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1200);
    isAutoPlaying = true;
    autoPlayBtnText.textContent = 'Stop Play';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoPlayBtnText.textContent = 'Auto Play';
  }
}
