import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../state/actions';
import FightCommands from './FightCommands';

import Canvas from '../canvas';
import { PLAYER_STEP, keyCodes, CANVAS_WIDTH, CANVAS_HEIGHT, TILE_SCALE } from '../helpers';
import map from '../map.js';
import { game, GameState } from '../game-map';

class Game extends Component {
  constructor(props) {
    super(props);
    this.canvas = {};
  }

  componentWillMount() {
    document.addEventListener('keydown', this.keydownEventHandler.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydownEventHandler.bind(this));
  }

  componentDidMount() {
    game.state.add('GameState', GameState);
    game.state.start('GameState');

    // create and initialize canvas
    this.canvas = new Canvas('game-canvas').initialize({
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT
    });
    // initial render of map and canvas
    map.loadAtlas().then(
      function fulfilled() {
        map.render(this.canvas.context, TILE_SCALE);
        this.renderCanvas(this.props);
      }.bind(this),
      function rejected() {
        console.error('Map rendering failed');
      }
    );
  }

  componentWillReceiveProps(newProps) {
    if (this.positionChanged(this.props.hero.position, newProps.hero.position)) {
      map.render(this.canvas.context, 2);
      this.renderCanvas(newProps);
    }
  }

  keydownEventHandler(event) {
    switch (event.keyCode) {
      case keyCodes.LEFT:
        this.props.move(-PLAYER_STEP, 0);
        break;

      case keyCodes.UP:
        this.props.move(0, -PLAYER_STEP);
        break;

      case keyCodes.RIGHT:
        this.props.move(PLAYER_STEP, 0);
        break;

      case keyCodes.DOWN:
        this.props.move(0, PLAYER_STEP);
        break;
    }
  }

  positionChanged(prev, current) {
    return prev.x !== current.x || prev.y !== current.y;
  }

  renderMap() {
    const ctx = this.canvas.context;

    ctx.beginPath();

    for (let row = 0; row <= CANVAS_HEIGHT; row += TILE_SIZE) {
      ctx.moveTo(0, row);
      ctx.lineTo(CANVAS_WIDTH, row);
    }

    for (let col = 0; col <= CANVAS_WIDTH; col += TILE_SIZE) {
      ctx.moveTo(col, 0);
      ctx.lineTo(col, CANVAS_HEIGHT);
    }

    ctx.stroke();
  }

  renderCanvas(props) {
    const ctx = this.canvas.context;

    // store player's position for convenience
    let position = props.hero.position;

    // draw the player on the canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(position.x, position.y, 32, 32);
  }

  render() {
    return (
      <div>
        <canvas id='game-canvas'></canvas>
        <div className='game-commands'>
          <section>
            <h3>Position on map: ({this.props.hero.position.x}, {this.props.hero.position.y}) </h3>
            <h3>XP: {this.props.hero.stats.xp} </h3>
            <h3>Potions: {this.props.hero.inventory.potions} </h3>
            <hr />
            <h3>Player</h3>
            <ul className="health">
              <li>Health: {this.props.hero.stats.health}/{this.props.hero.stats.maxHealth}</li>
              <li>Level: {this.props.hero.stats.level} </li>
            </ul>
          </section>
          <FightCommands />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    hero: state.hero,
    monster: state.monster
  };
}

export default connect(
  mapStateToProps,
  actionCreators
)(Game);
