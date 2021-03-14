import { gameStatus } from './gameStatus';
import getPlayerAlignmentData from './getPlayerAlignmentData';
import getTokenSize from './getTokenSize';
import { ITokenRenderingTemplate, TokenColors } from './types';

export default async (template: ITokenRenderingTemplate[]): Promise<void> => {
  const tokensContainer = document.getElementById('tokens');
  if (!tokensContainer) return;
  const tokenColorObjKeys = Object.keys(TokenColors);
  const playerAlignmentData = getPlayerAlignmentData();
  tokensContainer.innerHTML = '';

  for (let i = 0; i < template.length; i++) {
    const { color, isComputer, name } = template[i];
    const tokenImgEl = document.createElement('img');
    tokenImgEl.classList.add('token');
    tokenImgEl.id = `token-${i}`;
    tokenImgEl.alt = 'Player token';
    const { height, width } = getTokenSize();
    tokenImgEl.width = width;
    tokenImgEl.height = height;
    const tokenFilename = tokenColorObjKeys[i].toLowerCase();
    tokenImgEl.src = `/${
      (await import(`./assets/tokens/${tokenFilename}.svg`)).default
    }`;
    tokensContainer.appendChild(tokenImgEl);
    gameStatus.addPlayer({
      id: i,
      name,
      isComputer,
      color,
      isWinned: false,
      position: 1,
      coordinates: { bottom: 0, left: 0 },
      alignmentData: {
        bottom:
          playerAlignmentData[template.length][i].bottom /
          gameStatus.boardBlockSize,
        left:
          playerAlignmentData[template.length][i].left /
          gameStatus.boardBlockSize,
      },
    });
  }
};
