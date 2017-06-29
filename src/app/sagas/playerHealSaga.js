import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { actionCreators } from '../state/actions';

export default function* playerHealSaga() {
  yield put(actionCreators.disableButtons());
  console.log('Player is drinking a potion...');
  yield call(delay, 1000);
  console.log('Player used his turn to heal. (+ 10 HP)');
  yield call(delay, 1700);
  console.log('-----------------------[NEXT TURN]-----------------------');
  yield call(delay, 1000);
  yield put(actionCreators.drinkPotion());
}
