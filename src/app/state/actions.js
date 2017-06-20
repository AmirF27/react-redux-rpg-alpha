"use strict";

import { initialState } from "./initial-state";

export const actions = {
    GAIN_XP: "GAIN_XP",
    MOVE: "MOVE",
    DRINK_POTION: "DRINK_POTION",
    TAKE_DAMAGE: "TAKE_DAMAGE"
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

export function takeDamage(amount) {
    return {
        type: actions.DRINK_POTION,
    };
}
