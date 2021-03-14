export type TBoardGridItemColor = 'light' | 'dark';
export enum TokenColors {
  BLUE = '#0000ff',
  RED = '#ff0000',
  GREEN = '#008000',
  YELLOW = '#ffff00',
}
export interface IBoardGridItem {
  position: number;
  color: TBoardGridItemColor;
  column: number;
}
export interface IPlayerCoordinates {
  left: number;
  bottom: number;
}
export interface IPlayer {
  readonly id: number;
  name: string;
  color: TokenColors;
  position: number;
  isWinned: boolean;
  coordinates: IPlayerCoordinates;
  alignmentData: IPlayerCoordinates;
  isComputer: boolean;
}
export interface IToken {
  playerCount: number;
}
export interface ITokenPositions {
  '1': IPlayerCoordinates[];
  '2': IPlayerCoordinates[];
  '3': IPlayerCoordinates[];
  '4': IPlayerCoordinates[];
  [index: string]: IPlayerCoordinates[];
}
export interface ITokenSize {
  height: number;
  width: number;
}
export interface IPlayerXDirections {
  player0: 'left' | 'right';
  player1: 'left' | 'right';
  player2: 'left' | 'right';
  player3: 'left' | 'right';
  [index: string]: 'left' | 'right';
}
export interface ITokenSize {
  height: number;
  width: number;
}
export interface IObstacle {
  type: 'snake' | 'ladder';
  startBlock: number;
  endBlock: number;
}
export interface ITokenRenderingTemplate {
  name: string;
  isComputer: boolean;
  color: TokenColors;
}
