/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as DOM from '@singleware/jsx';
import * as Control from '@singleware/ui-control';

import { Properties } from './properties';
import { Element } from './element';

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
   * Buttons element.
   */
  @Class.Private()
  private buttonSlot: HTMLSlotElement = <slot name="button" class="button" /> as HTMLSlotElement;

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
   * Bind exposed properties to the custom element.
   */
  @Class.Private()
  private bindProperties(): void {
    Object.defineProperties(this.skeleton, {
      disabled: super.bindDescriptor(this, Template.prototype, 'disabled'),
      orientation: super.bindDescriptor(this, Template.prototype, 'orientation')
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
