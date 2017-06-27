import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './helpers';
import { store } from './index.js';

var hero, controls;

export const GameState = {
  preload() {
    this.load.tilemap('Map', require('../assets/json/map.json'), null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileset', require('../assets/images/tileset.png'));
    this.load.spritesheet('hero', require('../assets/images/charchip01.png'), 32, 32);
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
    hero.frame = 4;

    hero.animations.add('left', [15, 16, 17], 5, true);
    hero.animations.add('right', [27, 28, 29], 5, true);
    hero.animations.add('up', [39, 40, 41], 5, true);
    hero.animations.add('down', [3, 4, 5], 5, true);

    this.camera.follow(hero);

    controls = this.input.keyboard.createCursorKeys();
  },

  update() {
    if (controls.left.isDown) {
      hero.animations.play('left');
      hero.x = store.getState().hero.position.x;
      hero.y = store.getState().hero.position.y;
    }
    else if (controls.right.isDown) {
      hero.animations.play('right');
      hero.x = store.getState().hero.position.x;
      hero.y = store.getState().hero.position.y;
    }
    else if (controls.up.isDown) {
      hero.animations.play('up');
      hero.x = store.getState().hero.position.x;
      hero.y = store.getState().hero.position.y;
    }
    else if (controls.down.isDown) {
      hero.animations.play('down');
      hero.x = store.getState().hero.position.x;
      hero.y = store.getState().hero.position.y;
    }
    else {
      hero.animations.stop();
      hero.frame = 4;
    }
  }
};

export const game = new Phaser.Game(CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.AUTO);
