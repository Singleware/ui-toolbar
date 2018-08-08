/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as Observable from '@singleware/observable';
import * as DOM from '@singleware/jsx';
import * as Control from '@singleware/ui-control';

import { Properties } from './properties';
import { Element } from './element';
import { Group } from './group';
import { Action } from './action';
import { Events } from './events';

/**
 * Toolbar template class.
 */
@Class.Describe()
export class Template extends Control.Component<Properties> {
  /**
   * Toolbar states.
   */
  @Class.Private()
  private states = {
    disabled: false
  };

  /**
   * Toolbar events.
   */
  @Class.Private()
  private subjects: Events = {
    activate: new Observable.Subject<Action>(),
    deactivate: new Observable.Subject<Action>()
  };

  /**
   * Toolbar groups.
   */
  @Class.Private()
  private groups: Group = {};

  /**
   * Buttons element.
   */
  @Class.Private()
  private buttonSlot: HTMLSlotElement = <slot name="buttons" class="buttons" /> as HTMLSlotElement;

  /**
   * Wrapper element.
   */
  @Class.Private()
  private wrapper: HTMLElement = <div class="wrapper">{this.buttonSlot}</div> as HTMLElement;

  /**
   * Toolbar styles.
   */
  @Class.Private()
  private styles: HTMLStyleElement = (
    <style>
      {`:host > .wrapper {
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
}`}
    </style>
  ) as HTMLStyleElement;

  /**
   * Toolbar skeleton.
   */
  @Class.Private()
  private skeleton: Element = (
    <div slot={this.properties.slot} class={this.properties.class}>
      {this.children}
    </div>
  ) as Element;

  /**
   * Toolbar elements.
   */
  @Class.Private()
  private elements: ShadowRoot = DOM.append(
    (this.skeleton as HTMLDivElement).attachShadow({ mode: 'closed' }),
    this.styles,
    this.wrapper
  ) as ShadowRoot;

  /**
   * Activates the specified button element.
   * @param button Button element.
   */
  @Class.Private()
  private activateButton(button: HTMLElement): void {
    this.subjects.activate.notifyAll({ button: button });
    button.classList.add('active');
  }

  /**
   * Deactivates the specified button element.
   * @param button Button element.
   */
  @Class.Private()
  private deactivateButton(button: HTMLElement): void {
    this.subjects.deactivate.notifyAll({ button: button });
    button.classList.remove('active');
  }

  /**
   * Toggles the specified button element.
   * @param button Button element.
   */
  @Class.Private()
  private toggleButton(button: HTMLElement): void {
    if (button.classList.contains('active')) {
      this.deactivateButton(button);
    } else {
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
  @Class.Private()
  private activateButtonGroup(group: string, toggle: boolean, button: HTMLElement): boolean {
    const current = this.groups[group];
    if (current === button) {
      if (!toggle) {
        return false;
      }
      this.deactivateButton(current);
      delete this.groups[group];
    } else {
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
  @Class.Private()
  private clickHandler(event: Event): void {
    const newer = event.target as HTMLElement;
    const toggle = newer.dataset.toggle === 'on';
    if (newer.dataset.group) {
      if (!this.activateButtonGroup(newer.dataset.group as string, toggle, newer)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    } else if (toggle) {
      this.toggleButton(newer);
    }
  }

  /**
   * Bind event handlers to update the custom element.
   */
  @Class.Private()
  private bindHandlers(): void {
    this.skeleton.addEventListener('click', Class.bindCallback(this.clickHandler), true);
  }

  /**
   * Bind exposed properties to the custom element.
   */
  @Class.Private()
  private bindProperties(): void {
    Object.defineProperties(this.skeleton, {
      events: super.bindDescriptor(Template.prototype, 'events'),
      buttons: super.bindDescriptor(Template.prototype, 'buttons'),
      disabled: super.bindDescriptor(Template.prototype, 'disabled'),
      orientation: super.bindDescriptor(Template.prototype, 'orientation')
    });
  }

  /**
   * Assign all elements properties.
   */
  @Class.Private()
  private assignProperties(): void {
    Control.assignProperties(this, this.properties, ['disabled']);
    this.orientation = this.properties.orientation || 'row';
  }

  /**
   * Default constructor.
   * @param properties Toolbar properties.
   * @param children Toolbar children.
   */
  constructor(properties?: Properties, children?: any[]) {
    super(properties, children);
    this.bindHandlers();
    this.bindProperties();
    this.assignProperties();
  }

  /**
   * Get available events.
   */
  @Class.Public()
  public get events(): Events {
    return this.subjects;
  }

  /**
   * Get buttons list.
   */
  @Class.Public()
  public get buttons(): HTMLElement[] {
    return this.buttonSlot.assignedNodes() as HTMLElement[];
  }

  /**
   * Get disabled state.
   */
  @Class.Public()
  public get disabled(): boolean {
    return this.states.disabled;
  }

  /**
   * Set disabled state.
   */
  public set disabled(state: boolean) {
    this.states.disabled = state;
    Control.setChildrenProperty(this.buttonSlot, 'disabled', state);
  }

  /**
   * Get orientation mode.
   */
  @Class.Public()
  public get orientation(): string {
    return this.wrapper.dataset.orientation || 'row';
  }

  /**
   * Set orientation mode.
   */
  public set orientation(mode: string) {
    this.wrapper.dataset.orientation = mode;
  }

  /**
   * Toolbar element.
   */
  @Class.Public()
  public get element(): Element {
    return this.skeleton;
  }
}
