import getTokenSize from './getTokenSize';

test('should return the token size object', () => {
  const tokenSize = getTokenSize();
  expect(typeof tokenSize.height).toBe('number');
  expect(typeof tokenSize.width).toBe('number');
});
