import { gameStatus } from './gameStatus';
import getTokenSize from './getTokenSize';
import { ITokenPositions } from './types';

export default (): ITokenPositions => {
  const tokenSize = getTokenSize();

  return {
    '1': [
      {
        bottom: tokenSize.height / 3,
        left: tokenSize.width / 1.5,
      },
    ],
    '2': [
      {
        bottom: tokenSize.height / 3,
        left: 0,
      },
      {
        bottom: tokenSize.height / 3,
        left: gameStatus.boardBlockSize - tokenSize.width,
      },
    ],
    '3': [
      {
        bottom: gameStatus.boardBlockSize - tokenSize.height,
        left: 0,
      },
      {
        bottom: gameStatus.boardBlockSize - tokenSize.height,
        left: gameStatus.boardBlockSize - tokenSize.width,
      },
      {
        bottom: 0,
        left: tokenSize.width / 1.3,
      },
    ],
    '4': [
      {
        bottom: gameStatus.boardBlockSize - tokenSize.height,
        left: 0,
      },
      {
        bottom: gameStatus.boardBlockSize - tokenSize.height,
        left: gameStatus.boardBlockSize - tokenSize.width,
      },
      {
        bottom: 0,
        left: 0,
      },
      {
        bottom: 0,
        left: gameStatus.boardBlockSize - tokenSize.width,
      },
    ],
  };
};
