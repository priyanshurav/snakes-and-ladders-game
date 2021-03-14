import { cloneDeep } from 'lodash';
import setAccurateTimeout from 'set-accurate-timeout';
import alignTokens from './alignTokens';
import { gameStatus } from './gameStatus';
import getTokenTransitionSpeed from './getTokenTransitionSpeed';

export default async function (
  playerID: number,
  endBlock: number
): Promise<void> {
  const speed = getTokenTransitionSpeed();
  return new Promise<void>((resolve) => {
    (function moveToken(): void {
      const player = cloneDeep(
        gameStatus.allPlayers.find((player) => player.id === playerID)
      );
      if (endBlock > 100) return resolve();
      if (!player) return resolve();
      if (player.isWinned) return resolve();
      if (endBlock === player.position) return resolve();
      if (player.position % 10 === 0) {
        player.coordinates.bottom++;
        gameStatus.playerXDirections[`player${playerID}`] =
          gameStatus.playerXDirections[`player${playerID}`] === 'left'
            ? 'right'
            : 'left';
      } else if (gameStatus.playerXDirections[`player${playerID}`] === 'right')
        player.coordinates.left++;
      else if (gameStatus.playerXDirections[`player${playerID}`] === 'left')
        player.coordinates.left--;
      player.position++;
      gameStatus.replacePlayer(player, true);
      alignTokens();
      setAccurateTimeout(moveToken, speed);
    })();
  });
}
