/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Observable from '@singleware/observable';

import { Action } from './action';

/**
 * Toolbar events interface.
 */
export interface Events {
  /**
   * When the button is activated.
   */
  readonly activate: Observable.Subject<Action>;
  /**
   * When the button is deactivated.
   */
  readonly deactivate: Observable.Subject<Action>;
}
