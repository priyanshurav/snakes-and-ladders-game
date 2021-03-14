import { gameStatus, restartGame } from './gameStatus';
import getTokenSize from './getTokenSize';
import { TokenColors } from './types';

export default async (): Promise<void> => {
  gameStatus.isDiceDisabled = true;
  gameStatus.isCheatDisabled = true;

  const tokenColors = Object.values(TokenColors);
  const tokenColorObjKeys = Object.keys(TokenColors);
  const winningScreen = document.querySelector<HTMLElement>('#winning-screen');
  const winnerAndLoserTemplate = document.querySelector<HTMLTemplateElement>(
    '#winner-and-loser-template'
  );
  const winningScreenRestartBtn = document.querySelector<HTMLButtonElement>(
    '#winning-screen-restart-btn'
  );
  const winnersAndLosers = document.querySelector<HTMLDivElement>(
    '#winners-and-losers'
  );
  const winningScreenBackdrop = document.querySelector<HTMLDivElement>(
    '#winning-screen-back-drop'
  );
  if (
    !winningScreen ||
    !winnersAndLosers ||
    !winningScreenRestartBtn ||
    !winnerAndLoserTemplate ||
    !winningScreenBackdrop
  )
    return;
  winnersAndLosers.innerHTML = '';
  for (let i = 0; i < gameStatus.winnersAndLosers.length; i++) {
    const { color, isWinned, name } = gameStatus.winnersAndLosers[i];
    const winnerAndLoser = document.importNode(
      winnerAndLoserTemplate.content,
      true
    );
    const positionEl = winnerAndLoser.querySelector<HTMLSpanElement>(
      '#player-position-number'
    );
    const winningScreenToken = winnerAndLoser.querySelector<HTMLImageElement>(
      '#winning-screen-token'
    );
    const statusTextEl = winnerAndLoser.querySelector<HTMLSpanElement>(
      '#player-status-text'
    );
    const playerNameEl = winnerAndLoser.querySelector<HTMLSpanElement>(
      '#player-name'
    );
    if (!positionEl || !winningScreenToken || !statusTextEl || !playerNameEl)
      return;
    positionEl.innerText = (i + 1).toString();
    const { height, width } = getTokenSize();
    winningScreenToken.width = width;
    winningScreenToken.height = height;
    const tokenFilename = tokenColorObjKeys[
      tokenColors.indexOf(color)
    ].toLowerCase();
    winningScreenToken.src = `/${
      (await import(`./assets/tokens/${tokenFilename}.svg`)).default
    }`;
    statusTextEl.innerText = isWinned ? 'WINNER' : 'LOSER';
    playerNameEl.innerText = name;
    winnersAndLosers.appendChild(winnerAndLoser);
  }

  winningScreenRestartBtn.addEventListener('click', restartGame);
  winningScreen.classList.remove('hide');
  winningScreenBackdrop.classList.remove('hide');
};
