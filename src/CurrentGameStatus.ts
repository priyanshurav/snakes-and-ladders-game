import { cloneDeep } from 'lodash';
import { INITIAL_BOARD_BLOCK_SIZE, MAX_PLAYER_COUNT } from './constants';
import {
  IBoardGridItem,
  ISnakeOrLadder,
  IPlayer,
  IPlayerXDirections,
} from './types';
import updateScene from './updateScene';

export default class CurrentGameStatus {
  private _allPlayers: IPlayer[] = [];
  private _boardBlockSize = INITIAL_BOARD_BLOCK_SIZE;
  private _currentPlayer = cloneDeep(this._allPlayers[0]);
  private _isDiceDisabled = true;
  private _winnersAndLosers: IPlayer[] = [];

  snakesAndLaddersTemplate: ISnakeOrLadder[] = [];
  boardTemplate: IBoardGridItem[] = [];
  isCheatDisabled = false;
  isFirstStart = true;
  isGameStarted = false;
  computerPlayerCount = 0;
  playerXDirections: IPlayerXDirections = {
    player0: 'right',
    player1: 'right',
    player2: 'right',
    player3: 'right',
  };
  get currentPlayer(): IPlayer {
    return cloneDeep(this._currentPlayer);
  }
  set currentPlayer(newCurrentPlayer: IPlayer) {
    const isNewCurrentPlayerValid = this._allPlayers.find(
      (player) => player.id === newCurrentPlayer.id
    );

    if (!isNewCurrentPlayerValid)
      throw new Error(`Player with ID '${newCurrentPlayer.id}' does not exist`);
    const clonedNewCurrentPlayer = cloneDeep(newCurrentPlayer);
    this._currentPlayer = clonedNewCurrentPlayer;
    const indexInAllPlayers = this._allPlayers.findIndex(
      (player) => player.id === newCurrentPlayer.id
    );
    const indexInWinnersAndLosers = this._winnersAndLosers.findIndex(
      (player) => player.id === newCurrentPlayer.id
    );
    // Here we are syncing the all players array with the new current player.
    if (indexInAllPlayers !== -1)
      this.allPlayers[indexInAllPlayers] = clonedNewCurrentPlayer;
    // Here we are syncing the winners and losers array with the new current player.
    if (indexInWinnersAndLosers !== -1)
      this._winnersAndLosers[indexInWinnersAndLosers] = clonedNewCurrentPlayer;
    updateScene();
  }
  get isDiceDisabled(): boolean {
    return this._isDiceDisabled;
  }
  set isDiceDisabled(newValue: boolean) {
    this._isDiceDisabled = newValue;
    updateScene();
  }
  get boardBlockSize(): number {
    return this._boardBlockSize;
  }
  set boardBlockSize(boardBlockSize: number) {
    this._boardBlockSize = boardBlockSize;
    updateScene();
  }
  get winnersAndLosers(): IPlayer[] {
    return cloneDeep(this._winnersAndLosers);
  }
  get allPlayers(): IPlayer[] {
    return cloneDeep(this._allPlayers);
  }
  addWinnerOrLoser(newPlayer: IPlayer): void {
    if (this._winnersAndLosers.find((player) => player.id === newPlayer.id))
      throw new Error(`Player with ID '${newPlayer.id}' already exists`);
    if (!this._allPlayers.find((player) => player.id === newPlayer.id))
      throw new Error(`Player with ID '${newPlayer.id}' does not exist`);
    this._winnersAndLosers.push(cloneDeep(newPlayer));
  }
  addPlayer(newPlayer: IPlayer): void {
    if (this._allPlayers.length === MAX_PLAYER_COUNT)
      throw new Error('Maximum player count exceeded');
    if (this._allPlayers.find((player) => player.id === newPlayer.id))
      throw new Error(`Player with ID '${newPlayer.id}' already exists`);
    const isAllPlayerEmptyBeforeStartGame = this._allPlayers.length === 0;
    this._allPlayers.push(newPlayer);
    if (isAllPlayerEmptyBeforeStartGame)
      this._currentPlayer = this._allPlayers[0];
    updateScene();
  }
  /** Replaces the old player with the new player that has the ID of new player */
  replacePlayer(newPlayerObj: IPlayer, update: boolean): void {
    const clonedNewPlayer = cloneDeep(newPlayerObj);
    const indexInAllPlayers = this._allPlayers.findIndex(
      (player) => player.id === newPlayerObj.id
    );
    const indexInWinnersAndLosers = this._winnersAndLosers.findIndex(
      (player) => player.id === newPlayerObj.id
    );

    if (indexInAllPlayers === -1)
      throw new Error(`Player with ID '${newPlayerObj.id}' does not exist`);

    this._allPlayers[indexInAllPlayers] = clonedNewPlayer;
    // Here we are syncing the winners and losers array with the new player.
    if (indexInWinnersAndLosers !== -1)
      this._winnersAndLosers[indexInWinnersAndLosers] = clonedNewPlayer;

    if (this._currentPlayer.id === newPlayerObj.id)
      this.currentPlayer = clonedNewPlayer;

    if (update) updateScene();
  }
}
