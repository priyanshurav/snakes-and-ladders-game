import { SNAKES_AND_LADDERS_COUNT } from './constants';
import createSnakesAndLaddersTemplate from './createSnakesAndLaddersTemplate';
import { gameStatus } from './gameStatus';

test(`creates ${SNAKES_AND_LADDERS_COUNT} snakes and ladders template`, () => {
  createSnakesAndLaddersTemplate();
  expect(gameStatus.snakesAndLaddersTemplate).toHaveLength(
    SNAKES_AND_LADDERS_COUNT
  );
});
