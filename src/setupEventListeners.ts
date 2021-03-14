import handleDiceClick from './handleDiceClick';
import { restartGame } from './gameStatus';
import scaleScene from './scaleScene';
import closeIcon from './assets/icons/close-black.svg';

export default (): void => {
  const diceEl = document.querySelector<HTMLDivElement>('#dice');
  const restartBtn = document.querySelector<HTMLButtonElement>('#restart-btn');
  const creditBtn = document.getElementById('credit-btn');
  const creditScreenCloseBtn = document.getElementById(
    'credit-screen-close-btn'
  );
  if (!restartBtn || !diceEl || !creditBtn || !creditScreenCloseBtn) return;
  diceEl.addEventListener('click', handleDiceClick);
  window.addEventListener('resize', scaleScene);

  creditBtn.addEventListener('click', () => {
    const creditScreenContainer = document.getElementById(
      'credit-screen-container'
    );
    const creditScreenCloseBtn = document.getElementById(
      'credit-screen-close-btn'
    );
    if (!creditScreenContainer || !creditScreenCloseBtn) return;
    creditScreenCloseBtn.style.backgroundImage = `url(${closeIcon})`;
    creditScreenContainer.classList.remove('hide');
  });

  creditScreenCloseBtn.addEventListener('click', () => {
    const creditScreenContainer = document.getElementById(
      'credit-screen-container'
    );
    if (!creditScreenContainer) return;
    creditScreenContainer.classList.add('hide');
  });

  restartBtn.addEventListener('click', restartGame);
};
