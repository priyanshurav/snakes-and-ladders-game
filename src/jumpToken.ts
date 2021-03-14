import setAccurateTimeout from 'set-accurate-timeout';
import getTokenTransitionSpeed from './getTokenTransitionSpeed';
import setTokenTransitionSpeed from './setTokenTransitionSpeed';
import { TOKEN_JUMP_TRANSITION_SPEED } from './constants';
import { chunk, cloneDeep } from 'lodash';
import { gameStatus } from './gameStatus';
import alignTokens from './alignTokens';
import { IPlayer } from './types';

export default (playerID: number, endBlock: number): Promise<void> => {
  const previousSpeed = getTokenTransitionSpeed();
  setTokenTransitionSpeed(TOKEN_JUMP_TRANSITION_SPEED);

  return new Promise<void>((resolve) => {
    const player = <IPlayer>(
      cloneDeep(gameStatus.allPlayers.find((player) => player.id === playerID))
    );
    if (!player) return resolve();
    const boardBlocks = Array.from(
      document.querySelectorAll<HTMLDivElement>('.board-block')
    );
    const endBlockEl = boardBlocks.filter(
      (block) => block.innerText === endBlock.toString()
    )[0];

    player.coordinates.bottom =
      (gameStatus.boardBlockSize * 10 -
        endBlockEl.offsetTop -
        gameStatus.boardBlockSize) /
      gameStatus.boardBlockSize;

    player.coordinates.left = endBlockEl.offsetLeft / gameStatus.boardBlockSize;

    player.position = endBlock;
    const chunkedBoardTemplate = chunk(
      gameStatus.boardTemplate.map((block) => block.position).reverse(),
      10
    );
    for (let i = 0; i < chunkedBoardTemplate.length; i++) {
      if (chunkedBoardTemplate[i].includes(endBlock)) {
        gameStatus.playerXDirections[`player${playerID}`] =
          i % 2 === 0 ? 'right' : 'left';
        break;
      }
    }
    gameStatus.replacePlayer(player, true);

    alignTokens();

    setAccurateTimeout(() => {
      setTokenTransitionSpeed(previousSpeed);
      resolve();
    }, TOKEN_JUMP_TRANSITION_SPEED);
  });
};
