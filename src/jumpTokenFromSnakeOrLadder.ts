import { gameStatus } from './gameStatus';
import jumpToken from './jumpToken';

/**
 * Checks if the token is on an snake or ladder, if yes it jumps it to the specified position, if no then it does nothing
 */
export default async (): Promise<void> => {
  const currentPlayerPosition = gameStatus.currentPlayer.position;

  const snakeOrLadderIndex = gameStatus.snakesAndLaddersTemplate.findIndex(
    (snakeOrLadder) =>
      snakeOrLadder.startBlock === currentPlayerPosition ||
      snakeOrLadder.endBlock === currentPlayerPosition
  );

  if (snakeOrLadderIndex === -1) return;

  const snakeOrLadder = gameStatus.snakesAndLaddersTemplate[snakeOrLadderIndex];
  if (
    snakeOrLadder.type === 'ladder' &&
    currentPlayerPosition === snakeOrLadder.startBlock
  ) {
    await jumpToken(gameStatus.currentPlayer.id, snakeOrLadder.endBlock);
  } else if (
    snakeOrLadder.type === 'snake' &&
    currentPlayerPosition === snakeOrLadder.endBlock
  ) {
    await jumpToken(gameStatus.currentPlayer.id, snakeOrLadder.startBlock);
  }
};
