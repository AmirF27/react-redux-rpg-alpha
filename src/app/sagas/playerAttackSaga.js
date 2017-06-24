import { delay } from 'redux-saga';
import { select, call, put } from 'redux-saga/effects';
import { actionCreators } from '../state/actions';

// Selectors and helpers
import { getPlayer } from '../state/reducers';

export default function* playerAttackSaga() {
  const player = yield select(getPlayer);

  yield put(actionCreators.disableButtons());
  console.log('Player is attacking MONSTER...');
  yield call(delay, 1500);

  // Generate random damage amount
  let damage = 0;
  const probability = yield call(Math.random);
  if (probability < 0.25) damage = player.strength - 4;  // damage = 11
  if (probability >= 0.25) damage = player.strength;     // damage = 15
  if (probability >= 0.50) damage = player.strength + 2; // damage = 17
  if (probability >= 0.75) damage = player.strength + 6; // damage = 23
  if (probability >= 0.90) damage = player.strength * 2; // Critical damage = 30

  console.log('MONSTER was hit (-', damage, 'HP)')
  yield call(delay, 2500);
  console.log('-----------------------[NEXT TURN]-----------------------');
  yield call(delay, 1500);
  yield put(actionCreators.monsterTakeDamage(damage));
}
