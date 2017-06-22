import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../state/actions';

class Game extends Component {
  render() {
    return (
      <div>
        <section>
          <h2>Player</h2>
          <h3>Position on map: ({this.props.hero.position.x}, {this.props.hero.position.y}) </h3>
          <h3>Level: {this.props.hero.level} </h3>
          <h3>XP: {this.props.hero.xp} </h3>
          <h4>Stats</h4>
          <ul>
            <li>Health: {this.props.hero.stats.health}/{this.props.hero.stats.maxHealth}</li>
          </ul>
          <h4>Inventory</h4>
          <ul>
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
            onClick={() => this.props.move()}
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
