import { gameStatus } from './gameStatus';
import rollDice from './rollDice';
import diceAnimation from './assets/animations/dice.gif';
import setAccurateTimeout from 'set-accurate-timeout';

const diceEl = document.querySelector<HTMLDivElement>('#dice');

export default async (): Promise<void> => {
  if (!diceEl) return;
  if (gameStatus.isDiceDisabled || !gameStatus.isGameStarted) return;
  gameStatus.isDiceDisabled = true;

  diceEl.style.backgroundImage = `url(${diceAnimation})`;

  // We are setting a timeout because we want to show the dice animation for a certain amount of time.
  setAccurateTimeout(async () => await rollDice(diceEl), 1200);
};
