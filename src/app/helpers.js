import map from './map.js';

export const PLAYER_STEP = 2;

export const keyCodes = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

export const TILE_SCALE = 2;
export const CANVAS_WIDTH = map.tileSize * map.cols * TILE_SCALE;
export const CANVAS_HEIGHT = map.tileSize * map.rows * TILE_SCALE;

// Returns a random number between min and max (inclusive)
export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Calculates damages
export function calculateDamage(p, level) {
  if (p < 0.20)              return level * 0;
  if (p >= 0.20 && p < 0.66) return level * 2;
  if (p >= 0.66 && p < 0.90) return level * 3;
  if (p >= 0.90)             return level * 4;
}

// Randomly decide who attacks first in a monster encounter
export function whoAttackFirst(p) {
  if (p < 0.50) return true;
  return false;
}
