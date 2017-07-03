import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT, PLAYER_STEP, keyCodes, TILE_SIZE } from './helpers';
import { store } from './index.js';
import { actionCreators } from './state/actions';

var hero;

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
  SPEED: 7
};

export const GameState = {
  preload() {
    this.load.tilemap('Map', require('../assets/json/map.json'), null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileset', require('../assets/images/tileset.png'));
    this.load.spritesheet('hero', require('../assets/images/charchip01.png'), TILE_SIZE, TILE_SIZE);
  },

  create() {
    this.map = this.add.tilemap('Map');
    this.map.addTilesetImage('tileset');

    console.log(this.map);

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.layers = {
      layer1: this.map.createLayer('layer1'),
      layer2: this.map.createLayer('layer2'),
      'collision-layer': this.map.createLayer('collision-layer'),
      'top-layer': this.map.createLayer('top-layer')
    };

    for (let layer in this.layers) {
      this.layers[layer].resizeWorld();
    }

    const heroPosition = store.getState().hero.position;
    hero = this.add.sprite(heroPosition.x, heroPosition.y, 'hero');
    hero.lastDirection = heroFrames.DOWN;
    hero.moving = false;
    hero.frame = heroFrames.DOWN;

    this.physics.enable(hero, Phaser.Physics.ARCADE);
    hero.body.collideWorldBounds = true;

    setHeroAnimations();

    this.map.setCollisionBetween(1, 10000, true, this.layers['collision-layer']);

    this.camera.follow(hero);

    this.cursors = this.input.keyboard.createCursorKeys();
  },

  update() {
    this.physics.arcade.collide(hero, this.layers['collision-layer']);

    this.world.bringToTop(this.layers['top-layer']);

    if (store.getState().game.fight) {
      stopHero();
      return;
    }

    if (this.cursors.left.isDown) {
      hero.animations.play('left');
      hero.body.velocity.x = -100;
      hero.body.velocity.y = 0;
      if (hero.lastDirection != heroFrames.LEFT) {
        hero.lastDirection = heroFrames.LEFT
      }
      hero.moving = true;
    }
    else if (this.cursors.right.isDown) {
      hero.animations.play('right');
      hero.body.velocity.x = 100;
      hero.body.velocity.y = 0;
      if (hero.lastDirection != heroFrames.RIGHT) {
        hero.lastDirection = heroFrames.RIGHT
      }
      hero.moving = true;
    }
    else if (this.cursors.up.isDown) {
      hero.animations.play('up');
      hero.body.velocity.x = 0;
      hero.body.velocity.y = -100;
      if (hero.lastDirection != heroFrames.UP) {
        hero.lastDirection = heroFrames.UP
      }
      hero.moving = true;
    }
    else if (this.cursors.down.isDown) {
      hero.animations.play('down');
      hero.body.velocity.x = 0;
      hero.body.velocity.y = 100;
      if (hero.lastDirection != heroFrames.DOWN) {
        hero.lastDirection = heroFrames.DOWN
      }
      hero.moving = true;
    }
    else {
      stopHero();
    }

    if (hero.moving) {
      store.dispatch(actionCreators.move(Math.round(hero.x), Math.round(hero.y)));
    }
  }
};

function setHeroAnimations() {
  hero.animations.add('left', heroAnimations.LEFT, heroAnimations.SPEED, true);
  hero.animations.add('right', heroAnimations.RIGHT, heroAnimations.SPEED, true);
  hero.animations.add('up', heroAnimations.UP, heroAnimations.SPEED, true);
  hero.animations.add('down', heroAnimations.DOWN, heroAnimations.SPEED, true);
}

function stopHero() {
  hero.body.velocity.x = 0;
  hero.body.velocity.y = 0;
  if (hero.moving) {
    hero.animations.stop();
    hero.frame = hero.lastDirection;
    hero.moving = false;
  }
}

export const game = new Phaser.Game(CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.AUTO, 'game-canvas');
