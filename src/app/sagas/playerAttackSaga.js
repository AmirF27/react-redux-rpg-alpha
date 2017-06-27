import { delay } from 'redux-saga';
import { select, call, put } from 'redux-saga/effects';
import { actionCreators } from '../state/actions';

// Selectors and helpers
import { calculateDamage } from '../helpers';
import { getPlayer } from '../state/reducers';

export default function* playerAttackSaga() {
  const player = yield select(getPlayer);

  yield put(actionCreators.disableButtons());
  console.log('Player is attacking MONSTER...');
  yield call(delay, 1000);

  // Generate random damage amount
  const probability = yield call(Math.random);
  const damage = calculateDamage(probability, player.level);

  if (damage === 0) console.log('MONSTER dodged (-', damage, 'HP)');
  if (damage !== 0) console.log('MONSTER was hit (-', damage, 'HP)');
  yield call(delay, 1700);
  console.log('-----------------------[NEXT TURN]-----------------------');
  yield call(delay, 1000);
  yield put(actionCreators.monsterTakeDamage(damage));
}
