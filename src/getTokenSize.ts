import { gameStatus } from './gameStatus';
import { ITokenSize } from './types';

export default (): ITokenSize => {
  return {
    height: gameStatus.boardBlockSize / 1.5,
    width: gameStatus.boardBlockSize / 2.5,
  };
};
