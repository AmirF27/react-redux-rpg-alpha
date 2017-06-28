export const PLAYER_STEP = 2;

export const keyCodes = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

export const TILE_SIZE = 32;
export const ROWS = 10;
export const COLS = 10;

export const CANVAS_WIDTH = TILE_SIZE * COLS;
export const CANVAS_HEIGHT = TILE_SIZE * ROWS;

// Returns a random number between min and max (inclusive)
export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomMonster(p, minMonsterLevel, maxMonsterLevel) {
  if (p < 0.66)              return minMonsterLevel;
  if (p >= 0.66 && p < 0.95) return random(minMonsterLevel, maxMonsterLevel);
  if (p >= 0.95)             return maxMonsterLevel;
}

// Calculates damages
export function calculateDamage(p, level) {
  if (p < 0.20)              return level * 0;
  if (p >= 0.20 && p < 0.66) return level * 2;
  if (p >= 0.66 && p < 0.90) return level * 3;
  if (p >= 0.90)             return level * 4;
}

// Randomly decide who attacks first in a monster encounter
export function playerAttacksFirst(p) {
  if (p <= 0.50) return true;
  return false;
}
