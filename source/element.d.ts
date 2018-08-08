/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import { Events } from './events';

/**
 * Toolbar element interface.
 */
export interface Element extends HTMLDivElement {
  /**
   * Toolbar events.
   */
  readonly events: Events;
  /**
   * Toolbar buttons.
   */
  readonly buttons: HTMLElement[];
  /**
   * Disabled state.
   */
  disabled: boolean;
  /**
   * Orientation mode.
   */
  orientation: string;
}
