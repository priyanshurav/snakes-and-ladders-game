import getTokenTransitionSpeed from './getTokenTransitionSpeed';
import setTokenTransitionSpeed from './setTokenTransitionSpeed';

test('should set token transition speed', () => {
  setTokenTransitionSpeed(1000);
  expect(getTokenTransitionSpeed()).toBe(1000);
});
