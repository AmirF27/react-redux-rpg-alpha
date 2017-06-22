export const actions = {
  ADD_MAX_HEALTH_AFTER_LEVEL_UP: 'ADD_MAX_HEALTH_AFTER_LEVEL_UP',
  GAIN_XP: 'GAIN_XP',
  DRINK_POTION: 'DRINK_POTION',
  PLAYER_TAKE_DAMAGE: 'PLAYER_TAKE_DAMAGE',
  MONSTER_TAKE_DAMAGE: 'MONSTER_TAKE_DAMAGE',
  MOVE_PLAYER: 'MOVE_PLAYER',
  MOVE: 'MOVE',
  ATTACK: 'ATTACK',
  HEAL: 'HEAL'
};

export const actionCreators = {
  addMaxHealth() {
    return {
      type: actions.ADD_MAX_HEALTH_AFTER_LEVEL_UP,
    };
  },
  gainXp(amount) {
    return {
      type: actions.GAIN_XP,
      payload: amount
    };
  },
  drinkPotion() {
    return {
      type: actions.DRINK_POTION,
    };
  },
  playerTakeDamage(amount) {
    return {
      type: actions.PLAYER_TAKE_DAMAGE,
      payload: amount
    };
  },
  monsterTakeDamage(amount) {
    return {
      type: actions.MONSTER_TAKE_DAMAGE,
      payload: amount
    };
  },
  movePlayer(x, y) {
    return {
      type: actions.MOVE_PLAYER,
      payload: { x, y }
    };
  },
  move() {
    return {
      type: actions.MOVE,
    };
  },
  attack() {
    return {
      type: actions.ATTACK,
    };
  },
  heal() {
    return {
      type: actions.HEAL,
    };
  }
};
