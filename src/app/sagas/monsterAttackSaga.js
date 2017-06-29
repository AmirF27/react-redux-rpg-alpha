import { delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { actionCreators } from '../state/actions';

// Selectors and helpers
import { calculateDamage } from '../helpers';
import { getMonster } from '../state/reducers';

// Sagas
import gameSaga from './gameSaga';

export default function* monsterAttackSaga(monster) {
  const monsterCheck = yield select(getMonster);
  // Is monster dead?
  if (monsterCheck.health <= 0) {
    // Now, after killing the MONSTER, player can still move
    console.log('MONSTER is DEAD! You have won!');
    console.log('You have gained XP!');
    // Gain Xp for killing the MONSTER
    yield put(actionCreators.gainXp(100));
    yield put(actionCreators.isMonsterDead());
    // Back to game
    yield call(gameSaga);
  }
  console.log('MONSTER is attacking player...');
  yield call(delay, 1000);

  // Generate random damage amount
  const probability = yield call(Math.random);
  const damage = calculateDamage(probability, monster.level);

  if (damage === 0) console.log('Player dodged (-', damage, 'HP)');
  if (damage !== 0) console.log('Player was hit (-', damage, 'HP)');
  yield call(delay, 1000);
  console.log('Waiting for player action. [#]');
  yield put(actionCreators.enableButtons());
  // Apply damage to the player
  yield put(actionCreators.playerTakeDamage(damage));
}
