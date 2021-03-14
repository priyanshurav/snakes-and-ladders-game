import { TOKEN_TRANSITION_SPEED_CSS_VARIABLE } from './constants';

export default (speed: number): void => {
  document.body.style.setProperty(
    TOKEN_TRANSITION_SPEED_CSS_VARIABLE,
    speed + 'ms'
  );
};
