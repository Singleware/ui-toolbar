"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
const DOM = require("@singleware/jsx");
const Control = require("@singleware/ui-control");
/**
 * Toolbar template class.
 */
let Template = class Template extends Control.Component {
    /**
     * Default constructor.
     * @param properties Toolbar properties.
     * @param children Toolbar children.
     */
    constructor(properties, children) {
        super(properties, children);
        /**
         * Toolbar states.
         */
        this.states = {
            disabled: false
        };
        /**
         * Buttons element.
         */
        this.buttonSlot = DOM.create("slot", { name: "button", class: "button" });
        /**
         * Wrapper element.
         */
        this.wrapper = DOM.create("div", { class: "wrapper" }, this.buttonSlot);
        /**
         * Toolbar styles.
         */
        this.styles = (DOM.create("style", null, `:host > .wrapper {
  display: flex;
}
:host > .wrapper,
:host([data-orientation='row']) > .wrapper {
  flex-direction: row;
  width: inherit;
}
:host([data-orientation='column']) > .wrapper {
  flex-direction: column;
  height: inherit;
}`));
        /**
         * Toolbar skeleton.
         */
        this.skeleton = (DOM.create("div", { slot: this.properties.slot, class: this.properties.class }, this.children));
        DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.styles, this.wrapper);
        this.bindProperties();
        this.assignProperties();
    }
    /**
     * Bind exposed properties to the custom element.
     */
    bindProperties() {
        this.bindComponentProperties(this.skeleton, ['disabled', 'orientation']);
    }
    /**
     * Assign all elements properties.
     */
    assignProperties() {
        this.assignComponentProperties(this.properties, ['disabled']);
        this.orientation = this.properties.orientation || 'row';
    }
    /**
     * Get disabled state.
     */
    get disabled() {
        return this.states.disabled;
    }
    /**
     * Set disabled state.
     */
    set disabled(state) {
        Control.setChildrenProperty(this.buttonSlot, 'disabled', (this.states.disabled = state));
    }
    /**
     * Get orientation mode.
     */
    get orientation() {
        return this.skeleton.dataset.orientation || 'row';
    }
    /**
     * Set orientation mode.
     */
    set orientation(mode) {
        this.skeleton.dataset.orientation = mode;
    }
    /**
     * Toolbar element.
     */
    get element() {
        return this.skeleton;
    }
};
__decorate([
    Class.Private()
], Template.prototype, "states", void 0);
__decorate([
    Class.Private()
], Template.prototype, "buttonSlot", void 0);
__decorate([
    Class.Private()
], Template.prototype, "wrapper", void 0);
__decorate([
    Class.Private()
], Template.prototype, "styles", void 0);
__decorate([
    Class.Private()
], Template.prototype, "skeleton", void 0);
__decorate([
    Class.Private()
], Template.prototype, "bindProperties", null);
__decorate([
    Class.Private()
], Template.prototype, "assignProperties", null);
__decorate([
    Class.Public()
], Template.prototype, "disabled", null);
__decorate([
    Class.Public()
], Template.prototype, "orientation", null);
__decorate([
    Class.Public()
], Template.prototype, "element", null);
Template = __decorate([
    Class.Describe()
], Template);
exports.Template = Template;
