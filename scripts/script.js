let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
}

updateScoreElement()

function playGame(playerMove) {
  let result = '';

  const computerMove = pickComputerMove();

  if (playerMove === '✌️') {

    if (computerMove === '✊') {
      result = 'You lose.';
    } else if (computerMove === '✋') {
      result = 'You won!';
    } else if (computerMove === '✌️') {
      result = 'Tie.';
    }

  } else if (playerMove === '✋') {
    if (computerMove === '✊') {
      result = 'You won!';
    } else if (computerMove === '✋') {
      result = 'Tie.';
    } else if (computerMove === '✌️') {
      result = 'You lose.';
    }
  } else if (playerMove === '✊') {
    if (computerMove === '✊') {
      result = 'Tie.';
    } else if (computerMove === '✋') {
      result = 'You lose.';
    } else if (computerMove === '✌️') {
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
    computerMove = '✊';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = '✋';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = '✌️';
  }

  return computerMove;
}

function autoPlay() {
  setInterval(function () {
    const playerMove = pickComputerMove();
    playGame(playerMove);
  }, 1200);
}
