import { MAX_PLAYER_COUNT, MAX_PLAYER_NAME_LENGTH } from './constants';
import robotIcon from './assets/icons/robot.svg';
import getTokenSize from './getTokenSize';
import { ITokenRenderingTemplate, TokenColors } from './types';
import showSnackbar from './showSnackbar';
import { gameStatus } from './gameStatus';

async function renderPlayerInputs(playerCount: number): Promise<void> {
  const playerInputTemplate = <HTMLTemplateElement>(
    document.getElementById('player-input-template')
  );
  const tokenColorsObjKeys = Object.keys(TokenColors);
  const playerInputsGroupContainer = <HTMLElement>(
    document.getElementById('player-inputs-group-container')
  );
  const playerNameInputs = <HTMLInputElement[]>(
    Array.from(document.querySelectorAll('.player-name-input'))
  );
  const playerInputsGroup = document.createElement('div');
  playerInputsGroup.classList.add('player-inputs-group');
  const previousInputValues = playerNameInputs
    ? playerNameInputs.map((input: HTMLInputElement) => input.value)
    : [];
  playerInputsGroupContainer.innerHTML = '';
  for (let i = 1; i <= playerCount; i++) {
    const playerInputEl = document.importNode(
      playerInputTemplate.content,
      true
    );
    const playerTokenImg = <HTMLImageElement>(
      playerInputEl.querySelector('.player-input-token-img')
    );
    const playerInputBox = <HTMLInputElement>(
      playerInputEl.querySelector('.player-name-input')
    );
    const isComputerBtn = <HTMLLabelElement>(
      playerInputEl.querySelector('.is-computer-btn')
    );
    const checkbox = <HTMLInputElement>(
      playerInputEl.querySelector('input[type="checkbox"]')
    );
    const checkboxID = `is-computer-btn-${i}`;
    isComputerBtn.htmlFor = checkboxID;
    isComputerBtn.id = `${checkboxID}-label`;
    checkbox.id = checkboxID;
    playerTokenImg.src = (
      await import(
        `./assets/tokens/${tokenColorsObjKeys[i - 1].toLowerCase()}.svg`
      )
    ).default;
    const { height, width } = getTokenSize();
    playerTokenImg.width = width;
    playerTokenImg.height = height;
    playerInputBox.value = previousInputValues[i - 1]
      ? previousInputValues[i - 1]
      : `Player ${i}`;
    playerInputBox.maxLength = MAX_PLAYER_NAME_LENGTH;
    isComputerBtn.style.backgroundImage = `url(${robotIcon})`;

    isComputerBtn.addEventListener('click', (e: MouseEvent) => {
      const target = <HTMLLabelElement>e.target;
      const checkboxID = target.id.replace(/-label/g, '');
      const checkbox = <HTMLInputElement>document.getElementById(checkboxID);

      if (target.classList.contains('checked')) {
        target.classList.remove('checked');
        gameStatus.computerPlayerCount--;
      } else if (gameStatus.computerPlayerCount !== playerCount) {
        target.classList.add('checked');
        gameStatus.computerPlayerCount++;
      }

      const allNotCheckedIsComputerBtns = <HTMLButtonElement[]>(
        Array.from(document.querySelectorAll('.is-computer-btn:not(.checked)'))
      );

      if (allNotCheckedIsComputerBtns.length === 1) {
        allNotCheckedIsComputerBtns[0].classList.add('disabled');
      } else {
        allNotCheckedIsComputerBtns.forEach((btn) =>
          btn.classList.remove('disabled')
        );
      }

      if (gameStatus.computerPlayerCount === playerCount) {
        checkbox.checked = false;
        target.classList.remove('checked');
        target.blur();
        gameStatus.computerPlayerCount--;
        return showSnackbar('There must be atleast one human player');
      }
    });

    checkbox.addEventListener('keydown', (e) => {
      const labelID = `${(<HTMLInputElement>e.target).id}-label`;
      const label = <HTMLLabelElement>document.getElementById(labelID);
      if (e.key === 'Enter') label.click();
    });

    checkbox.addEventListener('focus', (e: FocusEvent) => {
      const labelID = `${(<HTMLInputElement>e.target).id}-label`;
      const label = <HTMLLabelElement>document.getElementById(labelID);
      if (gameStatus.computerPlayerCount !== playerCount)
        label.classList.add('focused');
    });

    checkbox.addEventListener('blur', (e) => {
      const labelID = `${(<HTMLInputElement>e.target).id}-label`;
      const label = <HTMLLabelElement>document.getElementById(labelID);
      label.classList.remove('focused');
    });

    playerInputsGroup.appendChild(playerInputEl);
  }
  playerInputsGroupContainer.appendChild(playerInputsGroup);
}

async function switchPlayerCount(e: MouseEvent): Promise<void> {
  if ((<HTMLButtonElement>e.target).classList.contains('selected')) return;
  const askPlayerCountScreen = document.querySelector<HTMLElement>(
    '.ask-player-count-screen'
  );
  const selectedPlayerCountUnderline = document.querySelector<HTMLSpanElement>(
    '.selected-player-count-underline'
  );
  const allPlayerCountOpts = document.querySelectorAll<HTMLButtonElement>(
    '.player-count'
  );
  if (
    !askPlayerCountScreen ||
    !selectedPlayerCountUnderline ||
    !allPlayerCountOpts
  )
    return;

  const serialNumber = parseInt(
    <string>(<HTMLButtonElement>e.target).dataset.serialNumber
  );
  const chosenPlayerCount = parseInt(
    <string>(<HTMLButtonElement>e.target).dataset.playerCount
  );
  const askPlayerCountScreenWidth = parseInt(
    getComputedStyle(askPlayerCountScreen).width.replace(/px/g, ''),
    10
  );
  allPlayerCountOpts.forEach((playerCountEl) =>
    playerCountEl.classList.remove('selected')
  );
  (<HTMLButtonElement>e.target).classList.add('selected');

  selectedPlayerCountUnderline.style.transform = `translateX(${
    serialNumber * (askPlayerCountScreenWidth / (MAX_PLAYER_COUNT - 1))
  }px)`;
  gameStatus.computerPlayerCount = 0;
  await renderPlayerInputs(chosenPlayerCount);
}

function renderPlayerCountOpts(): void {
  const askPlayerCountScreen = document.querySelector<HTMLElement>(
    '.ask-player-count-screen'
  );
  const playerCountContainer = document.querySelector<HTMLElement>(
    '.player-count-container'
  );
  if (!playerCountContainer || !askPlayerCountScreen) return;
  playerCountContainer.innerHTML =
    '<span class="selected-player-count-underline" aria-hidden="true"></span>';
  for (let i = 2; i <= MAX_PLAYER_COUNT; i++) {
    const playerCountEl = document.createElement('button');
    playerCountEl.innerText = i.toString();
    playerCountEl.classList.add(`player-count`);
    playerCountEl.setAttribute('data-player-count', i.toString());
    playerCountEl.setAttribute('data-serial-number', (i - 2).toString());
    playerCountEl.addEventListener('click', switchPlayerCount);
    if (i === 2) playerCountEl.classList.add('selected');
    playerCountContainer.appendChild(playerCountEl);
  }
}

async function createAskGameModeScreen(): Promise<void> {
  const askPlayerCountScreen = document.querySelector<HTMLElement>(
    '.ask-player-count-screen'
  );
  if (!askPlayerCountScreen) return;
  renderPlayerCountOpts();
  await renderPlayerInputs(2);
  askPlayerCountScreen.classList.remove('hide');
}

export default (): Promise<ITokenRenderingTemplate[]> => {
  return new Promise<ITokenRenderingTemplate[]>((resolve) => {
    createAskGameModeScreen().then(() => {
      const startBtn = <HTMLButtonElement>document.querySelector('.start-btn');

      startBtn.addEventListener('click', () => {
        const template: ITokenRenderingTemplate[] = [];
        const colors = Object.values(TokenColors);
        const isComputerBtns = <HTMLLabelElement[]>(
          Array.from(document.querySelectorAll('.is-computer-btn'))
        );
        const playerNameInputs = <HTMLInputElement[]>(
          Array.from(document.querySelectorAll('.player-name-input'))
        );
        for (let i = 0; i < isComputerBtns.length; i++) {
          if (playerNameInputs[i].value.length > MAX_PLAYER_NAME_LENGTH) {
            return showSnackbar(
              `Player name length must not exceed ${MAX_PLAYER_NAME_LENGTH} characters`
            );
          }
          if (!playerNameInputs[i].value.length)
            return showSnackbar('Player name must not be empty');
          const isComputer = isComputerBtns[i].classList.contains('checked');
          template.push({
            color: colors[i],
            isComputer,
            name: playerNameInputs[i].value,
          });
        }
        const askPlayerCountScreen = document.querySelector<HTMLElement>(
          '.ask-player-count-screen'
        );

        // Resetting the player name inputs values back to the dafault values.
        for (let i = 0; i < playerNameInputs.length; i++)
          playerNameInputs[i].value = `Player ${i + 1}`;

        if (askPlayerCountScreen) askPlayerCountScreen.classList.add('hide');
        resolve(template);
      });
    });
  });
};
