"use strict";

export const initialState = {
    hero: {
        level: 1,
        xp: 0,
        position: {
            x: 0,
            y: 0
        },
        stats: {
            health: 50,
            maxHealth: 50
        },
        inventory: {
            potions: 2
        }
    },
    monster: {
        stats: {
            health: 50,
            maxHealth: 50
        }
    }
};

export const levels = [
    { xp:    0, maxHealth: 50 }, // Level 1
    { xp:  100, maxHealth: 55 }, // Level 2
    { xp:  250, maxHealth: 60 }, // Level 3
    { xp:  500, maxHealth: 67 }, // Level 4
    { xp: 1000, maxHealth: 75 }, // Level 5
];
