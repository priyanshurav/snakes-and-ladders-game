import { chunk, flatten } from 'lodash';
import { gameStatus } from './gameStatus';
import { IBoardGridItem } from './types';

export default (): void => {
  const boardItems: IBoardGridItem[] = [];
  const boardBlocksContainer = document.getElementById('board-blocks');
  if (!boardBlocksContainer) return;
  for (let i = 1; i <= 100; i++)
    boardItems.push(<IBoardGridItem>{
      position: i,
      color: i % 2 === 0 ? 'dark' : 'light',
      column: 0,
    });
  const chunkedArray = chunk(boardItems.reverse(), 10);
  for (let i = 0; i < chunkedArray.length; i++)
    if (i !== 0 && i % 2 !== 0) chunkedArray[i] = chunkedArray[i].reverse();

  for (let i = 0; i < 10; i++)
    for (let j = 0; j < 10; j++) chunkedArray[i][j].column = j;

  const flattenedArray = flatten(chunkedArray);

  boardBlocksContainer.innerHTML = '';
  flattenedArray.forEach((boardBlock) => {
    const el = document.createElement('div');
    el.className = `board-block ${boardBlock.color}-box`;
    el.innerText = boardBlock.position.toString();
    el.setAttribute('data-column', boardBlock.column.toString());
    boardBlocksContainer.appendChild(el);
  });
  gameStatus.boardTemplate = flattenedArray;
};
