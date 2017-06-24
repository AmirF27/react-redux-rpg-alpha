import { select, call, put } from 'redux-saga/effects';
import { actionCreators } from '../state/actions';

// Selectors and helpers
import { getMonster, getPlayer } from '../state/reducers';

// Sagas
import monsterAttackSaga from './monsterAttackSaga';
import playerFightOptionsSaga from './playerFightOptionsSaga';

export default function* fightSaga() {

  while (true) {
    // For convenience, save a reference to the monster
    const monster = yield select(getMonster);

    // Is monster dead?
    if (monster.health <= 0) {
      // Now, after killing the MONSTER, player can still move inside SAGA -> still logging Current location:  Object {x: 3, y: 0}
      console.log('MONSTER is DEAD! You have won!');
      console.log('You have gained 600 XP!');
      // Gain 600 Xp for killing the MONSTER
      yield put(actionCreators.gainXp(600));
      yield put(actionCreators.addMaxHealth());
      return true;
    }

    // Monster attack sequence
    yield call(monsterAttackSaga, monster);

    // Is player dead? return false
    const player = yield select(getPlayer);
    if (player.health <= 0) {
      // Now player can't move inside SAGA -> No moving console.logs
      console.log('Player is DEAD! GAME OVER!');
      return false;
    }

    // Player fight options
    yield call(playerFightOptionsSaga);

  }
}
