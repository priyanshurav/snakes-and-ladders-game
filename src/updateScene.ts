import { gameStatus } from './gameStatus';
import getTokenSize from './getTokenSize';

const currentPlayerColorEl = document.getElementById('current-player-color');
const diceEl = document.querySelector<HTMLDivElement>('#dice');
const currentPlayerName = document.getElementById('current-player-name');

export default (): void => {
  if (gameStatus.allPlayers.length === 0) return;

  const { currentPlayer } = gameStatus;

  const tokens = Array.from(
    document.querySelectorAll<HTMLImageElement>('.token')
  );

  if (
    !tokens ||
    !diceEl ||
    !currentPlayerName ||
    !currentPlayerColorEl ||
    !currentPlayer
  )
    return;

  if (gameStatus.isDiceDisabled) {
    diceEl.classList.remove('enabled');
    diceEl.classList.add('disabled');
  } else {
    diceEl.classList.add('enabled');
    diceEl.classList.remove('disabled');
  }

  currentPlayerColorEl.style.backgroundColor = currentPlayer.color;

  currentPlayerName.innerText = currentPlayer.name;

  const tokenHeight = getTokenSize().height;

  // Applying the coordinates of the tokens.
  for (let i = 0; i < gameStatus.allPlayers.length; i++) {
    const { coordinates, alignmentData } = gameStatus.allPlayers[i];
    const token = tokens[i];
    if (!token) break;

    const tokenBottom =
      (coordinates.bottom + alignmentData.bottom) * gameStatus.boardBlockSize;

    const tokenLeft =
      (coordinates.left + alignmentData.left) * gameStatus.boardBlockSize;

    token.style.transform = `translate(${tokenLeft}px, ${
      gameStatus.boardBlockSize * 10 - (tokenBottom + tokenHeight)
    }px)`;
  }
};
