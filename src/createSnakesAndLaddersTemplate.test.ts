import { OBSTACLE_COUNT } from './constants';
import createSnakesAndLaddersTemplate from './createSnakesAndLaddersTemplate';
import { gameStatus } from './gameStatus';

test(`creates ${OBSTACLE_COUNT} obstacles template`, () => {
  createSnakesAndLaddersTemplate();
  expect(gameStatus.obstaclesTemplate).toHaveLength(OBSTACLE_COUNT);
});
