import getTokenTransitionSpeed from './getTokenTransitionSpeed';
import setTokenTransitionSpeed from './setTokenTransitionSpeed';

test('should get correct token transition speed', () => {
  setTokenTransitionSpeed(5000);
  expect(getTokenTransitionSpeed()).toBe(5000);
});
