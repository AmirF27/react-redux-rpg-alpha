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

/*
 * Action Creators
**/
export function gainXp(amount) {
    return {
        type: actions.GAIN_XP,
        payload: amount
    };
}

export function drinkPotion() {
    return {
        type: actions.DRINK_POTION,
    };
}

export function playerTakeDamage(amount) {
    return {
        type: actions.DRINK_POTION,
    };
}

export function monsterTakeDamage(amount) {
    return {
        type: actions.MONSTER_TAKE_DAMAGE,
        payload: amount
    };
}
