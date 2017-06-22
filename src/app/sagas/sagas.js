import { delay } from 'redux-saga';
import { take, select, call, put, race, all } from 'redux-saga/effects';
import { actions, actionCreators } from '../state/actions';
// Selectors
import { getLocation, getMonster, getPlayer } from '../state/reducers';

export function* gameSaga() {
  let playerAlive = true;
  // Generate random monster location between 10 and 1
  // Player starts his adventure from 0
  const myMax = 10;
  const myMin = 1;
  const monsterLocation = (Math.floor(Math.random() * (myMax - myMin + 1) + myMin));

  while (playerAlive) {

    // Wait for player to move
    yield take(actions.MOVE);

    // Move player one tile east
    yield put(actionCreators.movePlayer(32, 0));

    // Show player current location
    const location = yield select(getLocation);

    if (location.x !== monsterLocation) {
      console.log('You have just moved! You are safe here! Current location: ', location, '@MONSTER:', monsterLocation);
      continue;
    }

    if (location.x === monsterLocation) {
      console.log('You have just moved! DANGER! You have met a MONSTER! Current location: ', location)
      console.log('---------------------------------------------------------');
      console.log('Fight begins...');
      // Start fight with the monster
      playerAlive = yield call(fightSaga);
      continue;
    }
  }
}

export function* fightSaga() {

  while (true) {
    // For convenience, save a reference to the monster
    const monster = yield select(getMonster);

    // Is monster dead?
    if (monster.health <= 0) {
      // Now, after killing the MONSTER, player can still move inside SAGA -> still logging Current location:  Object {x: 3, y: 0}
      console.log('MONSTER is DEAD! You have won!');
      console.log('You have gained 600 XP!');
      // Gain 600 Xp for killing the MONSTER
      yield put(actionCreators.gainXp(600));
      yield put(actionCreators.addMaxHealth());
      return true;
    }

    // Monster attack sequence
    yield call(monsterAttackSaga, monster);

    // Is player dead? return false
    const player = yield select(getPlayer);
    if (player.health <= 0) {
      // Now player can't move inside SAGA -> No moving console.logs
      console.log('Player is DEAD! GAME OVER!');
      return false;
    }

    // Player fight options
    yield call(playerFightOptionsSaga);

  }
}

export function* monsterAttackSaga(monster) {

  // Wait a small delay
  console.log('MONSTER is attacking player...');
  yield call(delay, 2500);

  // Generate random damage amount
  let damage = 0;
  const probability = yield call(Math.random);
  if (probability < 0.25) damage = monster.strength - 4;  // damage = 5
  if (probability >= 0.25) damage = monster.strength;     // damage = 9
  if (probability >= 0.50) damage = monster.strength + 2; // damage = 11
  if (probability >= 0.75) damage = monster.strength + 6; // damage = 15
  if (probability >= 0.90) damage = monster.strength * 2; // Critical damage = 18

  console.log('Player was hit (-', damage, 'HP)')
  console.log('Waiting for player action.')

  // Apply damage to the player
  yield put(actionCreators.playerTakeDamage(damage));
}

export function* playerAttackSaga() {
  const player = yield select(getPlayer);

  // Wait a small delay
  console.log('Player is attacking MONSTER...');
  yield call(delay, 2500);

  // Generate random damage amount
  let damage = 0;
  const probability = yield call(Math.random);
  if (probability < 0.25) damage = player.strength - 4;  // damage = 11
  if (probability >= 0.25) damage = player.strength;     // damage = 15
  if (probability >= 0.50) damage = player.strength + 2; // damage = 17
  if (probability >= 0.75) damage = player.strength + 6; // damage = 23
  if (probability >= 0.90) damage = player.strength * 2; // Critical damage = 30

  console.log('MONSTER was hit (-', damage, 'HP)')
  console.log('-----------------------[NEXT TURN]-----------------------');

  yield put(actionCreators.monsterTakeDamage(damage));
}

export function* playerHealSaga() {
  console.log('Player is drinking a potion...');
  // Wait a small delay
  yield call(delay, 2500);
  console.log('Player used his turn to heal.');
  console.log('-----------------------[NEXT TURN]-----------------------');
  yield put(actionCreators.drinkPotion());
}

export function* playerFightOptionsSaga() {
    // wait for player to select an action
    const { attack, heal } = yield race({
        attack: take(actions.ATTACK),
        heal: take(actions.HEAL)
    });
    if (attack) yield call(playerAttackSaga);
    if (heal) yield call(playerHealSaga);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    gameSaga()
  ]);
}
