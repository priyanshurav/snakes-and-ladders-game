import { chunk, random } from 'lodash';
import { OBSTACLE_COUNT } from './constants';
import { gameStatus } from './gameStatus';
import { IObstacle } from './types';

export default (): void => {
  const template: IObstacle[] = [];
  let obstacleCount = 0;
  if (OBSTACLE_COUNT % 2 !== 0)
    throw new Error(`'OBSTACLE_DENSITY' must be an even number`);
  if (OBSTACLE_COUNT > 48)
    throw new Error(`'OBSTACLE_DENSITY' must be less than or equal to 48`);
  while (obstacleCount !== OBSTACLE_COUNT) {
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
    obstacleCount++;
    template.push({
      type: obstacleCount > OBSTACLE_COUNT / 2 ? 'ladder' : 'snake',
      startBlock,
      endBlock,
    });
  }
  gameStatus.obstaclesTemplate = template;
};
