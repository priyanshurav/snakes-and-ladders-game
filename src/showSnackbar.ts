import closeIcon from './assets/icons/close-white.svg';

let timeout: ReturnType<typeof setTimeout> | null = null;

export function closeSnackBar(): void {
  const snackBarCloseBtn = document.querySelector<HTMLButtonElement>(
    '.snackbar-close-btn'
  );
  const snackBarContainer = document.querySelector<HTMLDivElement>(
    '.snackbar-container'
  );
  if (!snackBarCloseBtn || !snackBarContainer) return;
  snackBarCloseBtn.removeEventListener('click', closeSnackBar);
  if (timeout) clearTimeout(timeout);
  snackBarContainer.remove();
}

export default (text: string, delay = 7000): void => {
  if (document.querySelector('.snackbar-container') !== null) return;
  const snackBarContainer = document.createElement('div');
  snackBarContainer.classList.add('snackbar-container');
  const snackBarEl = document.createElement('div');
  snackBarEl.classList.add('snackbar');
  const snackBarText = document.createElement('span');
  snackBarText.innerText = text;
  snackBarEl.appendChild(snackBarText);
  const snackBarCloseBtn = document.createElement('button');
  snackBarCloseBtn.classList.add('snackbar-close-btn');
  snackBarCloseBtn.style.backgroundImage = `url(${closeIcon})`;
  snackBarCloseBtn.addEventListener('click', closeSnackBar);
  snackBarEl.appendChild(snackBarCloseBtn);
  snackBarContainer.appendChild(snackBarEl);
  document.body.prepend(snackBarContainer);
  timeout = setTimeout(closeSnackBar, delay);
};
