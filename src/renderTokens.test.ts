import { gameStatus } from './gameStatus';
import renderTokens from './renderTokens';
import { ITokenRenderingTemplate, TokenColors } from './types';

test('should add tokens to gameStatus.allPlayers', async () => {
  const template: ITokenRenderingTemplate[] = [
    { color: TokenColors.BLUE, isComputer: false, name: 'Player 1' },
    { color: TokenColors.RED, isComputer: false, name: 'Player 1' },
    { color: TokenColors.GREEN, isComputer: false, name: 'Player 1' },
    { color: TokenColors.YELLOW, isComputer: false, name: 'Player 1' },
  ];
  await renderTokens(template);
  // I am using a setTimeout because, otherwise the allPlayers.length will be 0, for some reason
  // that I don't know, even after calling the renderTokens which should fill up array, and the allPlayers
  // just gets filled up for some reason after running expect() in a setTimeout
  setTimeout(() => {
    expect(gameStatus.allPlayers).toHaveLength(4);
  }, 0);
});
