import { call, put } from 'redux-saga/effects';
import { actionCreators } from '../state/actions';

// Selectors and helpers
import { playerAttacksFirst } from '../helpers';

// Sagas
import playerFightOptionsSaga from './playerFightOptionsSaga';

export default function* whoAttacksFirstSaga() {
  // Generate random probability
  const probability = yield call(Math.random);
  const playerFirst = playerAttacksFirst(probability);

  // Set firstMove to false
  yield put(actionCreators.firstMove());

  if (playerFirst) {
    console.log('Player moves first.');
    console.log('Waiting for player action. [#]');
    yield put(actionCreators.enableButtons());
    yield call(playerFightOptionsSaga);
  }
}
