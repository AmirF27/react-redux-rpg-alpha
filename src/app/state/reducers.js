"use strict";

import { initialState, levels } from "./initial-state";
import { actions } from "./actions";
import { combineReducers } from "redux";

function heroReducer(state = initialState.hero, action) {
    const { stats, inventory } = state;

    switch (action.type) {
        case actions.GAIN_XP:
            let { level, xp } = state;

            xp += action.payload;

            if (xp >= levels[level].xp) {
                level++;
            }

            return { ...state, level, xp };

        case actions.MOVE:
            let { position: { x, y } } = state;
            x += action.payload.x;
            y += action.payload.y;
            return { ...state, position: { x, y } };

        case actions.DRINK_POTION:
            return {
                ...state,
                stats: inventory.potions > 0 ? statsReducer(stats, action) : stats,
                inventory: inventoryReducer(inventory, action)
            };

        case actions.PLAYER_TAKE_DAMAGE:
            return {
                ...state,
                stats: statsReducer(stats, action)
            };
    }

    return state;
}

function statsReducer(state = initialState.hero.stats, action) {
    let { health, maxHealth } = state;

    switch (action.type) {
        case actions.DRINK_POTION:
            health = Math.min(health + 10, maxHealth);
            return { ...state, health, maxHealth };

        case actions.PLAYER_TAKE_DAMAGE:
        case actions.MONSTER_TAKE_DAMAGE:
            health = Math.max(0, health - action.payload);
            return { ...state, health };
    }

    return state;
}

function inventoryReducer(state = initialState.hero.inventory, action) {
    let { potions } = state;

    switch (action.type) {
        case actions.DRINK_POTION:
            potions = Math.max(0, potions - 1);
            return { ...state, potions };
    }

    return state;
}

function monsterReducer(state = initialState.monster, action) {
    const { stats } = state;

    switch (action.type) {
        case actions.MONSTER_TAKE_DAMAGE:
            return {
                ...state,
                stats: statsReducer(stats, action)
            };
    }

    return state;
}

const reducer = combineReducers({
    hero: heroReducer,
    monster: monsterReducer
});

export default reducer;
