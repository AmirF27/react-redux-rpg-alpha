import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { actionCreators } from '../state/actions';

export default function* monsterAttackSaga(monster) {

  // Inform redux that MONSTER has just begun his attack
  yield put(actionCreators.isMonsterAttacking());
  console.log('MONSTER is attacking player...');
  yield call(delay, 1500);

  // Generate random damage amount
  let damage = 0;
  const probability = yield call(Math.random);
  if (probability < 0.25) damage = monster.strength - 4;  // damage = 5
  if (probability >= 0.25) damage = monster.strength;     // damage = 9
  if (probability >= 0.50) damage = monster.strength + 2; // damage = 11
  if (probability >= 0.75) damage = monster.strength + 6; // damage = 15
  if (probability >= 0.90) damage = monster.strength * 2; // Critical damage = 18

  console.log('Player was hit (-', damage, 'HP)')
  yield call(delay, 1500);
  console.log('Waiting for player action. [#]')

  // Apply damage to the player
  yield put(actionCreators.playerTakeDamage(damage));
}
