/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 *
 * The proposal of this example is to show how to use the basic toolbar template.
 */
import * as Toolbar from '../source';
import * as DOM from '@singleware/jsx';

const toolbar = (
  <Toolbar.Template>
    <button slot="buttons">Normal</button>
    <button slot="buttons" data-toggle="on">
      Normal toggle
    </button>
    <button slot="buttons" data-group="group">
      Normal group
    </button>
    <button slot="buttons" data-group="group">
      Normal group
    </button>
    <button slot="buttons" data-group="group-toggle" data-toggle="on">
      Normal group toggle
    </button>
    <button slot="buttons" data-group="group-toggle" data-toggle="on">
      Normal group toggle
    </button>
  </Toolbar.Template>
) as Toolbar.Element;
