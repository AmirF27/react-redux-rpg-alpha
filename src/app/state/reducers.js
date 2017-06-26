import { initialState, levels } from './initial-state';
import { actions } from './actions';
import { combineReducers } from 'redux';

function gameReducer(state = initialState.game, action) {
  let { buttons } = state;

  switch (action.type) {
    case actions.ENABLE_BUTTONS:
      buttons = true;
      return { ...state, buttons };
    case actions.DISABLE_BUTTONS:
      buttons = false;
      return { ...state, buttons };
  }
  return state;
}

function statsReducer(state = initialState.hero.stats, action) {
  let { strength, health, maxHealth } = state;

  switch (action.type) {
    case actions.MONSTER_CREATE:
      strength = action.payload;
      maxHealth = (strength * 2) + 20;
      health = maxHealth;
    return { ...state, strength, health, maxHealth };
    case actions.DRINK_POTION:
      health = Math.min(health + 20, maxHealth);
      return { ...state, health, maxHealth };
    case actions.PLAYER_TAKE_DAMAGE:
    case actions.MONSTER_TAKE_DAMAGE:
      health = Math.max(0, health - action.payload);
      return { ...state, health };
    case actions.ADD_MAX_HEALTH_AFTER_LEVEL_UP:
      maxHealth += 10;
      health = maxHealth;
      return { ...state, health, maxHealth };
  }
  return state;
}

function inventoryReducer(state = initialState.hero.inventory, action) {
  let { potions } = state;

  switch (action.type) {
    case actions.DRINK_POTION:
      potions = Math.max(0, potions - 1);
      return { ...state, potions };
  }
  return state;
}

function heroReducer(state = initialState.hero, action) {
  let { level, xp } = state;
  let { stats, inventory } = state;
  let { position: { x, y } } = state;

  switch (action.type) {
    case actions.GAIN_XP:
      xp += action.payload;
      if (xp >= levels[level].xp) {
        level++;
      }
      return { ...state, level, xp };
    case actions.ADD_MAX_HEALTH_AFTER_LEVEL_UP:
      return {
        ...state,
        stats: statsReducer(stats, action)
      };
    case actions.MOVE_PLAYER:
      x += action.payload.x;
      y += action.payload.y;
      return {
        ...state,
        position: { x, y }
      };
    case actions.DRINK_POTION:
      return {
        ...state,
        stats: inventory.potions > 0 ? statsReducer(stats, action) : stats,
        inventory: inventoryReducer(inventory, action)
      };
    case actions.PLAYER_TAKE_DAMAGE:
      return {
        ...state,
        stats: statsReducer(stats, action)
      };
  }
  return state;
}

function monsterReducer(state = initialState.monster, action) {
  const { stats } = state;
  let { isAttacking } = state;

  switch (action.type) {
    case actions.MONSTER_CREATE:
      return {
        ...state,
        stats: statsReducer(stats, action)
      };
    case actions.MONSTER_ATTACKS:
      isAttacking = true;
      return {
        ...state,
        isAttacking
      };
    case actions.MONSTER_DEAD:
      isAttacking = false;
      return {
        ...state,
        isAttacking
      };
    case actions.MONSTER_TAKE_DAMAGE:
      return {
        ...state,
        stats: statsReducer(stats, action)
      };
  }
  return state;
}

const reducer = combineReducers({
  game: gameReducer,
  hero: heroReducer,
  monster: monsterReducer
});

export default reducer;

/*************************** selectors here (for now) **************************/

export function getLocation(state) {
  return state.hero.position;
}

export function getMonster(state) {
  return state.monster.stats;
}

export function getPlayer(state) {
  return state.hero.stats;
}
