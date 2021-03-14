import { last } from 'lodash';
import { gameStatus } from './gameStatus';
import showWinningScreen from './showWinningScreen';
import { IPlayer } from './types';
import diceFace1 from './assets/dice/1.svg';
import setAccurateTimeout from 'set-accurate-timeout';
import handleDiceClick from './handleDiceClick';

export default async (): Promise<void> => {
  if (gameStatus.allPlayers.length === 0) return;

  if (gameStatus.winnersAndLosers.length === gameStatus.allPlayers.length - 1) {
    // The id's of the winned players
    const winnedPlayersIds = gameStatus.winnersAndLosers.map(
      (player) => player.id
    );
    const loser = <IPlayer>(
      gameStatus.allPlayers.find(
        (player) => !winnedPlayersIds.includes(player.id)
      )
    );
    gameStatus.addWinnerOrLoser(loser);

    return await showWinningScreen();
  }
  const playersWhoHaveNotWon = gameStatus.allPlayers.filter(
    (player) => !player.isWinned
  );

  const isLastPlayer =
    (<IPlayer>last(playersWhoHaveNotWon)).id === gameStatus.currentPlayer.id;

  const playerAfterCurrentPlayer =
    playersWhoHaveNotWon[
      playersWhoHaveNotWon.findIndex(
        (player) => player.id === gameStatus.currentPlayer.id
      ) + 1
    ];

  gameStatus.currentPlayer = isLastPlayer
    ? playersWhoHaveNotWon[0]
    : playerAfterCurrentPlayer;

  const diceEl = document.querySelector<HTMLDivElement>('#dice');
  if (!diceEl) return;
  diceEl.style.backgroundImage = `url(${diceFace1})`;
  if (gameStatus.currentPlayer.isComputer) {
    return setAccurateTimeout(() => {
      gameStatus.isDiceDisabled = false;
      handleDiceClick();
    }, 500);
  }
  gameStatus.isDiceDisabled = false;
};
