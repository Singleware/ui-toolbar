"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Template_1;
"use strict";
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
const Observable = require("@singleware/observable");
const DOM = require("@singleware/jsx");
const Control = require("@singleware/ui-control");
/**
 * Toolbar template class.
 */
let Template = Template_1 = class Template extends Control.Component {
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
         * Toolbar events.
         */
        this.subjects = {
            activate: new Observable.Subject(),
            deactivate: new Observable.Subject()
        };
        /**
         * Toolbar groups.
         */
        this.groups = {};
        /**
         * Buttons element.
         */
        this.buttonSlot = DOM.create("slot", { name: "buttons", class: "buttons" });
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
:host > .wrapper[data-orientation='row'] {
  flex-direction: row;
  width: inherit;
}
:host > .wrapper[data-orientation='column'] {
  flex-direction: column;
  height: inherit;
}`));
        /**
         * Toolbar skeleton.
         */
        this.skeleton = (DOM.create("div", { slot: this.properties.slot, class: this.properties.class }, this.children));
        /**
         * Toolbar elements.
         */
        this.elements = DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.styles, this.wrapper);
        this.bindHandlers();
        this.bindProperties();
        this.assignProperties();
    }
    /**
     * Activates the specified button element.
     * @param button Button element.
     */
    activateButton(button) {
        this.subjects.activate.notifyAll({ button: button });
        button.classList.add('active');
    }
    /**
     * Deactivates the specified button element.
     * @param button Button element.
     */
    deactivateButton(button) {
        this.subjects.deactivate.notifyAll({ button: button });
        button.classList.remove('active');
    }
    /**
     * Toggles the specified button element.
     * @param button Button element.
     */
    toggleButton(button) {
        if (button.classList.contains('active')) {
            this.deactivateButton(button);
        }
        else {
            this.activateButton(button);
        }
    }
    /**
     * Activates the the specified button in your respective group.
     * @param group Group name.
     * @param toggle Determines whether the button can be toggled or not.
     * @param button Button element.
     * @returns Returns true when the button is activated or deactivated, false otherwise.
     */
    activateButtonGroup(group, toggle, button) {
        const current = this.groups[group];
        if (current === button) {
            if (!toggle) {
                return false;
            }
            this.deactivateButton(current);
            delete this.groups[group];
        }
        else {
            if (current) {
                this.deactivateButton(current);
            }
            this.activateButton(button);
            this.groups[group] = button;
        }
        return true;
    }
    /**
     * Click event handler.
     * @param event Event information.
     */
    clickHandler(event) {
        const newer = event.target;
        const toggle = newer.dataset.toggle === 'on';
        if (newer.dataset.group) {
            if (!this.activateButtonGroup(newer.dataset.group, toggle, newer)) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        }
        else if (toggle) {
            this.toggleButton(newer);
        }
    }
    /**
     * Bind event handlers to update the custom element.
     */
    bindHandlers() {
        this.skeleton.addEventListener('click', Class.bindCallback(this.clickHandler), true);
    }
    /**
     * Bind exposed properties to the custom element.
     */
    bindProperties() {
        Object.defineProperties(this.skeleton, {
            events: super.bindDescriptor(Template_1.prototype, 'events'),
            buttons: super.bindDescriptor(Template_1.prototype, 'buttons'),
            disabled: super.bindDescriptor(Template_1.prototype, 'disabled'),
            orientation: super.bindDescriptor(Template_1.prototype, 'orientation')
        });
    }
    /**
     * Assign all elements properties.
     */
    assignProperties() {
        Control.assignProperties(this, this.properties, ['disabled']);
        this.orientation = this.properties.orientation || 'row';
    }
    /**
     * Get available events.
     */
    get events() {
        return this.subjects;
    }
    /**
     * Get buttons list.
     */
    get buttons() {
        return this.buttonSlot.assignedNodes();
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
        this.states.disabled = state;
        Control.setChildrenProperty(this.buttonSlot, 'disabled', state);
    }
    /**
     * Get orientation mode.
     */
    get orientation() {
        return this.wrapper.dataset.orientation || 'row';
    }
    /**
     * Set orientation mode.
     */
    set orientation(mode) {
        this.wrapper.dataset.orientation = mode;
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
], Template.prototype, "subjects", void 0);
__decorate([
    Class.Private()
], Template.prototype, "groups", void 0);
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
], Template.prototype, "elements", void 0);
__decorate([
    Class.Private()
], Template.prototype, "activateButton", null);
__decorate([
    Class.Private()
], Template.prototype, "deactivateButton", null);
__decorate([
    Class.Private()
], Template.prototype, "toggleButton", null);
__decorate([
    Class.Private()
], Template.prototype, "activateButtonGroup", null);
__decorate([
    Class.Private()
], Template.prototype, "clickHandler", null);
__decorate([
    Class.Private()
], Template.prototype, "bindHandlers", null);
__decorate([
    Class.Private()
], Template.prototype, "bindProperties", null);
__decorate([
    Class.Private()
], Template.prototype, "assignProperties", null);
__decorate([
    Class.Public()
], Template.prototype, "events", null);
__decorate([
    Class.Public()
], Template.prototype, "buttons", null);
__decorate([
    Class.Public()
], Template.prototype, "disabled", null);
__decorate([
    Class.Public()
], Template.prototype, "orientation", null);
__decorate([
    Class.Public()
], Template.prototype, "element", null);
Template = Template_1 = __decorate([
    Class.Describe()
], Template);
exports.Template = Template;
