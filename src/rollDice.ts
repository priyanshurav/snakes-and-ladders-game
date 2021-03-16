import { gameStatus } from './gameStatus';
import diceFace1 from './assets/dice/1.svg';
import diceFace2 from './assets/dice/2.svg';
import diceFace3 from './assets/dice/3.svg';
import diceFace4 from './assets/dice/4.svg';
import diceFace5 from './assets/dice/5.svg';
import diceFace6 from './assets/dice/6.svg';
import moveToken from './moveToken';
import changeTurn from './changeTurn';
import jumpTokenFromSnakeOrLadder from './jumpTokenFromSnakeOrLadder';
import showSnackbar from './showSnackbar';
import setAccurateTimeout from 'set-accurate-timeout';

export default async (diceEl: HTMLDivElement): Promise<void> => {
  if (!gameStatus.currentPlayer && gameStatus.allPlayers.length === 0) return;
  const randomNumber = 1 + Math.floor(Math.random() * 6);
  switch (randomNumber) {
  case 1:
    diceEl.style.backgroundImage = `url(${diceFace1})`;
    break;
  case 2:
    diceEl.style.backgroundImage = `url(${diceFace2})`;
    break;
  case 3:
    diceEl.style.backgroundImage = `url(${diceFace3})`;
    break;
  case 4:
    diceEl.style.backgroundImage = `url(${diceFace4})`;
    break;
  case 5:
    diceEl.style.backgroundImage = `url(${diceFace5})`;
    break;
  case 6:
    diceEl.style.backgroundImage = `url(${diceFace6})`;
    break;
  default:
    break;
  }

  const isSmallerNumberRequiredToWin =
    gameStatus.currentPlayer.position + randomNumber > 100;

  const isSnackbarNeeded =
    isSmallerNumberRequiredToWin && !gameStatus.currentPlayer.isComputer;

  if (isSnackbarNeeded)
    showSnackbar(`You need a number less than ${randomNumber} to win`);

  if (!isSnackbarNeeded)
    await moveToken(
      gameStatus.currentPlayer.id,
      gameStatus.currentPlayer.position + randomNumber
    );

  await jumpTokenFromSnakeOrLadder();

  const isTimerRequired =
    gameStatus.winnersAndLosers.length === gameStatus.allPlayers.length - 1 ||
    isSmallerNumberRequiredToWin;

  if (gameStatus.currentPlayer.position === 100) {
    gameStatus.replacePlayer(
      { ...gameStatus.currentPlayer, isWinned: true },
      false
    );
    gameStatus.addWinnerOrLoser(gameStatus.currentPlayer);
  }

  if (isTimerRequired) {
    setAccurateTimeout(changeTurn, 1500);
  } else {
    await changeTurn();
  }
};
