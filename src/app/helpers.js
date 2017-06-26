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

/*
 * Returns a random number between min and max that's a multiple of factorial.
**/

/*
export function getRandom(min, max, factorial = min) {
  var range = (max - min + 1) + min;
  return Math.floor(Math.random() * range / factorial) * factorial;
}
*/

export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
