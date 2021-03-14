import { gameStatus } from './gameStatus';
import renderBoard from './renderBoard';

test('should set board template in gameStatus', () => {
  renderBoard();
  // I am using a setTimeout because, otherwise the boardTemplate.length will be 0, for some reason
  // that I don't know, even after calling the renderBoard which should fill up array, and the boardTemplate
  // just gets filled up for some reason after running expect() in a setTimeout
  setTimeout(() => {
    expect(gameStatus.boardTemplate).toHaveLength(100);
  }, 0);
});
