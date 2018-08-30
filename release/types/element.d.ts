/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Toolbar element interface.
 */
export interface Element extends HTMLDivElement {
  /**
   * Disabled state.
   */
  disabled: boolean;
  /**
   * Orientation mode.
   */
  orientation: string;
}
