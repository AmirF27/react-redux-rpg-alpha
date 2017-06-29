import { select, call, put } from 'redux-saga/effects';
import { actionCreators } from '../state/actions';

// Selectors and helpers
import { getMonster, getPlayer, getFirstMove } from '../state/reducers';

// Sagas
import monsterAttackSaga from './monsterAttackSaga';
import playerFightOptionsSaga from './playerFightOptionsSaga';
import whoAttacksFirstSaga from './whoAttacksFirstSaga';
import gameSaga from './gameSaga';

export default function* fightSaga() {

  while (true) {
    // For convenience, save a reference to the monster
    const monster = yield select(getMonster);

    // Is monster dead?
    if (monster.health <= 0) {
      console.log('MONSTER is DEAD! You have won!');
      console.log('You have gained XP!');
      // Gain Xp for killing the MONSTER
      yield put(actionCreators.gainXp(100));
      yield put(actionCreators.monsterIsDead());
      // Back to game
      yield call(gameSaga);
    }

    // Is this first combat move with this monster?
    const firstMove = yield select(getFirstMove);

    if (firstMove) {
      yield call(whoAttacksFirstSaga);
    }

    // Monster attack sequence
    yield call(monsterAttackSaga, monster);

    // Is player dead? If so return false
    const player = yield select(getPlayer);

    if (player.health <= 0) {
      // Now player can't move
      yield put(actionCreators.disableButtons());
      console.log('Player is DEAD! GAME OVER!');
    }

    // Player fight options
    yield call(playerFightOptionsSaga);

  }
}
