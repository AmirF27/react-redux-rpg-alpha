import { select, call, put } from 'redux-saga/effects';
import { actionCreators } from '../state/actions';

// Selectors and helpers
import { getMonster, getPlayer, getFirstMove } from '../state/reducers';

// Sagas
import monsterAttackSaga from './monsterAttackSaga';
import playerFightOptionsSaga from './playerFightOptionsSaga';
import whoAttacksFirstSaga from './whoAttacksFirstSaga';

export default function* fightSaga() {

  while (true) {
    // For convenience, save a reference to the monster
    const monster = yield select(getMonster);

    // Is monster dead?
    if (monster.health <= 0) {
      // Now, after killing the MONSTER, player can still move
      console.log('MONSTER is DEAD! You have won!');
      console.log('You have gained XP!');
      // Gain Xp for killing the MONSTER
      yield put(actionCreators.gainXp(100));
      yield put(actionCreators.isMonsterDead());
      return true;
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
      return false;
    }

    // Player fight options
    yield call(playerFightOptionsSaga);


  }
}
