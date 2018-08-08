/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Toolbar properties interface.
 */
export interface Properties {
  /**
   * Toolbar classes.
   */
  class?: string;
  /**
   * Toolbar slot.
   */
  slot?: string;
  /**
   * Determines whether the toolbar is disabled or not.
   */
  disabled?: boolean;
  /**
   * Toolbar orientation.
   */
  orientation?: string;
  /**
   * Toolbar children.
   */
  children?: {};
}
