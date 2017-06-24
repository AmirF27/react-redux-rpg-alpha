import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../state/actions';
import FightCommands from './FightCommands';

import Canvas from '../canvas';
import { PLAYER_STEP, keyCodes, CANVAS_WIDTH, CANVAS_HEIGHT } from '../helpers';

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
    // create and initialize canvas
    this.canvas = new Canvas('game-canvas').initialize({
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT
    });
    // initial render of canvas
    this.renderCanvas(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (this.positionChanged(this.props.hero.position, newProps.hero.position)) {
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

  renderCanvas(props) {
    // store player's position for convenience
    let position = props.hero.position;

    // clear the canvas so we can redraw
    this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // draw the player on the canvas
    this.canvas.context.fillStyle = '#000000';
    this.canvas.context.fillRect(position.x, position.y, 32, 32);
  }

  render() {
    return (
      <div>
        <canvas id='game-canvas'></canvas>
        <section>
          <h3>Position on map: ({this.props.hero.position.x}, {this.props.hero.position.y}) </h3>
          <h3>Level: {this.props.hero.level} </h3>
          <h3>XP: {this.props.hero.xp} </h3>
          <ul className="health">
            <li>Health: {this.props.hero.stats.health}/{this.props.hero.stats.maxHealth}</li>
            <li>Potions: {this.props.hero.inventory.potions}</li>
          </ul>
        </section>
        <FightCommands />
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
