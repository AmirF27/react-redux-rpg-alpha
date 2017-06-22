import { initialState, levels } from './initial-state';
import { actions } from './actions';
import { combineReducers } from 'redux';

function statsReducer(state = initialState.hero.stats, action) {
  let { health, maxHealth } = state;

  switch (action.type) {
    case actions.DRINK_POTION:
      health = Math.min(health + 10, maxHealth);
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

  switch (action.type) {
    case actions.MONSTER_TAKE_DAMAGE:
      return {
        ...state,
        stats: statsReducer(stats, action)
      };
  }
  return state;
}

const reducer = combineReducers({
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
