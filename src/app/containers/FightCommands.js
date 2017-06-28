import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../state/actions';
import Monster from './Monster';

class FightCommands extends Component {

  renderCommands() {
    const { buttons, potions, fight } = this.props;
    const enabledAttack = buttons ? '' : 'disabled';
    const enabledHeal = (buttons && (potions !== 0)) ? '' : 'disabled';
    if (fight) {
      return (
        <section>
          <hr />
          <Monster />
          <hr />
          <h2>Fight Commands</h2>
          <div className="btn-wrapper">
            <button
              disabled={enabledAttack}
              onClick={() => this.props.attack()}
              className="btn"
            >Attack</button>
            <button
              disabled={enabledHeal}
              onClick={() => this.props.heal()}
              className="btn"
            >Heal</button>
          </div>
        </section>
      );
    }
    return <div />;
  }

  render() {
    return (
      <div>
        {this.renderCommands()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    buttons: state.game.buttons,
    potions: state.hero.inventory.potions,
    fight: state.game.fight,
  };
}

export default connect(
  mapStateToProps,
  actionCreators
)(FightCommands);
