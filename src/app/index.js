"use strict";

import store from "./state/store";
import { gainXp } from "./state/actions";

console.log(store.getState());
store.dispatch(gainXp(100));
console.log(store.getState());
