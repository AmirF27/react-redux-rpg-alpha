import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../state/actions';
import FightCommands from './FightCommands';
import { game, GameState } from '../game';

class Game extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    game.state.add('GameState', GameState);
    game.state.start('GameState');
  }

  render() {
    return (
      <div>
        <div id='game-canvas'></div>
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
