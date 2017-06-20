"use strict";

import { initialState } from "./initial-state";

export const actions = {
    GAIN_XP: "GAIN_XP",
    MOVE: "MOVE",
    DRINK_POTION: "DRINK_POTION",
    PLAYER_TAKE_DAMAGE: "PLAYER_TAKE_DAMAGE",
    MONSTER_TAKE_DAMAGE: "MONSTER_TAKE_DAMAGE",
    ATTACK: "ATTACK"
};

export const actionCreators = {
    gainXp(amount) {
        return {
            type: actions.GAIN_XP,
            payload: amount
        };
    },
    drinkPotion() {
        return {
            type: actions.DRINK_POTION,
        };
    },
    playerTakeDamage(amount) {
        return {
            type: actions.PLAYER_TAKE_DAMAGE,
            payload: amount
        };
    },
    monsterTakeDamage(amount) {
        return {
            type: actions.MONSTER_TAKE_DAMAGE,
            payload: amount
        };
    }
};
