export const PLAYER_STEP = 2;

export const keyCodes = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

export const CANVAS_WIDTH = 600;
export const CANVAS_HEIGHT = 100;

/*
 * Returns a random number between min and max that's a multiple of factorial.
**/
export function getRandom(min, max, factorial = min) {
  var range = (max - min + 1) + min;
  return Math.floor(Math.random() * range / factorial) * factorial;
}
