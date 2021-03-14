import { INITIAL_BOARD_BLOCK_SIZE, BOARD_MARGIN } from './constants';
import { gameStatus } from './gameStatus';
import getTokenSize from './getTokenSize';
import renderSnakesAndLadders from './renderSnakesAndLadders';

export default (): void => {
  const width = document.documentElement.clientWidth;
  if (width < INITIAL_BOARD_BLOCK_SIZE * 10 + BOARD_MARGIN)
    gameStatus.boardBlockSize = (width - BOARD_MARGIN) / 10;
  else if (width > INITIAL_BOARD_BLOCK_SIZE * 10 + BOARD_MARGIN)
    gameStatus.boardBlockSize = INITIAL_BOARD_BLOCK_SIZE;
  document.body.style.setProperty(
    '--board-block-size',
    gameStatus.boardBlockSize + 'px'
  );
  const tokens = document.querySelectorAll<HTMLImageElement>('.token');
  if (!tokens) return;
  const { height: tokenHeight, width: tokenWidth } = getTokenSize();
  for (let i = 0; i < tokens.length; i++) {
    tokens[i].height = tokenHeight;
    tokens[i].width = tokenWidth;
  }
  renderSnakesAndLadders();
};
