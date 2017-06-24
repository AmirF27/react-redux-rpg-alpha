import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../state/actions';
import Monster from './Monster';

class FightCommands extends Component {

  renderCommands() {
    const { isAttacking } = this.props;
    if (isAttacking === true) {
      return (
        <section>
          <hr />
          <h2>Fight Commands</h2>
          <div className="button-wrapper">
            <button
              onClick={() => this.props.attack()}
              className="attack"
            >Attack</button>
            <button
              onClick={() => this.props.heal()}
              className="heal"
            >Heal</button>
          </div>
          <Monster />
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
    isAttacking: state.monster.isAttacking,
  };
}

export default connect(
  mapStateToProps,
  actionCreators
)(FightCommands);
