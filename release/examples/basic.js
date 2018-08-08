"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 *
 * The proposal of this example is to show how to use the basic toolbar template.
 */
const Toolbar = require("../source");
const DOM = require("@singleware/jsx");
const toolbar = (DOM.create(Toolbar.Template, null,
    DOM.create("button", { slot: "buttons" }, "Normal"),
    DOM.create("button", { slot: "buttons", "data-toggle": "on" }, "Normal toggle"),
    DOM.create("button", { slot: "buttons", "data-group": "group" }, "Normal group"),
    DOM.create("button", { slot: "buttons", "data-group": "group" }, "Normal group"),
    DOM.create("button", { slot: "buttons", "data-group": "group-toggle", "data-toggle": "on" }, "Normal group toggle"),
    DOM.create("button", { slot: "buttons", "data-group": "group-toggle", "data-toggle": "on" }, "Normal group toggle")));
