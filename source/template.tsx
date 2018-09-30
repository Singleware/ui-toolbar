/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as DOM from '@singleware/jsx';
import * as Control from '@singleware/ui-control';

import { Properties } from './properties';
import { Element } from './element';
import { States } from './states';

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
  } as States;

  /**
   * Buttons element.
   */
  @Class.Private()
  private buttonSlot = <slot name="button" class="button" /> as HTMLSlotElement;

  /**
   * Wrapper element.
   */
  @Class.Private()
  private wrapper = <div class="wrapper">{this.buttonSlot}</div> as HTMLDivElement;

  /**
   * Toolbar styles.
   */
  @Class.Private()
  private styles = (
    <style>
      {`:host > .wrapper {
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
}`}
    </style>
  ) as HTMLStyleElement;

  /**
   * Toolbar skeleton.
   */
  @Class.Private()
  private skeleton = (
    <div slot={this.properties.slot} class={this.properties.class}>
      {this.children}
    </div>
  ) as Element;

  /**
   * Bind exposed properties to the custom element.
   */
  @Class.Private()
  private bindProperties(): void {
    this.bindComponentProperties(this.skeleton, ['disabled', 'orientation']);
  }

  /**
   * Assign all elements properties.
   */
  @Class.Private()
  private assignProperties(): void {
    this.assignComponentProperties(this.properties, ['disabled']);
    this.orientation = this.properties.orientation || 'row';
  }

  /**
   * Default constructor.
   * @param properties Toolbar properties.
   * @param children Toolbar children.
   */
  constructor(properties?: Properties, children?: any[]) {
    super(properties, children);
    DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.styles, this.wrapper);
    this.bindProperties();
    this.assignProperties();
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
    Control.setChildrenProperty(this.buttonSlot, 'disabled', (this.states.disabled = state));
  }

  /**
   * Get orientation mode.
   */
  @Class.Public()
  public get orientation(): string {
    return this.skeleton.dataset.orientation || 'row';
  }

  /**
   * Set orientation mode.
   */
  public set orientation(mode: string) {
    this.skeleton.dataset.orientation = mode;
  }

  /**
   * Toolbar element.
   */
  @Class.Public()
  public get element(): Element {
    return this.skeleton;
  }
}
