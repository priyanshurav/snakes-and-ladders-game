import { gameStatus } from './gameStatus';
import getPlayerAlignmentData from './getPlayerAlignmentData';
import { IPlayer } from './types';

export default (): void => {
  const tokens = document.querySelectorAll<HTMLImageElement>('.token');
  if (!tokens) return;
  const groupedPlayers: IPlayer[][] = [];
  let allPlayers = gameStatus.allPlayers;
  const playerAlignmentData = getPlayerAlignmentData();

  // Grouping the players by their positions.
  while (allPlayers.length !== 0) {
    groupedPlayers.push(
      allPlayers.filter((player) => player.position === allPlayers[0].position)
    );
    allPlayers = allPlayers.filter(
      (player) => player.position !== allPlayers[0].position
    );
  }

  for (let i = 0; i < groupedPlayers.length; i++) {
    for (let j = 0; j < groupedPlayers[i].length; j++) {
      const playerAlignmentCoord =
        playerAlignmentData[groupedPlayers[i].length.toString()];
      if (!playerAlignmentCoord) return;
      const index = gameStatus.allPlayers.findIndex(
        (player) => player.id === groupedPlayers[i][j].id
      );
      gameStatus.replacePlayer(
        {
          ...gameStatus.allPlayers[index],
          alignmentData: {
            bottom: playerAlignmentCoord[j].bottom / gameStatus.boardBlockSize,
            left: playerAlignmentCoord[j].left / gameStatus.boardBlockSize,
          },
        },
        true
      );
    }
  }
};
