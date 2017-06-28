export const initialState = {
  game: {
    buttons: false
  },
  hero: {
    position: {
      x: 0,
      y: 0
    },
    stats: {
      xp: 0,
      level: 1,
      health: 10,
      maxHealth: 10
    },
    inventory: {
      potions: 2
    }
  },
  monster: {
    isAttacking: false,
    stats: {
      level: null,
      health: null,
      maxHealth: null
    }
  }
};

export const levels = [
  { xp:    0 }, // Level 1
  { xp:  100 }, // Level 2
  { xp:  250 }, // Level 3
  { xp:  500 }, // Level 4
  { xp: 1000 }, // Level 5
  { xp: 1700 }, // Level 6
  { xp: 4000 }, // Level 7
  { xp: 8000 }, // Level 8
  { xp: 16000 }, // Level 9
  { xp: 31700 }, // Level 10
];
