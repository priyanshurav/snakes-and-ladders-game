import setupEventListeners from './setupEventListeners';
import diceFace1 from './assets/dice/1.svg';
import restartIcon from './assets/icons/restart.svg';
import { GAME_START_TEXT_SHOW_DURATION } from './constants';
import { gameStatus } from './gameStatus';

export default (): void => {
  const dice = document.getElementById('dice');
  const restartBtn = document.querySelector<HTMLButtonElement>('#restart-btn');
  if (!dice || !restartBtn) return;
  document.body.style.setProperty(
    '--game-start-text-show-duration',
    GAME_START_TEXT_SHOW_DURATION + 'ms'
  );
  dice.style.backgroundImage = `url(${diceFace1})`;
  restartBtn.style.backgroundImage = `url(${restartIcon})`;
  if (gameStatus.isFirstStart) setupEventListeners();
};
