import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { actionCreators } from '../state/actions';

// Selectors and helpers
import { calculateDamage } from '../helpers';

export default function* monsterAttackSaga(monster) {
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
