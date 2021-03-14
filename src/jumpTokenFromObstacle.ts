import { gameStatus } from './gameStatus';
import jumpToken from './jumpToken';

/**
 * Checks if the token is on an obstacle, if yes it jumps it to the specified position, if no then it does nothing
 */
export default async (): Promise<void> => {
  const currentPlayerPosition = gameStatus.currentPlayer.position;

  const obstacleIndex = gameStatus.obstaclesTemplate.findIndex(
    (obstacle) =>
      obstacle.startBlock === currentPlayerPosition ||
      obstacle.endBlock === currentPlayerPosition
  );

  if (obstacleIndex === -1) return;

  const obstacle = gameStatus.obstaclesTemplate[obstacleIndex];
  if (
    obstacle.type === 'ladder' &&
    currentPlayerPosition === obstacle.startBlock
  ) {
    await jumpToken(gameStatus.currentPlayer.id, obstacle.endBlock);
  } else if (
    obstacle.type === 'snake' &&
    currentPlayerPosition === obstacle.endBlock
  ) {
    await jumpToken(gameStatus.currentPlayer.id, obstacle.startBlock);
  }
};
