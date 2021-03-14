import renderTokens from './renderTokens';
import renderBoard from './renderBoard';
import renderSnakesAndLadders from './renderSnakesAndLadders';
import scaleScene from './scaleScene';
import createSnakesAndLaddersTemplate from './createSnakesAndLaddersTemplate';
import { gameStatus } from './gameStatus';
import { ITokenRenderingTemplate } from './types';
import setTokenTransitionSpeed from './setTokenTransitionSpeed';
import {
  GAME_START_TEXT_SHOW_DURATION,
  TOKEN_MOVE_TRANSITION_SPEED,
} from './constants';
import setAccurateTimeout from 'set-accurate-timeout';
import handleDiceClick from './handleDiceClick';

export default async function (
  tokenTemplate: ITokenRenderingTemplate[]
): Promise<void> {
  renderBoard();
  createSnakesAndLaddersTemplate();
  renderSnakesAndLadders();
  await renderTokens(tokenTemplate);
  scaleScene();
  setTokenTransitionSpeed(TOKEN_MOVE_TRANSITION_SPEED);

  const gameStartText = document.getElementById('game-start-text');

  if (!gameStartText) return;

  gameStartText.classList.remove('hide');

  const offsettedGameStartTextDuration = GAME_START_TEXT_SHOW_DURATION + 200;
  setAccurateTimeout(() => {
    gameStartText.classList.add('hide');
    gameStatus.isGameStarted = true;
  }, GAME_START_TEXT_SHOW_DURATION);

  setAccurateTimeout(() => {
    if (gameStatus.allPlayers[0] && gameStatus.allPlayers[0].isComputer) {
      gameStatus.isDiceDisabled = false;
      handleDiceClick();
    } else {
      gameStatus.isDiceDisabled = false;
    }
  }, offsettedGameStartTextDuration);
  const buttonGroup = document.querySelector<HTMLDivElement>('#button-group');

  if (!buttonGroup) return;

  buttonGroup.classList.remove('hide');
}
