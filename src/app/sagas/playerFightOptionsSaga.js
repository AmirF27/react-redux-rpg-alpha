import { take, call, race } from 'redux-saga/effects';
import { actions } from '../state/actions';

// Sagas
import playerAttackSaga from './playerAttackSaga';
import playerHealSaga from './playerHealSaga';

export default function* playerFightOptionsSaga() {
    // wait for player to select an action
    const { attack, heal } = yield race({
        attack: take(actions.ATTACK),
        heal: take(actions.HEAL)
    });
    if (attack) yield call(playerAttackSaga);
    if (heal) yield call(playerHealSaga);
}
