import { take, select, call, put } from 'redux-saga/effects';
import { actions, actionCreators } from '../state/actions';

// Selectors and helpers
import { getLocation } from '../state/reducers';
import { PLAYER_STEP, CANVAS_WIDTH, CANVAS_HEIGHT, random } from '../helpers';

// Sagas
import fightSaga from './fightSaga';

export default function* gameSaga() {
  let playerAlive = true;

  while (playerAlive) {
    // Wait for player to move
    const action = yield take(actions.MOVE);

    // Move player one tile east
    yield put(actionCreators.movePlayer(action.payload.x, action.payload.y));

    // Show player current location
    const location = yield select(getLocation);

    const probability = yield call(Math.random);
    if (probability <= 0.15) {
      console.log('Probability: ', probability.toFixed(2));
      console.log('You have just moved! DANGER! You have met a MONSTER! Current location: ', location);
      console.log('---------------------------------------------------------');
      console.log('Fight begins...');
      // Start fight with the monster
      // Min monster strength = 5
      yield put(actionCreators.createMonster(random(5, 20)));
      playerAlive = yield call(fightSaga);
      continue;
    } else {
      console.log('You have just moved! You are safe here! Current location: ', location);
      continue;
    }
  }
}
