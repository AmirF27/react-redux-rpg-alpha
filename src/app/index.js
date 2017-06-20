"use strict";

import store from "./state/store";
import { gainXp, playerTakeDamage, monsterTakeDamage } from "./state/actions";

console.log(store.getState());
store.dispatch(monsterTakeDamage(10));
store.disptch(playerTakeDamage(7))
store.dispatch(gainXp(100));
console.log(store.getState());
