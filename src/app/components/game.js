"use strict";

import React from "react";
import { connect } from "react-redux";
import store from "../state/store";
import { actionCreators } from "../state/actions";

class Game extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section>
                    <h2>Player</h2>
                    <h3>Level {this.props.hero.level}, {this.props.hero.xp} XP</h3>
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
                <section>
                    <h2>Commands</h2>
                    <button
                        onClick={() => this.props.monsterTakeDamage(10)}
                    >Attack</button>
                    <button
                        onClick={() => this.props.playerTakeDamage(5)}
                    >Take Damage</button>
                    <button
                        onClick={() => this.props.drinkPotion()}
                    >Drink Potion</button>
                    <button
                        onClick={() => this.props.gainXp(50)}
                    >Gain XP</button>
                </section>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        hero: state.hero,
        monster: state.monster
    };
}

export default connect(
    mapStateToProps,
    actionCreators
)(Game);
