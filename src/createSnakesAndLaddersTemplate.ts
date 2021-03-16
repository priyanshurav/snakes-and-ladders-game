import { chunk, random } from 'lodash';
import { SNAKES_AND_LADDERS_COUNT } from './constants';
import { gameStatus } from './gameStatus';
import { ISnakeOrLadder } from './types';

export default (): void => {
  const template: ISnakeOrLadder[] = [];
  let snakesAndLaddersCount = 0;
  if (SNAKES_AND_LADDERS_COUNT % 2 !== 0)
    throw new Error(`'SNAKES_AND_LADDERS_COUNT' must be an even number`);
  if (SNAKES_AND_LADDERS_COUNT > 48)
    throw new Error(
      `'SNAKES_AND_LADDERS_COUNT' must be less than or equal to 48`
    );
  while (snakesAndLaddersCount !== SNAKES_AND_LADDERS_COUNT) {
    const startBlock = random(2, 90);
    const chunkedBoardTemplate = chunk(
      gameStatus.boardTemplate.map((block) => block.position),
      10
    );

    let endBlockStartRange = 0;
    for (let i = 0; i < chunkedBoardTemplate.length; i++) {
      if (chunkedBoardTemplate[i].includes(startBlock)) {
        endBlockStartRange = Math.min(
          ...chunkedBoardTemplate[i === 0 ? 0 : i - 1]
        );
        break;
      }
    }
    const endBlock = random(endBlockStartRange, 99);
    let isOverLapping = false;
    for (let i = 0; i < template.length; i++) {
      if (
        template[i].startBlock === startBlock ||
        template[i].endBlock === endBlock ||
        template[i].startBlock === endBlock ||
        template[i].endBlock === startBlock
      )
        isOverLapping = true;
    }
    if (isOverLapping) continue;
    snakesAndLaddersCount++;
    template.push({
      type:
        snakesAndLaddersCount > SNAKES_AND_LADDERS_COUNT / 2
          ? 'ladder'
          : 'snake',
      startBlock,
      endBlock,
    });
  }
  gameStatus.snakesAndLaddersTemplate = template;
};
