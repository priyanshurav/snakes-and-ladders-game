import { TOKEN_TRANSITION_SPEED_CSS_VARIABLE } from './constants';

export default (): number => {
  const tokenTransitionSpeedStr = document.body.style.getPropertyValue(
    TOKEN_TRANSITION_SPEED_CSS_VARIABLE
  );
  return parseInt(
    tokenTransitionSpeedStr.slice(0, tokenTransitionSpeedStr.length - 2),
    10
  );
};
