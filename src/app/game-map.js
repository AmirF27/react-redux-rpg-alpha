import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './helpers';

export const GameState = {
  preload() {
    this.load.tilemap('Map', require('../assets/json/map.json'), null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileset', require('../assets/images/tileset.png'));
  },

  create() {
    const map = this.add.tilemap('Map');
    map.addTilesetImage('tileset');
    const layer1 = map.createLayer('layer1'),
          layer2 = map.createLayer('layer2');
    layer1.resizeWorld();
    layer2.resizeWorld();
  }
};

export const game = new Phaser.Game(CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.AUTO);
