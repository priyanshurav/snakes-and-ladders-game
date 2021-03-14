import main from '.';
import CurrentGameStatus from './CurrentGameStatus';

export let gameStatus = new CurrentGameStatus();

export async function restartGame(): Promise<void> {
  if (!gameStatus.isGameStarted) return;
  gameStatus = new CurrentGameStatus();
  const winningScreen = document.querySelector('.winning-screen');
  const winningScreenBackDrop = document.querySelector(
    '.winning-screen-back-drop'
  );
  if (winningScreen && winningScreenBackDrop) {
    winningScreen.classList.add('hide');
    winningScreenBackDrop.classList.add('hide');
  }
  gameStatus.computerPlayerCount = 0;
  gameStatus.isGameStarted = false;
  gameStatus.isFirstStart = false;
  await main();
}
