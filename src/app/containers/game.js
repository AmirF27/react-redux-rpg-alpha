import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../state/actions';
import Canvas from '../canvas';

class Game extends Component {
  constructor(props) {
    super(props);
    this.canvas = {};
  }

  componentDidMount() {
    // create and initialize canvas
    this.canvas = new Canvas('game-canvas').initialize({
      width: 600,
      height: 100
    });
    // initial render of canvas
    this.renderCanvas(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (this.positionChanged(this.props.hero.position, newProps.hero.position)) {
      this.renderCanvas(newProps);
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
          <h2>Player</h2>
          <h3>Position on map: ({this.props.hero.position.x}, {this.props.hero.position.y}) </h3>
          <h3>Level: {this.props.hero.level} </h3>
          <h3>XP: {this.props.hero.xp} </h3>
          <ul>
            <li>Health: {this.props.hero.stats.health}/{this.props.hero.stats.maxHealth}</li>
            <li>Potions: {this.props.hero.inventory.potions}</li>
          </ul>
        </section>
        <section>
          <h2>Monster</h2>
          <ul>
            <li>Health: {this.props.monster.stats.health}/{this.props.monster.stats.maxHealth}</li>
          </ul>
        </section>
        <hr />
        <section>
          <h2>Commands</h2>
          <h3>Actions On Main World Map</h3>
          <button
            onClick={() => this.props.move(1)}
          >Move</button>
          <br />
          <br />
          <h3>Actions During The Fight</h3>
          <button
            onClick={() => this.props.attack()}
          >Attack</button>
          <br />
          <br />
          <button
            onClick={() => this.props.heal()}
          >Heal</button>
        </section>
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
