import './styles/index.scss';
import initGame from './initGame';
import startGame from './startGame';
import askPlayerCount from './askPlayerCount';
import { closeSnackBar } from './showSnackbar';

export default async function main(): Promise<void> {
  try {
    const gameScreen = document.querySelector<HTMLElement>('.game');
    if (!gameScreen) return;
    // The reason we are hiding the 'game screen' is to prevent distractions at the 'ask player count screen'.
    gameScreen.style.opacity = '0';
    initGame();
    const tokenTemplate = await askPlayerCount();
    closeSnackBar();
    await startGame(tokenTemplate);
    // And, after we start the game we then show the 'game screen' for the user to play the game.
    gameScreen.style.opacity = '1';
  } catch (err) {
    console.error(err);
  }
}

main();
