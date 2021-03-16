import { gameStatus } from './gameStatus';
import ladder from './assets/snakeOrLadder/ladder.png';
import snake from './assets/snakeOrLadder/snake.png';
import { capitalize, chunk, intersection } from 'lodash';

export default (): void => {
  const snakesOrLaddersContainer = document.getElementById('snakes-or-ladders');

  const boardBlocks = Array.from(
    document.querySelectorAll<HTMLDivElement>('.board-block')
  );

  if (!snakesOrLaddersContainer || !boardBlocks) return;

  snakesOrLaddersContainer.innerHTML = '';

  const { snakesAndLaddersTemplate } = gameStatus;

  for (let i = 0; i < snakesAndLaddersTemplate.length; i++) {
    const { type, startBlock, endBlock } = snakesAndLaddersTemplate[i];
    const imgEl = document.createElement('img');

    const startBlockEl = boardBlocks.filter(
      (block) => block.innerText === startBlock.toString()
    )[0];

    const endBlockEl = boardBlocks.filter(
      (block) => block.innerText === endBlock.toString()
    )[0];

    const startBlockColumn = <string>startBlockEl.dataset.column;
    const endBlockColumn = <string>endBlockEl.dataset.column;

    const bottom =
      gameStatus.boardBlockSize * 10 -
      startBlockEl.offsetTop -
      gameStatus.boardBlockSize / 2;

    const left = startBlockEl.offsetLeft + gameStatus.boardBlockSize / 5;

    const isOpposite = endBlockColumn < startBlockColumn;

    const endBlockColumnArray: number[] = gameStatus.boardTemplate
      .filter((block) => block.column.toString() === endBlockColumn)
      .map((block) => block.position);

    let startBlockColumnArray: number[] = [];

    const chunkedBoardTemplate = chunk(
      gameStatus.boardTemplate.map((block) => block.position),
      10
    );

    for (let i = 0; i < chunkedBoardTemplate.length; i++)
      if (chunkedBoardTemplate[i].includes(startBlock))
        startBlockColumnArray = chunkedBoardTemplate[i];

    const commonPosition = intersection(
      startBlockColumnArray,
      endBlockColumnArray
    )[0];

    // The triangles base
    const tBase =
      startBlockColumnArray.slice(
        startBlockColumnArray.indexOf(isOpposite ? commonPosition : startBlock),
        startBlockColumnArray.indexOf(isOpposite ? startBlock : commonPosition)
      ).length * gameStatus.boardBlockSize;

    // The triangles perpendicular
    const tPerpendicular =
      endBlockColumnArray.slice(
        endBlockColumnArray.indexOf(endBlock),
        endBlockColumnArray.indexOf(commonPosition)
      ).length * gameStatus.boardBlockSize;

    // The triangles hypotenuse
    const tHypot = Math.hypot(tPerpendicular, tBase);

    const rotationAngle = Math.acos(
      (tHypot * tHypot + tPerpendicular * tPerpendicular - tBase * tBase) /
        (2 * tHypot * tPerpendicular)
    );
    imgEl.alt = capitalize(type);
    imgEl.src = type === 'ladder' ? ladder : snake;
    imgEl.classList.add('snake-or-ladder');
    imgEl.style.bottom = bottom + 'px';
    imgEl.style.left = left + 'px';
    imgEl.height = tHypot + gameStatus.boardBlockSize / 4;
    imgEl.width = gameStatus.boardBlockSize / 2;
    imgEl.style.transform = `rotate(${
      rotationAngle * (isOpposite ? -1 : 1)
    }rad) ${isOpposite ? 'scaleX(-1)' : ''}`;

    snakesOrLaddersContainer.appendChild(imgEl);
  }
};
