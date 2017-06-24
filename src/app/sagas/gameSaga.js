import { take, select, call, put } from 'redux-saga/effects';
import { actions, actionCreators } from '../state/actions';

// Selectors and helpers
import { getLocation } from '../state/reducers';
import { PLAYER_STEP, CANVAS_WIDTH, CANVAS_HEIGHT, getRandom } from '../helpers';

// Sagas
import fightSaga from './fightSaga';

export default function* gameSaga() {
  let playerAlive = true;
  // Generate random monster location based on canvas size
  // Player starts game from (0, 0)
  const monsterLocation = {
    x: getRandom(PLAYER_STEP, CANVAS_WIDTH),
    y: getRandom(PLAYER_STEP, CANVAS_HEIGHT)
  };

  while (playerAlive) {
    // Wait for player to move
    const action = yield take(actions.MOVE);

    // Move player one tile east
    yield put(actionCreators.movePlayer(action.payload.x, action.payload.y));

    // Show player current location
    const location = yield select(getLocation);

    if (location.x === monsterLocation.x && location.y === monsterLocation.y) {
      console.log('You have just moved! DANGER! You have met a MONSTER! Current location: ', location)
      console.log('---------------------------------------------------------');
      console.log('Fight begins...');
      // Start fight with the monster
      playerAlive = yield call(fightSaga);
      continue;
    } else {
      console.log('You have just moved! You are safe here! Current location: ', location, '@MONSTER:', monsterLocation);
      continue;
    }
  }
}
