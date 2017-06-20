"use strict";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"
import store from "./state/store";
import { actionCreators } from "./state/actions";
import Game from "./components/game";

ReactDOM.render((
    <Provider store={store}>
        <Game />
    </Provider>
    ),
    document.getElementById("game")
);
