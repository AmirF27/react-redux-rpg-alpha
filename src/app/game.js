import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT, PLAYER_STEP, keyCodes, TILE_SIZE } from './helpers';
import { store } from './index.js';
import { actionCreators } from './state/actions';

var hero,
    pressedKey = null,
    keypressTimer = null,
    inFight = false;

const keys = {
  [keyCodes.LEFT]() {
    if (!store.getState().game.fight) {
      moveHero('left', -PLAYER_STEP, 0);
    }
  },
  [keyCodes.RIGHT]() {
    if (!store.getState().game.fight) {
      moveHero('right', PLAYER_STEP, 0);
    }
  },
  [keyCodes.UP]() {
    if (!store.getState().game.fight) {
      moveHero('up', 0, -PLAYER_STEP);
    }
  },
  [keyCodes.DOWN]() {
    if (!store.getState().game.fight) {
      moveHero('down', 0, PLAYER_STEP);
    }
  }
};

const heroFrames = {
  LEFT: 16,
  RIGHT: 28,
  UP: 40,
  DOWN: 4
};

const heroAnimations = {
  LEFT: [heroFrames.LEFT - 1, heroFrames.LEFT, heroFrames.LEFT + 1],
  RIGHT: [heroFrames.RIGHT - 1, heroFrames.RIGHT, heroFrames.RIGHT + 1],
  UP: [heroFrames.UP - 1, heroFrames.UP, heroFrames.UP + 1],
  DOWN: [heroFrames.DOWN - 1, heroFrames.DOWN, heroFrames.DOWN + 1],
};

export const GameState = {
  preload() {
    this.load.tilemap('Map', require('../assets/json/map.json'), null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileset', require('../assets/images/tileset.png'));
    this.load.spritesheet('hero', require('../assets/images/charchip01.png'), TILE_SIZE, TILE_SIZE);
  },

  create() {
    const map = this.add.tilemap('Map');
    map.addTilesetImage('tileset');
    const layer1 = map.createLayer('layer1'),
          layer2 = map.createLayer('layer2');
    layer1.resizeWorld();
    layer2.resizeWorld();

    const heroPosition = store.getState().hero.position;
    hero = this.add.sprite(heroPosition.x, heroPosition.y, 'hero');
    hero.frame = heroFrames.DOWN;

    hero.animations.add('left', heroAnimations.LEFT, 5, true);
    hero.animations.add('right', heroAnimations.RIGHT, 5, true);
    hero.animations.add('up', heroAnimations.UP, 5, true);
    hero.animations.add('down', heroAnimations.DOWN, 5, true);

    this.camera.follow(hero);

    this.input.keyboard.onDownCallback = keydownEventHandler;
    this.input.keyboard.onUpCallback = keyupEventHandler;
  }
};

function keydownEventHandler(event) {
  if (!store.getState().game.fight) {
    if (event.keyCode in keys) {
      if (pressedKey !== null && event.keyCode !== pressedKey) {
        stopHero();
      }

      pressedKey = event.keyCode;

      if (keypressTimer === null) {
        keypressTimer = setInterval(keys[pressedKey], 20);
      }
    }
  }
  else {
    stopHero();
  }
}

function keyupEventHandler(event) {
  if (event.keyCode in keys) {
    if (keypressTimer !== null && event.keyCode === pressedKey) {
      stopHero();
    }
  }
}

function moveHero(direction, x, y) {
  hero.animations.play(direction);
  store.dispatch(actionCreators.move(x, y));
  hero.x += x;
  hero.y += y;
}

function stopHero() {
  hero.animations.stop();
  clearInterval(keypressTimer);
  keypressTimer = null;

  switch (pressedKey) {
    case keyCodes.LEFT:
      hero.frame = heroFrames.LEFT;
      break;
    case keyCodes.RIGHT:
      hero.frame = heroFrames.RIGHT;
      break;
    case keyCodes.UP:
      hero.frame = heroFrames.UP;
      break;
    case keyCodes.DOWN:
      hero.frame = heroFrames.DOWN;
      break;
  }

  pressedKey = null;
  console.error(hero.x);
}

export const game = new Phaser.Game(CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.AUTO, 'game-canvas');
